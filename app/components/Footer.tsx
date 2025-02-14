import Link from "next/link";
import React from "react";
import { RiHeartPulseFill, RiCopyleftLine, RiGithubFill } from "react-icons/ri";

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
            className="flex items-center gap-2 text-lg font-semibold group  text-gray-900 dark:text-white"
          >
            <RiGithubFill className="w-6 h-6 transition-all group-hover:text-purple-500" />
            <span className=" transition-all hover:text-purple-500">
              Visit My GitHub
            </span>
          </Link>

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
            <RiCopyleftLine className="w-4 h-4" /> 2025 AUIBlogo. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
