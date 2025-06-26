"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import Image from "next/image";

export default function LoginNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="relative z-20 backdrop-blur-md bg-white/60 border-b border-slate-200/50 shadow-sm">
      <div className="container mx-auto px-4  ">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                <Image
                  src="/logo.svg"
                  alt="Hi vision Logo"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div>
              <h2 className="text-slate-800 font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Hi-Vision
              </h2>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-800 transition-all duration-300 relative group font-medium"
            >
              <span>Home</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/about-us"
              className="text-slate-600 hover:text-slate-800 transition-all duration-300 relative group font-medium"
            >
              <span>About</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-800 transition-all duration-300 relative group font-medium"
            >
              <span>Contact</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/sign-in"
              className="custom-btn text-slate-600 hover:text-slate-800 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-slate-100/80 font-medium"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-slate-700 p-2 rounded-lg hover:bg-slate-100/80 transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/50">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-800 transition-colors py-2 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className="text-slate-600 hover:text-slate-800 transition-colors py-2 font-medium"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-slate-600 hover:text-slate-800 transition-colors py-2 font-medium"
              >
                Contact
              </Link>
              <div className="flex gap-4 pt-4 border-t border-slate-200/50">
                <Link
                  href="/sign-in"
                  className="text-slate-600 hover:text-slate-800 transition-colors px-4 py-2 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
