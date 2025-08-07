"use client";

import Link from "next/link";
import Image from "next/image";

export default function AdminBlogCard({ blog, onDelete }) {
  return (
    <div className="relative bg-[#2c2c2c] hover:bg-[#343434] transition-all duration-300 rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 hover:shadow-2xl">

      {/* Status Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`px-3 py-1 text-xs rounded-full font-medium shadow-lg ${blog.is_published
            ? 'bg-green-600 text-white'
            : 'bg-yellow-600 text-white'
          }`}>
          {blog.is_published ? '✅ Published' : '⏳ Draft'}
        </span>
      </div>

      {/* Category Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="px-3 py-1 text-xs rounded-full font-medium bg-blue-600 text-white capitalize shadow-lg">
          {blog.category === 'cnc' ? '🔧 CNC' : '💻 Web Dev'}
        </span>
      </div>

      {/* 📸 Thumbnail */}
      {blog.thumbnail_url ? (
        <div className="relative overflow-hidden">
          <div className="relative w-full h-48">
            <Image
              src={blog.thumbnail_url || "/images/fallback-image.png"}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false} // Optional: Set to `true` if above the fold
            />
          </div>

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center group-hover:from-gray-600 group-hover:to-gray-700 transition-all duration-300">
          <div className="text-center">
            <div className="text-4xl mb-2">📝</div>
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* 📝 Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors duration-200">
          {blog.title}
        </h3>

        {/* 📄 Excerpt */}
        <p className="text-gray-200 text-sm line-clamp-3 mb-4 leading-relaxed">{blog.excerpt}</p>

        {/* Blog Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">👤</span>
            <span className="text-xs text-gray-300">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">📅</span>
            <span className="text-xs text-gray-300">
              {blog.published_at
                ? new Date(blog.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
                : "Not published"
              }
            </span>
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-xs text-gray-400 mt-0.5">🏷️</span>
              <div className="flex flex-wrap gap-1">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/blog/${blog.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <span>👁️</span>
            View Live
          </Link>
          <Link
            href={`/admin/blog/${blog.slug}`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <span>✏️</span>
            Edit
          </Link>
          <button
            onClick={() => onDelete(blog.id, blog.title)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <span>🗑️</span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}