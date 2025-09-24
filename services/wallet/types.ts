export interface DepositWalletBody {
  balance: number;
}

export type UserRole = "GUEST" | "USER" | "STAFF" | "ADMIN";

export interface AccountSummary {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  isDeleted: boolean;
}

export interface StaffSummary {
  staffId: string;
  firstName: string;
  lastName: string;
  gender: string;
  account: AccountSummary;
}

// Nếu backend chuẩn hoá status thành enum, ta sẽ thay `string` thành union.
export interface RequestWithdrawResponse {
  withdrawId: number;
  amount: number;
  accountNumber: string;
  accountName?: string;
  bankName?: string;
  withdrawDate: string; // ISO string từ backend
  description: string;
  status: string;
  account: AccountSummary;
  staff: StaffSummary | null; // để đề phòng có yêu cầu chưa được gán staff
}

export type WithdrawItem = RequestWithdrawResponse;

// Toàn bộ danh sách yêu cầu rút
export type GetAllWithdrawResponse = WithdrawItem[];

// (tuỳ chọn) nếu BE cố định status thì dùng union này
export type WithdrawStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export type ApproveWithdrawResponse = RequestWithdrawResponse;

export interface RejectWithdrawPayload {
  description: string;
}
export type RejectWithdrawResponse = RequestWithdrawResponse;
