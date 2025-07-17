
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
  const [filteredData, setFilteredData] = useState(blogs);

  const supabase = createClientComponentClient();
  const router = useRouter();

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

      return matchSearch && matchDays && matchDate && matchCategory;
    }) : [];
  }, [searchInput, daysFilter, dateFilter, categoryFilter, filteredData,isAdmin]);


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

  return (
    <>
      <h2 className="text-3xl font-bold text-white text-center mt-16 mb-4">{getHeading()}</h2>

      {/* Filters UI */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
        />
        <select
          value={daysFilter}
          onChange={(e) => setDaysFilter(e.target.value)}
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
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
        />

        {/* ✅ Category Filter: Show for Admin OR when defaultCategory is set */}
        {(isAdmin || defaultCategoryFilter !== "all") && (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 rounded bg-[#2c2c2c] text-white border border-gray-600"
          >
            <option value="all">All Categories</option>
            <option value="webdev">Web Development</option>
            <option value="cnc">CNC</option>
          </select>
        )}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
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
    </>
  );
}
