"use client";

import { useState } from "react";
import { RiShareForwardLine, RiLink } from "react-icons/ri";

interface Props {
  title: string;
  url?: string;
}

const ShareButton = ({ title, url }: Props) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-purple-900 rounded-lg hover:bg-purple-500 hover:text-white transition-colors"
        aria-label="Share article"
      >
        <RiShareForwardLine className="w-4 h-4" />
        <span className="hidden sm:inline">Share</span>
      </button>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-purple-900 rounded-lg hover:bg-purple-500 hover:text-white transition-colors"
        aria-label="Copy link"
      >
        <RiLink className="w-4 h-4" />
        <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
      </button>
    </div>
  );
};

export default ShareButton;
