
"use client";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaShareAlt, FaCheck } from "react-icons/fa";

export default function GlobalShareButtons({
  title = "Check this out!",
  popupDirection = "bottom", // ✅ "top" or "bottom"
  label = "Share this page:",
  siteUrl = "https://unisol-sajjad.vercel.app", // default site
  positionClass = "right-0", // default position
  iconSize = 20,
}) {
  const pathname = usePathname();
  const shareUrl = `${siteUrl}${pathname}`;
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      prompt("Copy this link:", shareUrl);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={popupRef}>
      {/* Button */}
      <button
        onClick={() => setShowPopup((prev) => !prev)}
        className="text-white hover:text-blue-400 transition-colors p-2"
        aria-label="Share"
      >
        <FaShareAlt size={iconSize} />
      </button>

      {/* Popup */}
      {showPopup && (
        <div
          className={`absolute z-50 bg-[#2c2c2c] border border-gray-600 p-4 rounded shadow-lg w-64 animate-fade-in
            ${popupDirection === "top" ? "bottom-full mb-2" : "top-full mt-2"} ${positionClass}`}
        >
          <p className="text-sm text-white mb-2">{label}</p>

          {/* Icons */}
          <div className="flex gap-2 justify-center mb-2">
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TelegramShareButton url={shareUrl} title={title}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>

          {/* Copy link */}
          <div className="flex items-center justify-between bg-[#1e1e1e] border border-gray-600 rounded px-2 py-1">
            <span className="text-xs text-gray-200 truncate">{shareUrl}</span>
            <button
              onClick={copyToClipboard}
              className="text-blue-400 text-xs hover:text-blue-300"
            >
              {copied ? <FaCheck /> : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
