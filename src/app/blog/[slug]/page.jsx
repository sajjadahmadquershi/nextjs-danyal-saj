import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GlobalShareButtons from "@/app/components/GlobalShareButtons";
import { notFound } from "next/navigation";
import Image from "next/image"; // ⬅️ Add at the top


export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies }); // ✅ cookies passed here

  const { data: blog } = await supabase
    .from("blogs")
    .select("title, excerpt, thumbnail_url")
    .eq("slug", params.slug)
    .single();

  if (!blog) {
    return {
      title: "Blog not found | Sajjad CNC",
      description: "This blog post was not found.",
    };
  }

  // ✅ Extract real image URL if optimized version is provided
  const getOGImageUrl = (url) => {
    try {
      const parsed = new URL(url);
      const original = parsed.searchParams.get("url");
      return original ? decodeURIComponent(original) : url;
    } catch {
      return url;
    }
  };

  const imageUrl = getOGImageUrl(blog.thumbnail_url || "https://unisol-sajjad.vercel.app/images/cnc-laser-2d-design.png");

  return {
    title: blog.title,
    description: blog.excerpt,
    icons: {
      icon: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [imageUrl],
    },
  };
}


export default async function BlogDetail({ params }) {
  const supabase = createServerComponentClient({ cookies }); // ✅ cookies passed here

  const { data: blog } = await supabase
    .from("blogs")
    .select("title, content, author, published_at, thumbnail_url")
    .eq("slug", params.slug)
    .single();

  if (!blog) {
    notFound(); // ✅ Built-in 404
  }

  return (
    <main className="bg-[#1e1e1e] text-white min-h-screen">
      <Navbar />
      <article className="pt-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {blog.thumbnail_url && (
          <div className="relative w-full max-h-[500px] mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={blog.thumbnail_url}
              alt={blog.title}
              layout="responsive"
              width={1200} // or an approximate width
              height={500} // or an approximate height
              objectFit="cover"
              className="rounded-xl"
              priority // for above-the-fold content
            />
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{blog.title}</h1>
        <div className="text-gray-200 text-sm mb-6 flex flex-wrap gap-8 items-center">
          <span>✍️ {blog.author || "Sajjad"}</span>
          <span>🗓️ {new Date(blog.published_at).toLocaleDateString()}</span>
          {/* ✅ Inline Share Button with Tooltip */}
          <div className="relative group flex items-center">
            <div className="absolute bottom-full mb-1 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Share
            </div>
            <GlobalShareButtons title={blog.title} />
          </div>
        </div>
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
      <Footer />
    </main>
  );
}
