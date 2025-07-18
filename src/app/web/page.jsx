// page.jsx (for route /web)
import { createSupabaseServerClient } from "@/lib/supaclintnewforpubblog";
import HeroSection from "@/app/components/HeroSection";
import Navbar from "@/app/components/Navbar";
import BlogListWithSearch from "@/app/components/BlogListWithSearch";
import Footer from "@/app/components/Footer";
export const dynamic = 'force-dynamic';

export const metadata = {
  metadataBase: new URL("https://unisol-sajjad.vercel.app"), // 🔁 Update this to your actual domain

  title: {
    default: "Sajjad's Web Development Blog",
    template: "%s | Sajjad WebDev",
  },
  description: "Explore web development tips, AI tools, modern frameworks, and practical guides by Sajjad. Stay sharp in the digital world.",
  keywords: ["web design", "web development", "SEO", "responsive design", "user experience", "UI/UX", "Next.js", "React", "Laravel", "WordPress"],
  authors: [
    { name: "Sajjad Ahmad", url: "https://unisol-sajjad.vercel.app/web" },
  ],
  creator: "Sajjad Ahmad",
  publisher: "Sajjad Portfolio",

  openGraph: {
    title: "Sajjad's Web Design Portfolio",
    description: "See Sajjad's latest web design work, showcasing modern and responsive websites.",
    url: "https://unisol-sajjad.vercel.app/web",
    siteName: "Sajjad Web Portfolio",
    images: [
      {
        url: "/images/cnc-laser-2d-design.png",
        width: 1200,
        height: 630,
        alt: "Hero image of CNC design work",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sajjad's Website Design Services",
    description: "Explore high-quality website design services for modern and responsive web applications.",
    creator: "@sajjad_cnc", // 🔁 optional
    images: ["/images/cnc-laser-2d-design.png"],
  },

  icons: {
    icon: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    shortcut: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    apple: "/sajjad-2d-3d-cnc-dxf-svg.svg",
  },



  category: "technology",
};


export const revalidate = 10;

export default async function WebPortfolioPage() {
  try {
    const supabase = await createSupabaseServerClient();

    // Check if supabase client is properly initialized
    if (!supabase || typeof supabase.from !== 'function') {
      console.error('Supabase client is not properly initialized');
      return <div>Error: Database connection failed</div>;
    }

    const category = "web";
    const { data: siteContent } = await supabase
  .from("site_content")
  .select("main_image_url , about-us-video-web");

const heroImage = siteContent?.[0]?.main_image_url || "/images/hero-image.png";
const heroText =  "Crafting digital experiences that connect, engage, and inspire. From clean code to captivating design — let’s build your online presence together!"
const type = "web";

    // ✅ Fetch ALL published blogs (like other blog pages)
    const { data: blogs = [], error: blogsError } = await supabase
      .from("blogs")
      .select("id, title, slug, excerpt, thumbnail_url, published_at, tags, category")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (blogsError) {
      console.error("Error fetching blogs:", blogsError);
      return <div className="text-center text-textmain-100">Error loading blogs. Please try again later.</div>;
    }

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
  } catch (err) {
    console.error("Unexpected error in WebPortfolioPage:", err);
    return <div className="text-center text-textmain-100">Unexpected error occurred. Please try again later.</div>;
  }
}