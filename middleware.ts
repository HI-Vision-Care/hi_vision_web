import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const url = req.nextUrl.pathname;

  // Nếu đã đăng nhập mà cố vào /sign-in hoặc /sign-up thì redirect về dashboard đúng với role
  if (token && (url.startsWith("/sign-in") || url.startsWith("/sign-up"))) {
    let redirectUrl = "/";
    if (role === "ADMIN") redirectUrl = "/admin";
    else if (role === "DOCTOR") redirectUrl = "/doctor-dashboard";
    else if (role === "PATIENT") redirectUrl = "/patient";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // Nếu chưa đăng nhập mà truy cập các route cần bảo vệ thì redirect về sign-in
  if (!token) {
    if (
      url.startsWith("/admin") ||
      url.startsWith("/doctor-dashboard") ||
      url.startsWith("/patient")
    ) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    // Trang public thì cho qua
    return NextResponse.next();
  }

  // Phân quyền truy cập theo role
  if (url.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/403", req.url));
  }
  if (url.startsWith("/doctor-dashboard") && role !== "DOCTOR") {
    return NextResponse.redirect(new URL("/403", req.url));
  }
  if (url.startsWith("/patient") && role !== "PATIENT") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // Mặc định cho qua
  return NextResponse.next();
}

// (Tùy chọn, nên thêm matcher để tránh ảnh hưởng file tĩnh)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
