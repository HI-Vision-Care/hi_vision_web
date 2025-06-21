import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Logo Hi-Vision"
                  width={54}
                  height={54}
                />
              </div>
              <span className="text-xl font-semibold text-blue-600">
                Hi - Vision
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-blue-600 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Case studies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-blue-600 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Culture
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-blue-600 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Getting started
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Help center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Server status
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Report a bug
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Chat support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>Copyright © 2022</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span>📧 contact@company.com</span>
            <span>📞 (414) 687 - 5892</span>
            <span>📍 794 Mcallister St, San Francisco, 94102</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
