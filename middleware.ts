import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl.pathname;

  // ✅ Chặn nếu không đăng nhập
  if (!token) {
    if (
      url.startsWith("/admin") ||
      url.startsWith("/doctor") ||
      url.startsWith("/patient")
    ) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();
  }

  // 🚀 Nếu là DOCTOR thì cho đi hết
  if (role === "DOCTOR") {
    return NextResponse.next();
  }

  // ✅ Phân quyền cho các role khác
  if (url.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  if (url.startsWith("/patient") && role !== "PATIENT") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // Nếu không dính các rule trên thì NextResponse.next()
  return NextResponse.next();
}
