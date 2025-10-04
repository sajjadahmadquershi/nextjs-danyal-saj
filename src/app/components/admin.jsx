"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import ProjectCard from "@/app/components/ProjectCard";
import AdminBlogCard from "@/app/components/AdminBlogCard";
import { motion } from "framer-motion";
import "@/styile/adminportfolio.css";
import "@/app/globals.css";
import { supabase } from "@/lib/supabaseBrowserClient";
import AdminTags from "./AdminTags";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import Link from "next/link";
import LogoutButton from "./logout";

const AdminPortfolio = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]); // Add blogs state
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tag: "All",
    customTag: "",
    web_link: "",
    file: null,
    display_order: "",
  });
  const [showModalform, setShowModalform] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("All");
  const [tags, setTags] = useState(["All"]);
  const [siteContent, setSiteContent] = useState([]);
  const [activeTab, setActiveTab] = useState("projects"); // Add tab state
  const [blogSearchInput, setBlogSearchInput] = useState("");
  const [blogFilter, setBlogFilter] = useState(null);

  const ref = useRef(null);
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectRes, siteRes, blogRes] = await Promise.all([
        supabase
          .from("portfolio_items")
          .select("id, title, category, tag, image_url, web_link, display_order, created_at")
          .order("display_order", { ascending: false })
          .order("created_at", { ascending: false }),

        supabase
          .from("site_content")
          .select("*"),

        // Add blog fetching
        supabase
          .from("blogs")
          .select("id, title, slug, excerpt, thumbnail_url, published_at, tags, category, is_published, author")
          .order("published_at", { ascending: false })
      ]);

      const { data: projectData, error: projectError } = projectRes;
      const { data: siteData, error: siteError } = siteRes;
      const { data: blogData, error: blogError } = blogRes;

      if (projectError) {
        console.error("Error fetching projects:", projectError);
        alert("Failed to load projects.");
        return;
      }

      if (blogError) {
        console.error("Error fetching blogs:", blogError);
        alert("Failed to load blogs.");
      } else {
        setBlogs(blogData || []);
      }

      setProjects(projectData || []);
      const allTags = projectData ? projectData.flatMap((item) => item.tag || []) : [];
      setTags(["All", ...new Set(allTags)]);

      if (siteError) {
        console.error("Error fetching site content:", siteError);
        alert("Failed to load site content.");
      } else {
        setSiteContent(siteData || []);
      }
    } catch (err) {
      console.error("Unexpected error fetching data:", err);
      alert("Unexpected error loading data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProjects =
    selectedTag && selectedTag !== "All"
      ? projects.filter((project) => project.tag?.includes(selectedTag))
      : projects;
  const filteredBlogs = useMemo(() => {
    let result = blogs;

    if (blogSearchInput) {
      const searchTerm = blogSearchInput.toLowerCase();
      result = result.filter(blog => {
        const titleMatch = blog.title?.toLowerCase().includes(searchTerm);
        const excerptMatch = blog.excerpt?.toLowerCase().includes(searchTerm);
        const tagMatch = Array.isArray(blog.tags) && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        return titleMatch || excerptMatch || tagMatch;
      });
    }

    if (blogFilter === 'published') {
      result = result.filter(b => b.is_published);
    } else if (blogFilter === 'draft') {
      result = result.filter(b => !b.is_published);
    } else if (blogFilter === 'cnc') {
      result = result.filter(b => b.category === 'cnc');
    } else if (blogFilter === 'webdev') {
      result = result.filter(b => b.category === 'webdev');
    }

    return result;
  }, [blogs, blogSearchInput, blogFilter]);


  const compressAndResizeImage = async (file) => {
    const options = {
      maxSizeMB: 1,                // یا null اگر آپ صرف dimension+quality-based کنٹرول چاہتے ہیں
      maxWidthOrHeight: 1200,      // portfolio images کے لیے، thumbnails کے لیے کم رکھیں
      initialQuality: 0.9,         // start high, then reduce if needed
      fileType: "image/webp",      // یا "image/avif" جب supported ہو
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const webpFile = new File([compressedFile], `${Date.now()}.webp`, {
        type: "image/webp",
      });
      return webpFile;
    } catch (error) {
      console.error("Image compression/resizing failed:", error);
      return file;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { title, category, tag, customTag, file, web_link, display_order } = formData;
    const finalTag = customTag || tag;

    if (!title || !category || (!editingProject && !file)) {
      alert("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (customTag === "All") {
      alert("The 'All' tag is not allowed.");
      setIsSubmitting(false);
      return;
    }

    let publicURL = editingProject?.image_url;

    if (file) {
      try {
        const processedFile = await compressAndResizeImage(file);

        if (editingProject?.image_url) {
          const oldUrl = editingProject.image_url;
          const parts = oldUrl.split("/");
          const index = parts.findIndex((part) => part === "portfolio-assets") + 1;
          const oldFilePath = parts.slice(index).join("/");

          const { error: deleteError } = await supabase.storage
            .from("portfolio-assets")
            .remove([oldFilePath]);

          if (deleteError) {
            alert("Failed to delete old image: " + deleteError.message);
            setIsSubmitting(false);
            return;
          }
        }

        const filePath = `portfolio/${Date.now()}.webp`;

        const { error: uploadError } = await supabase.storage
          .from("portfolio-assets")
          .upload(filePath, processedFile, {
            cacheControl: "public, max-age=31536000, immutable",
            upsert: true,
          });

        if (uploadError) {
          alert("Upload failed: " + uploadError.message);
          setIsSubmitting(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("portfolio-assets")
          .getPublicUrl(filePath);

        publicURL = publicUrlData.publicUrl;
      } catch (error) {
        alert("Unexpected image error: " + error.message);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      if (editingProject) {
        const { error: updateError } = await supabase
          .from("portfolio_items")
          .update({
            title,
            category,
            tag: [finalTag],
            web_link: web_link || "",
            image_url: publicURL,
            display_order: parseInt(display_order) || 0,
          })
          .eq("id", editingProject.id);

        if (updateError) {
          alert("Update failed: " + updateError.message);
        } else {
          alert("Project updated successfully!");
          await fetchData();
        }
      } else {
        const { error: insertError } = await supabase
          .from("portfolio_items")
          .insert([
            {
              title,
              category,
              tag: [finalTag],
              web_link: web_link || "",
              image_url: publicURL,
              display_order: parseInt(display_order) || 0,
            },
          ]);

        if (insertError) {
          alert("Insert failed: " + insertError.message);
        } else {
          alert("Project added successfully!");
          await fetchData();
        }
      }

      setFormData({
        title: "",
        category: "",
        tag: "All",
        customTag: "",
        web_link: "",
        file: null,
        display_order: "",
      });
      setFilePreview(null);
      setEditingProject(null);
      setShowModalform(false);
    } catch (err) {
      alert("Unexpected error: " + err.message);
    }

    setIsSubmitting(false);
  };

  const handleFileUpload = async (file, column) => {
    const need = window.confirm(`Are you sure you want to update the ${column} file?`);
    if (!need || !file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    const row = siteContent[0];
    const rowId = row?.id;

    if (!rowId) {
      alert("No row found in site_content. Please add site content first.");
      return;
    }

    const oldUrl = row?.[column];
    if (oldUrl) {
      const parts = oldUrl.split("/");
      const index = parts.findIndex((part) => part === "portfolio-assets") + 1;
      const oldFilePath = parts.slice(index).join("/");

      const { error: deleteError } = await supabase.storage
        .from("portfolio-assets")
        .remove([oldFilePath]);

      if (deleteError) {
        alert("Error deleting old file: " + deleteError.message);
        return;
      }
    }

    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(filePath, file, {
        cacheControl: "public, max-age=31536000, immutable",
        upsert: true,
      });

    if (uploadError) {
      alert("Error uploading new file: " + uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("portfolio-assets")
      .getPublicUrl(filePath);

    const publicURL = publicUrlData.publicUrl;

    const { error: updateError } = await supabase
      .from("site_content")
      .update({ [column]: publicURL })
      .eq("id", rowId);

    if (updateError) {
      alert(`Error updating ${column}: ` + updateError.message);
    } else {
      alert(`${column} updated successfully!`);
      await fetchData();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFilePreview(fileURL);
    }
  };

  const Delete = async (id) => {
    const need = window.confirm("Are you sure you want to delete?");
    if (need) {
      try {
        const { error } = await supabase
          .from("portfolio_items")
          .delete()
          .eq("id", id);

        if (error) throw error;
        setProjects((prev) => prev.filter((project) => project.id !== id));
        alert("Project deleted successfully!");
      } catch (error) {
        alert(error.code === "PGRST116" ? "Project not found" : "Error deleting project");
      }
    }
  };

  const handleEdit = (project) => {
    setShowModalform(true);
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      category: project.category || "",
      tag: project.tag?.[0] || "All",
      customTag: "",
      web_link: project.web_link || "",
      file: null,
      display_order: project.display_order || "",
    });
  };

  // Add blog delete function
  const handleDeleteBlog = async (blogId, blogTitle) => {
    if (!confirm(`Are you sure you want to delete "${blogTitle}"?`)) return;

    const { error } = await supabase.from("blogs").delete().eq("id", blogId);
    if (error) {
      alert("Error deleting blog: " + error.message);
      return;
    }

    alert("Blog deleted successfully!");
    setBlogs(blogs.filter(blog => blog.id !== blogId));
  };

  const handlePublishToggle = async (blogId, currentState) => {
    const { error } = await supabase
      .from('blogs')
      .update({ is_published: !currentState })
      .eq('id', blogId);

    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      alert('Status updated successfully!');
      await fetchData(); // Re-fetch to update UI
    }
  };

  return (
    <div className="admin-portfolio dark-mode" style={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="title text-slate-100">Admin Dashboard</h3>
        <LogoutButton />
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 rounded ${activeTab === "projects" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
        >
          Manage Projects
        </button>
        <button
          onClick={() => setActiveTab("blogs")}
          className={`px-4 py-2 rounded ${activeTab === "blogs" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
        >
          Manage Blogs
        </button>
      </div>

      {loading && <p className="text-textmain-100">Loading...</p>}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <>
          <div className="buttons mb-4" style={{ opacity: 1 }}>
            <button onClick={() => setShowModalform(true)} className="edit-btn moody-a">
              + Add Project
            </button>
            <label htmlFor="fileUploadweb">
              <button className="edit-btn moody-a">Change Web Intro Video</button>
              <input
                type="file"
                id="fileUploadweb"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files?.[0], "about-us-video-web")}
              />
            </label>
            <label htmlFor="fileUpload2d">
              <button className="edit-btn moody-a">Change 2D/3D Intro Video</button>
              <input
                type="file"
                id="fileUpload2d"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files?.[0], "about-us-video-2d")}
              />
            </label>
            <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative overflow-hidden">
              <label htmlFor="fileUpload">
                <Image
                  src={siteContent[0]?.main_image_url || "/images/hero-image.png"}
                  alt="Portfolio hero image"
                  width={400}
                  height={400}
                  priority
                  className="rounded-full object-cover w-full h-full cursor-pointer"
                  style={{ aspectRatio: "1/1" }}
                />
              </label>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  handleFileUpload(file, "main_image_url");
                }}
              />
            </div>
          </div>
          <AdminTags tags={tags || []} onTagSelect={setSelectedTag} />
          {showModalform && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="relative z-20 bg-white p-8 max-w-screen-md rounded-xl scale-up-hor-center" style={{ opacity: 1 }}>
                  <button
                    className="absolute top-0 right-0 cursor-pointer border-2 rounded-full p-2 text-gray-950"
                    onClick={() => {
                      setShowModalform(false);
                      setFormData({
                        title: "",
                        category: "",
                        tag: "All",
                        customTag: "",
                        web_link: "",
                        file: null,
                        display_order: "",
                      });
                      setFilePreview(null);
                      setEditingProject(null);
                    }}
                  >
                    X
                  </button>
                  <form onSubmit={handleFormSubmit} className="admin-form dark-form">
                    <input
                      type="text"
                      placeholder="Project Title"
                      className="input-field text-gray-950"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                    <label className="block font-semibold mb-1">Display Order (e.g., 1 = top)</label>
                    <input
                      type="number"
                      placeholder="Enter display order"
                      className="input-field text-gray-950"
                      value={formData.display_order}
                      onChange={(e) =>
                        setFormData({ ...formData, display_order: e.target.value })
                      }
                    />
                    <div className="mb-4">
                      <label className="block font-semibold mb-1">Select Category<span className="text-red-500">*</span></label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="category"
                            value="web"
                            checked={formData.category === "web"}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                          />
                          Web
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="category"
                            value="2d-3d"
                            checked={formData.category === "2d-3d"}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                          />
                          2D / 3D
                        </label>
                      </div>
                    </div>
                    {formData.category && (
                      <div className="mb-4">
                        <label className="block font-semibold mb-1">Select Tag</label>
                        <select
                          className="input-field text-gray-950"
                          value={formData.tag}
                          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                        >
                          <option value="All">Select a tag</option>
                          {(formData.category === "web"
                            ? tags.filter((t) => projects.some((p) => p.category === "web" && p.tag?.includes(t)))
                            : tags.filter((t) => projects.some((p) => p.category === "2d-3d" && p.tag?.includes(t)))
                          ).map((tag, index) => (
                            <option key={index} value={tag}>
                              {tag}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="mb-4">
                      <label className="block font-semibold mb-1">Or Add Custom Tag (optional)</label>
                      <input
                        type="text"
                        placeholder="Enter your custom tag"
                        className="input-field text-gray-950"
                        value={formData.customTag}
                        onChange={(e) => setFormData({ ...formData, customTag: e.target.value })}
                      />
                    </div>
                    {formData.category === "web" && (
                      <div className="mb-4">
                        <label className="block font-semibold mb-1">Add web link (optional)</label>
                        <input
                          type="text"
                          placeholder="Enter web link"
                          className="input-field text-gray-950"
                          value={formData.web_link}
                          onChange={(e) => setFormData({ ...formData, web_link: e.target.value })}
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      className="input-field"
                      onChange={handleFileChange}
                    />
                    {filePreview && (
                      <div className="file-preview mt-4">
                        <p className="text-sm font-semibold mb-2">Preview:</p>
                        <div className="media-frame">
                          {formData.file?.type.startsWith("image/") ? (
                            <Image
                              src={filePreview}
                              alt="Preview"
                              width={454}
                              height={288}
                              className="preview-media"
                              loading="lazy"
                              style={{ opacity: 1 }}
                            />
                          ) : formData.file?.type.startsWith("video/") ? (
                            <video src={filePreview} controls className="preview-media" style={{ opacity: 1 }} />
                          ) : (
                            <p>Preview not supported</p>
                          )}
                        </div>
                      </div>
                    )}
                    <button type="submit" className="submit-btnn" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Uploading...
                        </div>
                      ) : editingProject ? "Update Project" : "Add Project"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" style={{ opacity: 1 }}>
            {loading ? (
              <p className="text-textmain-100">Loading projects...</p>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                  style={{ opacity: 1 }}
                >
                  <div className="card-content">
                    <ProjectCard
                      title={project.title}
                      image_url={project.image_url}
                      gitUrl={project.gitUrl}
                      previewUrl={project.web_link}
                    />
                  </div>
                  <div className="buttons">
                    <button onClick={() => handleEdit(project)} className="edit-btn moody">
                      Edit
                    </button>
                    <button onClick={() => Delete(project.id)} className="edit-btn moody-d">
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-textmain-100">No projects available.</p>
            )}
          </div>
        </>
      )}

      {/* Blogs Tab */}
      {activeTab === "blogs" && (
        <>
          <div className="buttons mb-6" style={{ opacity: 1 }}>
            <Link href="/admin/blog/add" className="edit-btn moody-a inline-block text-center">
              ➕ Add New Blog
            </Link>
          </div>

          {/* Blog Statistics */}
          {!loading && blogs.length > 0 && (
            <div className="bg-[#2c2c2c] rounded-lg p-4 mb-6">
              <h4 className="text-white font-semibold mb-2">Blog Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">

                <div
                  className="cursor-pointer hover:bg-gray-700 rounded p-2"
                  onClick={() => setBlogFilter(null)}
                >
                  <p className="text-2xl font-bold text-blue-400">{blogs.length}</p>
                  <p className="text-sm text-gray-400">Total Blogs</p>
                </div>

                <div
                  className="cursor-pointer hover:bg-gray-700 rounded p-2"
                  onClick={() => setBlogFilter('published')}
                >
                  <p className="text-2xl font-bold text-green-400">{blogs.filter(b => b.is_published).length}</p>
                  <p className="text-sm text-gray-400">Published</p>
                </div>

                <div
                  className="cursor-pointer hover:bg-gray-700 rounded p-2"
                  onClick={() => setBlogFilter('draft')}
                >
                  <p className="text-2xl font-bold text-yellow-400">{blogs.filter(b => !b.is_published).length}</p>
                  <p className="text-sm text-gray-400">Drafts</p>
                </div>

                <div
                  className="cursor-pointer hover:bg-gray-700 rounded p-2"
                  onClick={() => setBlogFilter('cnc')}
                >
                  <p className="text-2xl font-bold text-purple-400">{blogs.filter(b => b.category === 'cnc').length}</p>
                  <p className="text-sm text-gray-400">CNC Blogs</p>
                </div>

                <div
                  className="cursor-pointer hover:bg-gray-700 rounded p-2"
                  onClick={() => setBlogFilter('webdev')}
                >
                  <p className="text-2xl font-bold text-pink-400">{blogs.filter(b => b.category === 'webdev').length}</p>
                  <p className="text-sm text-gray-400">Web Blogs</p>
                </div>
              </div>
            </div>
          )}

          {/* Blog Search */}
          <div className="my-4">
            <input
              type="text"
              placeholder="Search blogs..."
              value={blogSearchInput}
              onChange={(e) => setBlogSearchInput(e.target.value)}
              className="p-2 rounded bg-[#2c2c2c] text-white border border-gray-600 w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" style={{ opacity: 1 }}>
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-textmain-100">Loading blogs...</p>
                </div>
              </div>
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <AdminBlogCard
                  key={blog.id}
                  blog={blog}
                  onDelete={handleDeleteBlog}
                  onPublishToggle={handlePublishToggle}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-[#2c2c2c] rounded-2xl p-8 max-w-md mx-auto">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-textmain-100 mb-4 text-lg">No blogs available</p>
                  <p className="text-gray-400 mb-6">Start creating amazing content for your readers</p>
                  <Link href="/admin/blog/add" className="edit-btn moody-a inline-block">
                    ➕ Create Your First Blog
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPortfolio;