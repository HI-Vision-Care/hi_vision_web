"use client";

import type React from "react";


import { useState, useEffect, useRef } from "react"
import { Send, MoreVertical, Search, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { completeConsultation, getOnGoingConsultations } from "@/services/consultant/consultant"
import { useAccountId } from "@/hooks/useAccountId"
import { ConsultationRequire } from "@/services/consultant/types"

interface Message {
    id: string
    accountID: string
    senderName: string
    content: string
    timestamp: Date
    type: "text" | "image" | "video" | "file"
    isOwn: boolean
}

interface ChatUser {
    accountID: string
    name: string
    avatar?: string
    isOnline: boolean
    lastMessage?: string
    lastMessageTime?: string
    unreadCount?: number
    note: string
}



interface ChatInterfaceProps {
    onUserSelect?: (user: ChatUser) => void
    selectedUser?: ChatUser | null
    onConsultationComplete?: () => void;
    selectedPatientRequire: ConsultationRequire | null;
}

export default function ChatInterface({ onUserSelect, selectedPatientRequire, onConsultationComplete }: ChatInterfaceProps) {
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([])
    const staffAccountId = useAccountId();
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedPatient, setSelectedPatient] = useState<ChatUser | null>(null)
    const [currentMessage, setCurrentMessage] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const stompClientRef = useRef<Client | null>(null)

    useEffect(() => {
        if (!staffAccountId) return;

        getOnGoingConsultations(staffAccountId)
            .then((data) => {
                if (!data) return;
                const users: ChatUser[] = data.map((item) => ({
                    accountID: item.accPatient.id,
                    name: item.accPatient.username,
                    avatar: item.accPatient.avatar,
                    isOnline: true,
                    note: item.note,
                    lastMessageTime: item.createdAt,
                    unreadCount: 0,
                }));
                setChatUsers(users);

                // Chọn luôn patient đầu tiên nếu có
                if (users.length > 0) {
                    setSelectedPatient(users[0]);
                }
            })
            .catch((err) => {
                console.error("Lỗi lấy danh sách khách hàng đang nhắn tin:", err);
            });
    }, [staffAccountId]);


    // Convert ConsultationRequire → ChatUser
    useEffect(() => {
        if (!selectedPatientRequire) return;
        const newUser: ChatUser = {
            accountID: selectedPatientRequire.accountID,
            name: selectedPatientRequire.name,
            avatar: "/placeholder.svg",      // Có thể truyền từ cha nếu muốn
            isOnline: true,
            note: selectedPatientRequire.note,
            lastMessage: selectedPatientRequire.note,
            lastMessageTime: selectedPatientRequire.createdAt,
            unreadCount: 0,
        };
        // Nếu user này chưa có trong chatUsers thì thêm vào
        setChatUsers((prev) => {
            if (prev.some(u => u.accountID === newUser.accountID)) return prev;
            return [newUser, ...prev];
        });
        setSelectedPatient(newUser);
    }, [selectedPatientRequire]);

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => { setHasMounted(true); }, []);
    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Add new patient to chat when selected from queue
    useEffect(() => {
        if (selectedPatient && !chatUsers.find((u) => u.accountID === selectedPatient.accountID)) {
            const newChatUser: ChatUser = {
                accountID: selectedPatient.accountID,
                name: selectedPatient.name,
                avatar: "/placeholder.svg?height=40&width=40",
                isOnline: true,
                note: selectedPatient.note || "Khách hàng cần tư vấn",
                lastMessageTime: "now",
                unreadCount: 1,
            }
            setChatUsers((prev) => [newChatUser, ...prev])
        }
    }, [selectedPatient, chatUsers])

    // WebSocket connection for real-time chat
    useEffect(() => {
        if (!selectedPatient) return

        const socket = new SockJS("http://192.168.2.7:8080/HiVision/ws")
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 3000,
        })

        stompClient.onConnect = () => {
            // Subscribe to chat room using patientID
            stompClient.subscribe(`/box/${selectedPatient.accountID}`, (message) => {
                try {
                    console.log("[WebSocket] Received message:", message)
                    // Nếu dùng Message interface ở FE:
                    const msgFromServer = JSON.parse(message.body);

                    // Tạo message FE với field đúng kiểu
                    const msg: Message = {
                        id: Date.now().toString(), // Hoặc lấy id BE nếu có
                        accountID: msgFromServer.staffAccountId, // Nếu BE có thì lấy, không thì để rỗng hoặc dùng senderName
                        senderName: msgFromServer.senderName,
                        content: msgFromServer.message, // Map đúng field!
                        timestamp: msgFromServer.date ? new Date(msgFromServer.date) : new Date(),
                        type: "text",
                        isOwn: msgFromServer.senderName === "Tư vấn viên", // hoặc so sánh với user hiện tại
                    };
                    setMessages((prev) => [...prev, msg]);
                } catch (e) {
                    console.error("Invalid msg format", e);
                }
            });
            console.log("[WebSocket] Subscribed to", `/box/${selectedPatient.accountID}`)
        }

        stompClient.activate()
        stompClientRef.current = stompClient

        return () => {
            stompClient.deactivate()
        }
    }, [selectedPatient])

    const sendMessage = () => {
        if (!currentMessage.trim() || !stompClientRef.current || !selectedPatient) return

        const payload = {
            senderName: "Tư vấn viên",
            accountID: staffAccountId,
            message: currentMessage, // ĐÚNG FIELD CHO BE
            status: "", // Nếu cần
            date: new Date().toISOString()
        };

        // Send via WebSocket using patientID
        stompClientRef.current.publish({
            destination: `/app/message/${selectedPatient.accountID}`,
            body: JSON.stringify(payload),
        });


        setCurrentMessage("")

        // Update last message in chat list
        setChatUsers((prev) =>
            prev.map((user) =>
                user.accountID === selectedPatient.accountID ? { ...user, lastMessage: currentMessage, lastMessageTime: "now" } : user,
            ),
        )

    }
  }, [selectedPatient, chatUsers]);

  // WebSocket connection for real-time chat
  useEffect(() => {
    if (!activeChat || !selectedPatient) return;

    const socket = new SockJS("http://192.168.2.7:8080/HiVision/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 3000,
    });

    stompClient.onConnect = () => {
      // Subscribe to chat room using patientID
      stompClient.subscribe(`/box/${selectedPatient.accountID}`, (message) => {
        try {
          console.log("[WebSocket] Received message:", message);
          // Nếu dùng Message interface ở FE:
          const msgFromServer = JSON.parse(message.body);

          // Tạo message FE với field đúng kiểu
          const msg: Message = {
            id: Date.now().toString(), // Hoặc lấy id BE nếu có
            senderId: "", // Nếu BE có thì lấy, không thì để rỗng hoặc dùng senderName
            senderName: msgFromServer.senderName,
            content: msgFromServer.message, // Map đúng field!
            timestamp: msgFromServer.date
              ? new Date(msgFromServer.date)
              : new Date(),
            type: "text",
            isOwn: msgFromServer.senderName === "Tư vấn viên", // hoặc so sánh với user hiện tại
          };
          setMessages((prev) => [...prev, msg]);
        } catch (e) {
          console.error("Invalid msg format", e);
        }
      });
      console.log(
        "[WebSocket] Subscribed to",
        `/box/${selectedPatient.accountID}`
      );
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [activeChat, selectedPatient]);

  const sendMessage = () => {
    if (
      !currentMessage.trim() ||
      !activeChat ||
      !stompClientRef.current ||
      !selectedPatient
    )
      return;

    const payload = {
      senderName: "Tư vấn viên",
      message: currentMessage, // ĐÚNG FIELD CHO BE
      status: "", // Nếu cần
      date: new Date().toISOString(),
    };

    // Send via WebSocket using patientID
    stompClientRef.current.publish({
      destination: `/app/message/${selectedPatient.accountID}`,
      body: JSON.stringify(payload),
    });

    setCurrentMessage("");

    // Update last message in chat list
    setChatUsers((prev) =>
      prev.map((user) =>
        user.id === activeChat.id
          ? { ...user, lastMessage: currentMessage, lastMessageTime: "now" }
          : user
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredUsers = chatUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (!chatUsers.length) {
      setActiveChat(null);
    } else if (!activeChat || !chatUsers.find((u) => u.id === activeChat.id)) {
      setActiveChat(chatUsers[0]);
    }
  }, [chatUsers, activeChat]);

  return (
    <div className="flex h-[600px] bg-white rounded-lg overflow-hidden border">
      {/* Chat List */}
      <div className="w-1/3 bg-gray-900 text-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Chats</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search Messenger"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>

    useEffect(() => {
        if (!chatUsers.length) {
            setSelectedPatient(null);
        } else if (!selectedPatient || !chatUsers.find(u => u.accountID === selectedPatient.accountID)) {
            setSelectedPatient(chatUsers[0]);
        }
    }, [chatUsers, selectedPatient]);


    return (
        <div className="flex h-[600px] bg-white rounded-lg overflow-hidden border">
            {/* Chat List */}
            <div className="w-1/3 bg-gray-900 text-white flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Chats</h2>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search Messenger"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.accountID}
                            onClick={() => {
                                setSelectedPatient(user)
                                onUserSelect?.(user)
                            }}
                            className={`p-3 hover:bg-gray-800 cursor-pointer border-l-2 ${selectedPatient?.accountID === user.accountID ? "bg-gray-800 border-blue-500" : "border-transparent"
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="bg-gray-600">{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {user.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium truncate">{user.name}</p>
                                        <span className="text-xs text-gray-400">{user.lastMessageTime}</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">{user.lastMessage}</p>
                                </div>

                                {user.unreadCount && user.unreadCount > 0 && (
                                    <Badge className="bg-blue-600 text-white text-xs">{user.unreadCount}</Badge>
                                )}
                            </div>
                        </div>
                    ))}

                </div>


            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedPatient ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b bg-white flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={selectedPatient.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {selectedPatient.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{selectedPatient.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedPatient.isOnline ? "Active now" : "Offline"}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={async () => {
                                        if (!selectedPatient || !staffAccountId) return;
                                        try {
                                            await completeConsultation(staffAccountId, selectedPatient.accountID);
                                            setChatUsers(prev => {
                                                const newList = prev.filter(user => user.accountID !== selectedPatient.accountID);
                                                // Đặt activeChat mới đúng theo newList
                                                setSelectedPatient(newList.length > 0 ? newList[0] : null);

                                                return newList;
                                            });
                                            setMessages([]);
                                            onConsultationComplete?.();
                                            alert("Tư vấn đã kết thúc!");
                                        } catch (err) {
                                            alert("Kết thúc thất bại!");
                                        }
                                    }}
                                >
                                    Kết thúc tư vấn
                                </Button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isOwn ? "bg-blue-600 text-white" : "bg-white text-gray-900 border"
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                                            {hasMounted && formatTime(message.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t bg-white">
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                    <Paperclip className="w-4 h-4" />
                                </Button>
                                <div className="flex-1 relative">
                                    <Input
                                        placeholder="Aa"
                                        value={currentMessage}
                                        onChange={(e) => setCurrentMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="pr-10"
                                    />
                                    <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                                        <Smile className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Button
                                    onClick={sendMessage}
                                    disabled={!currentMessage.trim()}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <p className="text-gray-500">Chọn một cuộc trò chuyện để bắt đầu</p>
                    </div>

                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={activeChat.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {activeChat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{activeChat.name}</h3>
                  <p className="text-sm text-gray-500">
                    {activeChat.isOnline ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={async () => {
                    if (!activeChat || !staffAccountId) return;
                    try {
                      await completeConsultation(staffAccountId, activeChat.id);
                      setChatUsers((prev) => {
                        const newList = prev.filter(
                          (user) => user.id !== activeChat.id
                        );
                        // Đặt activeChat mới đúng theo newList
                        setActiveChat(newList.length > 0 ? newList[0] : null);
                        return newList;
                      });
                      setMessages([]);
                      onConsultationComplete?.();
                      alert("Consultation is over!");
                    } catch (err) {
                      alert("End of failure!");
                    }
                  }}
                >
                  End of consultation
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-900 border"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {hasMounted && formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Aa"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a conversation to start</p>
          </div>
        )}
      </div>
    </div>
  );
}
