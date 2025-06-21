import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10  rounded-lg flex items-center justify-center">
          <Image src="/logo.svg" alt="Logo Hi-Vision" width={54} height={54} />
        </div>
        <span className="text-xl font-semibold text-blue-600">Hi - Vision</span>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
          Home
        </Link>
        <Link href="/about-us" className="text-gray-600 hover:text-gray-900">
          About Us
        </Link>
        <Link href="#" className="text-gray-600 hover:text-gray-900">
          How to use
        </Link>
      </nav>

      <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
        <Link href="/sign-in">Log In</Link>
      </Button>
    </header>
  );
};

export default Header;
