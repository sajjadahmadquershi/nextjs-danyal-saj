'use client';

import { useState } from "react";
import Image from "next/image";

const ImageWithLoader = ({ src, alt, width, height, className }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {/* 🎯 Custom Spinner */}
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={`${className} ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageWithLoader;
