export interface ConsultationRequest {
  phone: string;
  name: string | "anonimus";
  note: string;
}

export interface ConsultationRequire {
  name: string | "anonimus";
  status: string;
  note: string;
  accountID: string;
  createdAt: string;
}
// export interface ConsultationChatRequire {
//   name: string;
//   status: "REQUIRE";
//   note: string;
//   patientID: string;
//   createdAt: string;
// }

// export interface Message {
//   id: string;
//   senderId: string;
//   senderName: string;
//   content: string;
//   timestamp: Date;
//   type: "text" | "image" | "video" | "file";
//   isOwn: boolean;
// }

// export interface ChatUser {
//   id: string;
//   name: string;
//   avatar?: string;
//   isOnline: boolean;
//   lastMessage?: string;
//   lastMessageTime?: string;
//   unreadCount?: number;
// }

export interface AccountInfo {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  isDeleted: boolean;
}

export interface OnGoingConsultation {
  id: number;
  accPatient: AccountInfo;
  accStaff: AccountInfo;
  status: string;
  note: string;
  createdAt: string; // ISO date
}