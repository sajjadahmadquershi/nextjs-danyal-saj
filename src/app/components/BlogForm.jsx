"use client";



import { useEffect, useState } from "react";
import RichTextEditor from "@/app/components/RichTextEditor";
import { supabase } from "@/lib/supabaseBrowserClient"; // ✅ درست
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';


export default function BlogForm({ isEditMode = false, blogId = null, initialData = {}}) {
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        tags: "",
        thumbnail_url: "",
        author: "Sajjad",
        published_at: "",
        is_published: false,
        meta_title: "",
        meta_description: "",
        category: "cnc",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isEditMode && initialData) {
            setFormData({
                ...initialData,
                tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "",
                category: initialData.category || "cnc", // ✅ fallback
            });
        }
    }, [initialData, isEditMode]);
    const router = useRouter();
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === "checkbox" ? checked : value;
        setFormData((prev) => ({
            ...prev,
            [name]: finalValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
            setError("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        const payload = {
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            content: formData.content,
            tags: formData.tags ? formData.tags.split(",").map((tag) => tag.trim()) : [],
            thumbnail_url: formData.thumbnail_url || null,
            author: formData.author || "Sajjad",
            published_at: formData.is_published 
                ? (formData.published_at || new Date().toISOString())
                : formData.published_at || null,
            is_published: formData.is_published,
            meta_title: formData.meta_title || null,
            meta_description: formData.meta_description || null,
            category: formData.category,
        };

        let response;

        if (isEditMode && blogId) {
            response = await supabase.from("blogs").update(payload).eq("id", blogId);
        } else {
            response = await supabase.from("blogs").insert([payload]);
        }

        const { error: supabaseError } = response;

        if (supabaseError) {
            setError("Failed to " + (isEditMode ? "update" : "add") + " blog.");
            toast.error("Failed to " + (isEditMode ? "update" : "add") + " blog.");
        } else {
            toast.success(`Blog ${isEditMode ? "updated" : "added"} successfully!`);
            
            // Redirect to admin dashboard after successful submission
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 1000);
        }
        setLoading(false);

    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {isEditMode ? "Edit Blog" : "Add New Blog"}
                </h2>
                <button
                    type="button"
                    onClick={() => router.push('/admin/dashboard')}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition flex items-center gap-2"
                >
                    <span>×</span>
                    Close
                </button>
            </div>
            <Link
                href="/admin/blog"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
            >
                View All Blogs (Edit/Delete)
            </Link>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div>
                <label className="block font-medium">Category *</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                >
                    <option value="cnc">CNC / 2D-3D</option>
                    <option value="webdev">Web Development / AI</option>
                </select>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Title *</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Slug *</label>
                    <input
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="e.g. how-to-start-cnc"
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Excerpt *</label>
                    <input
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="font-semibold block text-gray-700">Content *</label>

                    <RichTextEditor
                        value={formData.content}
                        onChange={(val) => setFormData((prev) => ({ ...prev, content: val }))}
                    />
                </div>

                <div>
                    <label className="block font-medium">Tags (comma separated)</label>
                    <input
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="CNC, Design, Laser"
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium">Thumbnail URL</label>
                    <input
                        name="thumbnail_url"
                        value={formData.thumbnail_url}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium">Published At (optional)</label>
                    <input
                        type="datetime-local"
                        name="published_at"
                        value={formData.published_at}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="is_published"
                        checked={formData.is_published}
                        onChange={handleChange}
                    />
                    <label className="font-medium">Publish Now</label>
                </div>

                <div>
                    <label className="block font-medium">Meta Title (optional)</label>
                    <input
                        name="meta_title"
                        value={formData.meta_title}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-medium">Meta Description (optional)</label>
                    <textarea
                        name="meta_description"
                        value={formData.meta_description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? (isEditMode ? "Updating..." : "Submitting...") : isEditMode ? "Update Blog" : "Add Blog"}
                </button>
            </form>
        </div>
    );
}
