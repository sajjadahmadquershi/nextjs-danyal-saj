export const dynamic = 'force-dynamic';

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BlogListWithSearch from "@/app/components/BlogListWithSearch";
import { createSupabaseServerClient } from "@/lib/supaclintnewforpubblog";
import HeroSection from "@/app/components/HeroSection";
import "@/app/globals.css";
import "@/styile/adminportfolio.css";

export const metadata = {
  metadataBase: new URL("https://unisol-sajjad.vercel.app"),
  title: {
    default: "Sajjad's Web Development Blog",
    template: "%s | Sajjad WebDev",
  },
  description:
    "Explore web development tips, AI tools, modern frameworks, and practical guides by Sajjad. Stay sharp in the digital world.",
  keywords: [
    "Web development",
    "AI tools",
    "Next.js",
    "frontend development",
    "JavaScript",
    "React",
    "web design",
    "SaaS",
    "coding tutorials",
  ],
  authors: [{ name: "Sajjad Ahmad", url: "https://unisol-sajjad.vercel.app" }],
  creator: "Sajjad Ahmad",
  publisher: "Sajjad WebDev Blog",

  openGraph: {
    title: "Sajjad's Web Development Blog",
    description:
      "Read Sajjad's blog on coding, frameworks, and AI in modern web development.",
    url: "https://unisol-sajjad.vercel.app/blog/blog-web",
    siteName: "Sajjad WebDev Blog",
    images: [
      {
        url: "/images/blog-web-og.png",
        width: 1200,
        height: 630,
        alt: "Web development blog preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sajjad's Web Development Blog",
    description:
      "Tips and tutorials on frontend dev, AI, and smart tools by Sajjad.",
    creator: "@sajjad_cnc",
    images: ["/images/blog-web-og.png"],
  },

  icons: {
    icon: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    shortcut: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    apple: "/sajjad-2d-3d-cnc-dxf-svg.svg",
  },

  category: "technology",
};

export const revalidate = 60;

export default async function WebBlogPage() {
  try {
    // Create Supabase client
    const supabase = await createSupabaseServerClient();

    // Check if supabase client is properly initialized
    if (!supabase || typeof supabase.from !== 'function') {
      console.error('Supabase client is not properly initialized');
      return <div>Error: Database connection failed</div>;
    }

    // ✅ Fetch ALL published blogs (like manage blogs button)
    const { data: blogs = [], error: blogsError } = await supabase
      .from("blogs")
      .select("id, title, slug, excerpt, thumbnail_url, published_at, tags, category")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (blogsError) {
      console.error('Error fetching blogs:', blogsError);
      return <div>Error loading blogs: {blogsError.message}</div>;
    }

    // Fetch site content
    const { data: siteContent } = await supabase
      .from("site_content")
      .select("main_image_url");

    const heroImage = siteContent?.[0]?.main_image_url || "/images/hero-image.png";
    const heroText = "Crafting digital experiences that connect, engage, and inspire. From clean code to captivating design — let's build your online presence together!";
    const type = "web";

    return (
      <main className="flex min-h-screen flex-col bg-[#1e1e1e]">
        <Navbar />
        <div className="container mt-24 mx-auto px-12 py-4">
          <HeroSection heroImage={heroImage} heroText={heroText} type={type} />
          <BlogListWithSearch
            blogs={blogs}
            isAdmin={false}
            defaultCategoryFilter="webdev"
          />
        </div>
        <Footer />
      </main>
    );
  } catch (error) {
    console.error('Unexpected error in WebBlogPage:', error);
    return <div>Error loading page: {error.message}</div>;
  }
}