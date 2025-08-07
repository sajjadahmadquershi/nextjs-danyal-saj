
"use client";

import Link from "next/link";
import GlobalShareButtons from "@/app/components/GlobalShareButtons";
import Image from "next/image"; // at the top of the file

export default function BlogCard({ blog, isAdmin = false, onEdit = () => {}, onDelete = () => {} }) {
  return (
    <div className="relative bg-[#2c2c2c] hover:bg-[#343434] transition duration-300 rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-1">

      {/* ✅ Floating Share Button - top-right */}
      <div className="absolute bottom-3 right-3 z-10 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
        <div className="relative group">
          <div className="absolute  right-8 top-1 mb-1 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Share
          </div>
          <GlobalShareButtons
            title={blog.title}
            popupDirection="top"
            iconSize={16}
          />
        </div>
      </div>

      {/* 📸 Thumbnail */}
      {blog.thumbnail_url && (
        <Link href={`/blog/${blog.slug}`}>
        <Image
  src={blog.thumbnail_url}
  alt={blog.title}
  width={800} // Adjust dimensions as needed
  height={400}
  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
  style={{ objectFit: "cover" }}
/>

        </Link>
      )}

      <div className="p-5">
        {/* 📝 Title */}
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 hover:underline">
            {blog.title}
          </h3>
        </Link>

        {/* 📄 Excerpt */}
        <p className="text-gray-200 text-sm line-clamp-3">{blog.excerpt}</p>

        {/* 🕒 Date */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-300">
          <span>
            {blog.published_at
              ? new Date(blog.published_at).toLocaleDateString()
              : "Draft"}
          </span>
        </div>

        {/* ✅ Edit/Delete Buttons for Admin Only */}
        {isAdmin && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(blog)}
              className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
            >
              ✏ Edit
            </button>
            <button
              onClick={() => onDelete(blog)}
              className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700"
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
