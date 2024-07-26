import React from "react";
import Logo from "../header/logo";
import { Heart } from "lucide-react";
import { Code } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-around">
        <div className="flex-1 mx-2 space-y-4">
          <Logo href={"/"} />
          <p className="text-sm">
            Efficiently save and organize your code snippets.
          </p>
        </div>
        <div className="flex-1 mx-2">
          <h4 className="text-lg font-semibold mb-4 text-accent">Links</h4>
          <ul>
            <li className="mb-2">
              <a className="text-sm hover:text-accent" href="#">
                About
              </a>
            </li>
            <li className="mb-2">
              <a className="text-sm hover:text-accent" href="#">
                Contact
              </a>
            </li>
            <li className="mb-2">
              <a className="text-sm hover:text-accent" href="#">
                Terms of Service
              </a>
            </li>
            <li className="mb-2">
              <a className="text-sm hover:text-accent" href="#">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 mx-2">
          <h4 className="text-lg font-semibold mb-4 text-accent">Follow Us</h4>
          <ul>
            <li className="mb-2">
              <a className="text-sm hover:text-accent" href="#">
                Twitter
              </a>
            </li>
            <li className="mb-2">
              <a className="text-sm hover:text-accent" href="#">
                Facebook
              </a>
            </li>
            <li className="mb-2">
              <a className="text-sm hover:text-accent" href="#">
                LinkedIn
              </a>
            </li>
            <li className="mb-2">
              <a className="text-sm hover:text-accent" href="#">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm space-y-4">
        <p>&copy; 2024 Snippet Master. All rights reserved.</p>
        <p className="flex gap-2 items-center justify-center">
          <Code /> Developed and Managed by {" >"}
          <Link
            target="_blank"
            rel="nofollow"
            className="text-blue-400 font-medium"
            href={"https://sahildev.pro/"}
          >
            SahilDev.Pro
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
