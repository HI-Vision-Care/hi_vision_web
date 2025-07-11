export interface ConsultationRequire {
  name: string
  status: "REQUIRE"
  note: string
  patientID: string
  createdAt: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  type: "text" | "image" | "video" | "file"
  isOwn: boolean
}

export interface ChatUser {
  id: string
  name: string
  avatar?: string
  isOnline: boolean
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
}
