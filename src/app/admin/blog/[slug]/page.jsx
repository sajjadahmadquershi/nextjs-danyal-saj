


import { checkAdminSession } from "@/lib/checkAdminSession";
import BlogForm from "@/app/components/BlogForm";

export default async function EditBlogPage({ params }) {
  const supabase = await checkAdminSession();
  
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !blog) {
    return <div className="text-center text-red-500 mt-10">⚠️ Blog not found</div>;
  }

  return (
    <div className="pt-24 px-4">
      <BlogForm
        isEditMode={true}
        blogId={blog.id}
        initialData={blog}
        isAdmin={true}
      />
    </div>
  );
}
