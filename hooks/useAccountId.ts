import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  sub: string; // accountId
  // có thể khai báo thêm các field khác nếu BE trả về
};

export function useAccountId() {
  const token = Cookies.get("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub || null;
  } catch (err) {
    // Nếu token không hợp lệ thì return null
    return null;
  }
}
