import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white text-black w-full">
      <div className="max-w-screen-xl mx-auto w-full">
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center md:items-start gap-10 py-12  sm:px-6 lg:px-8 text-center md:text-left">
          {/* Logo + Social */}
          <div className="flex flex-col gap-4 items-center md:items-start flex-1 min-w-[220px]">
            <Link
              href="/"
              className="flex flex-col gap-2 items-center md:items-start"
            >
              <Image
                src="/logo.svg"
                alt="Hi vision Logo"
                width={100}
                height={100}
              />
              <h2 className="uppercase font-bold text-xl">Hi-Vision</h2>
            </Link>
            <p className="text-sm text-gray-700 max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <div className="flex gap-3">
              {["facebook-f", "twitter", "google", "instagram"].map(
                (icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-blue-100 text-gray-700 transition"
                  >
                    <i className={`fab fa-${icon}`} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col justify-center items-center m-auto md:items-start flex-1 min-w-[200px]">
            <h6 className="uppercase font-bold mb-4 text-lg">Products</h6>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                "MDBootstrap",
                "MDWordPress",
                "BrandFlow",
                "Bootstrap Angular",
              ].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col justify-center items-center m-auto md:items-start flex-1 min-w-[200px]">
            <h6 className="uppercase font-bold mb-4 text-lg">Useful links</h6>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                "Your Account",
                "Become an Affiliate",
                "Shipping Rates",
                "Help",
              ].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col justify-center items-center m-auto md:items-start flex-1 min-w-[200px]">
            <h6 className="uppercase font-bold mb-4 text-lg">Contact</h6>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <i className="fas fa-home mr-2" /> New York, NY 10012, US
              </li>
              <li>
                <i className="fas fa-envelope mr-2" /> info@gmail.com
              </li>
              <li>
                <i className="fas fa-phone mr-2" /> +01 234 567 88
              </li>
              <li>
                <i className="fas fa-print mr-2" /> +01 234 567 89
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300 w-[95%] mx-auto" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center py-6 text-sm px-4 sm:px-6 lg:px-8 text-gray-600 text-center">
          <div className="mb-2 md:mb-0">
            © 2020 Copyright:{" "}
            <a
              href="https://mdbootstrap.com/"
              className="hover:underline text-blue-500"
            >
              MDBootstrap.com
            </a>
          </div>
          <div className="space-x-2 flex">
            <h4>All Rights Reserved</h4>
            <span>|</span>
            <a href="#" className="text-blue-500 hover:underline">
              Terms and Conditions
            </a>
            <span>|</span>
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
