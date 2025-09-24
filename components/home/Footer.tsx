import Link from "next/link";
import Image from "next/image";
import React from "react";
// Import icons from lucide-react
import {
  Facebook,
  Instagram,
  Youtube,
  Clock,
  Phone,
  Mail,
  MapPin,
  BookOpen,
  Link as LinkIcon,
  Users,
  HandHeart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-black w-full">
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center md:items-start gap-10 py-12 sm:px-6 lg:px-8 text-center md:text-left">
          {/* Logo + Social */}
          <div className="flex flex-col gap-4 items-center md:items-start flex-1 min-w-[220px]">
            <Link
              href="/"
              className="flex flex-col gap-2 items-center md:items-start"
            >
              <Image
                src="/logo.svg"
                alt="Hi Vision Logo"
                width={100}
                height={100}
              />
              <h2 className="uppercase font-bold text-xl text-primary">
                Hi-Vision Clinic
              </h2>
            </Link>
            <p className="text-sm text-gray-700 max-w-xs">
              HIV/AIDS counseling, testing, and treatment support center – For a
              healthy, stigma-free community.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://facebook.com/hivisionclinic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-blue-100 text-gray-700 transition"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/hivisionclinic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-pink-100 text-gray-700 transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com/@hivisionclinic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-red-100 text-gray-700 transition"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col justify-center items-center m-auto md:items-start flex-1 min-w-[200px]">
            <h6 className="uppercase font-bold mb-4 text-lg flex items-center gap-2">
              <HandHeart size={18} /> Services
            </h6>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                {
                  label: "Free HIV Testing",
                  href: "#",
                  icon: <BookOpen size={16} className="inline mb-1 mr-1" />,
                },
                {
                  label: "ARV Treatment Counseling",
                  href: "#",
                  icon: <Users size={16} className="inline mb-1 mr-1" />,
                },
                {
                  label: "HIV Prevention Counseling",
                  href: "/services/prevention",
                  icon: <HandHeart size={16} className="inline mb-1 mr-1" />,
                },
                {
                  label: "Community Support",
                  href: "#",
                  icon: <Users size={16} className="inline mb-1 mr-1" />,
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="hover:underline flex items-center gap-1"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col justify-center items-center m-auto md:items-start flex-1 min-w-[200px]">
            <h6 className="uppercase font-bold mb-4 text-lg flex items-center gap-2">
              <LinkIcon size={18} /> Quick Links
            </h6>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                { label: "Book Appointment", href: "#" },
                { label: "News & Knowledge", href: "#" },
                { label: "FAQ", href: "#" },
                { label: "Contact", href: "#" },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col justify-center items-center m-auto md:items-start flex-1 min-w-[200px]">
            <h6 className="uppercase font-bold mb-4 text-lg flex items-center gap-2">
              <MapPin size={18} /> Contact
            </h6>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <MapPin size={16} /> E2a-7, D1 Street, Saigon Hi-Tech Park, Thu
                Duc City, HCMC
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@hi-vision.io
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> (+84) 792 191 402
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} /> Mon - Sat: 8:00 AM - 5:00 PM
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300 w-[95%] mx-auto" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center py-6 text-sm px-4 sm:px-6 lg:px-8 text-gray-600 text-center">
          <div className="mb-2 md:mb-0">© 2025 Hi-Vision Clinic.</div>
          <div className="space-x-2 flex flex-wrap justify-center items-center gap-1">
            <span>For a Healthier Community</span>
            <span>|</span>
            <Link href="/terms" className="text-blue-500 hover:underline">
              Terms of Use
            </Link>
            <span>|</span>
            <Link href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
