import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl.pathname;

  // ✅ Chặn nếu không đăng nhập
  if (!token) {
    // Ví dụ: chặn truy cập /admin nếu chưa login
    if (url.startsWith("/admin") || url.startsWith("/doctor") || url.startsWith("/patient")) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();
  }

  // ✅ Phân quyền theo role
  if (url.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  if (url.startsWith("/doctor") && role !== "DOCTOR") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  if (url.startsWith("/patient") && role !== "PATIENT") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}
