"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import styles from "@/components/Header/Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
        {[
          { title: "Home", link: "/" },
          { title: "About", link: "/about-us" },
          { title: "Services", link: "service" },
          { title: "Contact", link: "/contact" },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`${styles.customUnderline} custom-btn py-2 px-3`}
          >
            <h3>{item.title}</h3>
          </Link>
        ))}
        <Link
          href="/sign-in"
          className="custom-btn bg-blue-400 py-2 px-5 rounded-xl text-white hover:bg-blue-500"
        >
          <h2>Login</h2>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={toggleMenu}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col items-center gap-4 py-4 shadow-md z-10 md:hidden">
          {["About", "Services", "Contact"].map((item, index) => (
            <Link
              key={index}
              href="/"
              className="w-full text-center py-2 hover:bg-blue-50"
              onClick={() => setMenuOpen(false)}
            >
              <h3>{item}</h3>
            </Link>
          ))}
          <Link
            href="/"
            className="bg-blue-400 text-white py-2 px-5 rounded-xl hover:bg-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            <h2>Login</h2>
          </Link>
        </div>
      )}
    </nav>
  );
}
