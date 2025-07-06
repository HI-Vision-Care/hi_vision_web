"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { Menu, UserIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "@/components/home/Header.module.css";
import { desktopNav, mobileNav } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAccountId } from "@/hooks/useAccountId";
import { useGetUserProfile } from "@/services/account/hook";

const HeaderHome = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  // Lấy avatar từ cookie user nếu có
  const accountId = useAccountId();
  const { data: profile } = useGetUserProfile(accountId, role);

  // Ưu tiên dùng avatar/info từ profile
  const avatarUrl =
    profile?.account?.avatar ||
    profile?.avatar || // nếu BE trả ra ở 2 chỗ khác nhau
    "/default-avatar.png";
  const userName =
    profile?.name ||
    profile?.account?.username ||
    profile?.account?.email ||
    "User";

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const token = Cookies.get("token");
    const userRole = Cookies.get("role");
    setIsLogin(!!token);
    setRole(userRole || null);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("user");
    setIsLogin(false);
    router.push("/sign-in");
  };

  const getDashboardPath = () => {
    switch (role) {
      case "ADMIN":
        return "/admin";
      case "DOCTOR":
        return "/doctor-dashboard";
      case "PATIENT":
        return "/patient/";
      default:
        return "/dashboard"; // fallback
    }
  };
  console.log(role);

  return (
    <nav className="flex items-center justify-between py-4 px-4 relative">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 transition duration-300 ease-in-out hover:scale-95"
      >
        <Image src="/logo.svg" alt="Hi vision Logo" width={50} height={50} />
        <h2 className="text-blue-300 font-bold text-xl md:text-2xl">
          Hi - Vision
        </h2>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        {desktopNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.customUnderline} custom-btn py-2 px-3`}
          >
            <h3>{item.label}</h3>
          </Link>
        ))}

        {!isLogin ? (
          <Link
            href="/sign-in"
            className="custom-btn bg-blue-400 py-2 px-5 rounded-xl text-white hover:bg-blue-500"
          >
            <h2>Login</h2>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-blue-300 rounded-full transition">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={avatarUrl} alt={userName} />
                  <AvatarFallback>
                    <UserIcon className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline font-medium text-sm">
                  {userName}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link href={getDashboardPath()} className="w-full">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 font-medium cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden" onClick={toggleMenu}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col items-center gap-4 py-4 shadow-md z-10 md:hidden">
          {mobileNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-center py-2 hover:bg-blue-50"
              onClick={() => setMenuOpen(false)}
            >
              <h3>{item.label}</h3>
            </Link>
          ))}

          {!isLogin ? (
            <Link
              href="/sign-in"
              className="bg-blue-400 text-white py-2 px-5 rounded-xl hover:bg-blue-500"
            >
              <h2>Login</h2>
            </Link>
          ) : (
            <>
              <Link
                href={getDashboardPath()}
                className="bg-green-400 text-white py-2 px-5 rounded-xl hover:bg-green-500"
                onClick={() => setMenuOpen(false)}
              >
                <h2>Dashboard</h2>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-400 text-white py-2 px-5 rounded-xl hover:bg-red-500"
              >
                <h2>Logout</h2>
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default HeaderHome;
