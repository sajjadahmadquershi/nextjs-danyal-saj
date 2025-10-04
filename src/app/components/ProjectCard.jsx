"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ImageWithLoader from "./ImageWithLoader";
import { PlayCircleIcon, EyeIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const ProjectCard = ({ image_url, title, gitUrl, previewUrl }) => {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playBriefly = async () => {
      try {
        await video.play();
        setTimeout(() => video.pause(), 100);
      } catch (err) {
        console.error("Autoplay failed:", err.message);
      }
    };
    if (video.readyState >= 2) {
      playBriefly();
    } else {
      video.addEventListener("loadeddata", playBriefly);
      return () => video.removeEventListener("loadeddata", playBriefly);
    }
  }, []);
  const openModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const isVideo = (url) => url?.match(/\.(mp4|webm|ogg)$/i);
  return (
    <div>
      <div className="h-52 md:h-72 rounded-t-xl relative group" tabIndex={0}>
        {isVideo(image_url) ? (
          <video
            ref={videoRef}
            src={image_url}
            className="h-full w-full rounded-t-xl object-cover"
            poster={image_url}
            muted
            loop
            playsInline
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => e.target.pause()}
            onFocus={(e) => e.target.play()}
            onBlur={(e) => e.target.pause()}
            controls
            controlsList="nodownload"
          />
        ) : (
          <Image
            src={image_url}
            alt={`Visual representation of ${title} project from CNC portfolio`}
            width={430}
            height={454}
            loading="lazy"
            className="h-full w-full rounded-t-xl aspect-[215/227]"
            style={{ backgroundSize: "cover" }}
          />
        )}

        <div
          className={
            isVideo(image_url)
              ? "items-center justify-center absolute top-0 left-0 w-full h-full flex pointer-events-none group-focus-within:flex"
              : "overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-focus-within:flex group-hover:bg-opacity-80 group-focus-within:bg-opacity-80 transition-all duration-500"
          }
        >
          <Link
            href={image_url}
            aria-label={`View ${title} project`}
            className="h-14 w-14 border-2 relative rounded-full border-[rgb(173,180,190)] hover:border-white group/link pointer-events-auto"
            onClick={openModal}
          >
            {isVideo(image_url) ? (
              <PlayCircleIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-textmain-100" />
            ) : (
              <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-textmain-100" />
            )}
          </Link>
          {previewUrl && (
            <Link
              href={previewUrl}
              aria-label={`View ${title} project`}
              className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link pointer-events-auto"
              target="_blank"
            >
              <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-textmain-100" />
            </Link>
          )}
        </div>
      </div>
      <div className="text-textmain-100 rounded-b-xl mt-3 bg-[#242424] py-6 px-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>

      </div>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-50 p-2 text-white bg-black bg-opacity-40 rounded-full hover:bg-opacity-60 transition-opacity"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="w-full h-full flex items-center justify-center">
              {isVideo(image_url) ? (
                <video
                  src={image_url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[90vh] object-contain"
                />
              ) : (
                <ImageWithLoader
                  src={image_url}
                  alt={`Visual representation of ${title} project from CNC portfolio`}
                  width={1200} // Increased for better resolution
                  height={800}
                  className="max-w-full max-h-[90vh] object-contain"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;