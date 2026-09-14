import Link from "next/link";
import React from "react";
import {
  RiHeartPulseFill,
  RiCopyrightLine,
  RiGithubFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";
import { SiLinktree } from "react-icons/si";

const Footer = () => {
  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <footer className="py-8 text-center border-t border-gray-300 dark:border-purple-900">
        <div className="flex flex-col items-center space-y-3 text-gray-700 dark:text-gray-300">
          {/* GitHub Link */}
          <Link
            href="https://github.com/afaqulislam"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-lg font-semibold group text-gray-900 dark:text-white"
          >
            <RiGithubFill className="w-6 h-6 transition-all group-hover:text-purple-500" />
            <span className="transition-all group-hover:text-purple-500">
              Visit My GitHub
            </span>
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com/in/afaqulislam"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="p-2 border border-gray-300 dark:border-purple-900 rounded-full hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-colors"
            >
              <RiLinkedinFill className="w-5 h-5" />
            </Link>
            <Link
              href="https://linktree-afaqulislam.vercel.app"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit my Linktree"
              className="p-2 border border-gray-300 dark:border-purple-900 rounded-full hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-colors"
            >
              <SiLinktree className="w-5 h-5" />
            </Link>
            <Link
              href="https://x.com/afaqulislam708"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow me on X (Twitter)"
              className="p-2 border border-gray-300 dark:border-purple-900 rounded-full hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-colors"
            >
              <RiTwitterXFill className="w-5 h-5" />
            </Link>
          </div>

          {/* Divider Line */}
          <div className="w-16 h-0.5 bg-[#2c2841] dark:bg-[#1e063d] rounded-full"></div>

          {/* Footer Text */}
          <p className="text-sm">
            Designed & Made with{" "}
            <RiHeartPulseFill className="inline w-5 h-5 text-red-500 animate-pulse" />{" "}
            by AUI | Afaq Ul Islam
          </p>

          {/* Copyright */}
          <p className="text-xs flex items-center gap-1">
            <RiCopyrightLine className="w-4 h-4" /> {new Date().getFullYear()} AUIBlogo. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
