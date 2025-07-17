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
        <h1 className="text-xl font-semibold mb-2">{title}</h1>

      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-20 bg-white p-4 sm:p-6 md:p-8 rounded-xl w-[90vw] max-w-[800px] h-auto">
              <button
                className="absolute z-50 top-1 right-1 text-black cursor-pointer border border-gray-300 rounded-full bg-white bg-opacity-80 p-1 text-sm"
                onClick={closeModal}
              >
                X
              </button>
              <div className="w-full max-w-[90vw] max-h-[80vh] flex items-center justify-center">
                {isVideo(image_url) ? (
                  <video
                    src={image_url}
                    controls
                    className="max-w-full max-h-[80vh] object-contain rounded-xl"
                  />
                ) : (
                  <ImageWithLoader
                    src={image_url}
                    alt={`Visual representation of ${title} project from CNC portfolio`}
                    width={1000} // just reference, original image size
                    height={700}
                    className="max-w-full max-h-[80vh] object-contain rounded-xl"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default ProjectCard;