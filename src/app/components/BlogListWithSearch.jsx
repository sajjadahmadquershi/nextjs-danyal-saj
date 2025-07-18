"use client";
import { useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export default function BlogListWithSearch({ blogs = [], isAdmin, defaultCategoryFilter = "all" }) {
  const [searchInput, setSearchInput] = useState("");
  const [daysFilter, setDaysFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(defaultCategoryFilter); // ✅ Use default category
  const [tagFilter, setTagFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9); // 9 posts per page to match the 3-column grid

  const supabase = createClientComponentClient();
  const router = useRouter();

  const allTags = useMemo(() => {
    const tags = new Set();
    blogs.forEach(blog => {
      blog.tags?.forEach(tag => tags.add(tag));
    });
    return ["all", ...Array.from(tags)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const today = new Date();

    return Array.isArray(filteredData) ? filteredData.filter((blog) => {
      const titleMatch = blog?.title?.toLowerCase().includes(searchInput.toLowerCase());
      const excerptMatch = blog?.excerpt?.toLowerCase().includes(searchInput.toLowerCase());

      const tagMatch =
        Array.isArray(blog?.tags) &&
        blog.tags.some(
          (tag) =>
            typeof tag === "string" &&
            tag.toLowerCase().includes(searchInput.toLowerCase())
        );

      const publishedAt = blog?.published_at ? new Date(blog.published_at) : null;
      if (!publishedAt && !isAdmin) return false; // ✅ Only filter unpublished blogs for non-admin

      const matchSearch = titleMatch || excerptMatch || tagMatch;

      const matchDays =
        daysFilter === "all"
          ? true
          : (today - publishedAt) / (1000 * 60 * 60 * 24) <= parseInt(daysFilter);

      const matchDate = dateFilter
        ? new Date(dateFilter).toDateString() === publishedAt.toDateString()
        : true;

      const matchCategory =
        categoryFilter === "all" ? true : blog.category === categoryFilter;

      const matchTag =
        tagFilter === "all"
          ? true
          : Array.isArray(blog.tags) && blog.tags.includes(tagFilter);

      return matchSearch && matchDays && matchDate && matchCategory && matchTag;
    }) : [];
  }, [searchInput, daysFilter, dateFilter, categoryFilter, tagFilter, filteredData, isAdmin]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  // Reset to first page when filters change
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of the blog section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (blog) => {
    router.push(`/admin/blog/${blog.slug}`);
  };

  const handleDelete = async (blog) => {
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) return;

    const { error } = await supabase.from("blogs").delete().eq("id", blog.id);
    if (error) return alert("Error deleting blog: " + error.message);

    alert("Deleted successfully!");
    setFilteredData((prev) => prev.filter((b) => b.id !== blog.id));
  };

  // ✅ Dynamic heading based on category filter
  const getHeading = () => {
    if (categoryFilter === "cnc") return "CNC & 2D-3D Design Posts";
    if (categoryFilter === "webdev") return "Web Development Posts";
    return "Recent Posts";
  };

  // Pagination component
  const PaginationComponent = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }

      return pages;
    };

    return (
      <div className="flex justify-center items-center mt-8 space-x-2">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPage === 1
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-[#2c2c2c] text-white hover:bg-gray-600 border border-gray-600'
          }`}
        >
          Previous
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) => (
          <span key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-400">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#2c2c2c] text-white hover:bg-gray-600 border border-gray-600'
                }`}
              >
                {page}
              </button>
            )}
          </span>
        ))}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-[#2c2c2c] text-white hover:bg-gray-600 border border-gray-600'
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-white text-center mt-16 mb-4">{getHeading()}</h2>

      {/* Filters UI */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => handleFilterChange(setSearchInput)(e.target.value)}
          className="p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
        />
        <select
          value={daysFilter}
          onChange={(e) => handleFilterChange(setDaysFilter)(e.target.value)}
          className="p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
        >
          <option value="all">All Time</option>
          <option value="1">Last 1 Day</option>
          <option value="2">Last 2 Days</option>
          <option value="7">Last 7 Days</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => handleFilterChange(setDateFilter)(e.target.value)}
          className="p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
        />

        {/* Tag Filter */}
        <select
          value={tagFilter}
          onChange={(e) => handleFilterChange(setTagFilter)(e.target.value)}
          className="p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
        >
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag === 'all' ? 'All Tags' : tag}</option>
          ))}
        </select>

        {/* ✅ Category Filter: Show for Admin OR when defaultCategory is set */}
        {(isAdmin || defaultCategoryFilter !== "all") && (
          <select
            value={categoryFilter}
            onChange={(e) => handleFilterChange(setCategoryFilter)(e.target.value)}
            className="p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
          >
            <option value="all">All Categories</option>
            <option value="webdev">Web Development</option>
            <option value="cnc">CNC</option>
          </select>
        )}
      </div>

      {/* Results info */}
      {filteredBlogs.length > 0 && (
        <div className="text-center text-gray-300 mb-4">
          Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredBlogs.length)} of {filteredBlogs.length} posts
        </div>
      )}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.length > 0 ? (
          currentPosts.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              isAdmin={isAdmin} // ✅ اب یہ dynamic ہو گیا
              onEdit={isAdmin ? handleEdit : undefined}
              onDelete={isAdmin ? handleDelete : undefined}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-200">No posts found</p>
        )}
      </div>

      {/* Pagination */}
      <PaginationComponent />
    </>
  );
}