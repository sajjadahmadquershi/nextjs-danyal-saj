import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BlogListWithSearch from "@/app/components/BlogListWithSearch";
import { createSupabaseServerClient } from "@/lib/supaclintnewforpubblog";
import { cookies } from "next/headers";
import HeroSection from "../../components/HeroSection";
import "@/app/globals.css";
import "@/styile/adminportfolio.css"; // Ensure this path is correct

export const metadata = {
    metadataBase: new URL("https://unisol-sajjad.vercel.app"),
  title: {
    default: "Sajjad's CNC Blog",
    template: "%s | Sajjad CNC",
  },
  description:
    "Explore CNC design tutorials, industry tips, and creative insights by Sajjad. Stay updated with the latest trends in 2D and 3D CNC work.",
  keywords: [
    "CNC blog",
    "2D design",
    "3D design",
    "laser cutting",
    "engraving",
    "DXF tutorials",
    "SVG resources",
    "SolidWorks tips",
  ],
  authors: [{ name: "Sajjad Ahmad", url: "https://unisol-sajjad.vercel.app" }],
  creator: "Sajjad Ahmad",
  publisher: "Sajjad CNC Blog",

  openGraph: {
    title: "Sajjad's CNC Blog",
    description:
      "Tips, tutorials, and insights on CNC, laser cutting, DXF, and creative design by Sajjad.",
    url: "https://unisol-sajjad.vercel.app/blog/cnc",
    siteName: "Sajjad CNC Blog",
    images: [
      {
        url: "/images/blog-cnc-og.png", // ✅ You should add this image to /public/images
        width: 1200,
        height: 630,
        alt: "Sajjad CNC blog preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sajjad's CNC Blog",
    description:
      "Follow Sajjad’s blog for CNC insights, SolidWorks tricks, DXF resources, and more.",
    creator: "@sajjad_cnc",
    images: ["/images/blog-cnc-og.png"],
  },

  icons: {
    icon: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    shortcut: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    apple: "/sajjad-2d-3d-cnc-dxf-svg.svg",
  },

  category: "technology",
};

export const revalidate = 60;

export default async function BlogPage() {
  const supabase = await createSupabaseServerClient();
  // const supabase = createSupabaseServerClient(() => cookies());

  // ✅ Fetch ALL published blogs (like manage blogs button)
  const { data: blogs = [] } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, thumbnail_url, published_at, tags, category")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
      const { data: siteContent } = await supabase
    .from("site_content")
    .select("main_image_url");

  const heroImage = siteContent?.[0]?.main_image_url || "/images/hero-image.png";
  const heroText = "Transforming ideas into stunning 2D and 3D CNC designs. Precision, creativity, and craftsmanship in every project.";
  const type = "2d-3d";

  return (
    <main className="flex min-h-screen flex-col bg-[#1e1e1e]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection heroImage={heroImage} heroText={heroText} type={type} />
        <BlogListWithSearch
          blogs={blogs} 
          isAdmin={false}
          defaultCategoryFilter="cnc"
        />
      </div>
      <Footer />
    </main>
  );
}
