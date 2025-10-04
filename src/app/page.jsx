import { createSupabaseServerClient } from "@/lib/supaclintnewforpubblog";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/Navbar";
import ProjectsSectionClient from "./components/ProjectsSectionClient";
import Footer from "./components/Footer";

// ✅ Dynamic Metadata Function
// app/layout.js

export const metadata = {
  metadataBase: new URL("https://unisol-sajjad.vercel.app"), // 🔁 Update this to your actual domain

  title: {
    default: "Sajjad's CNC Design Portfolio",
    template: "%s | Sajjad CNC",
  },
  description: "Explore CNC design tutorials, industry tips, and creative insights by Sajjad. Stay updated with the latest trends in 2D and 3D CNC work.",
  keywords: ["CNC", "laser cutting", "2D design", "3D design", "engraving", "DXF files", "SVG", "SolidWorks", "fabrication"],
  authors: [
    { name: "Sajjad Ahmad", url: "https://unisol-sajjad.vercel.app" },
  ],
  creator: "Sajjad Ahmad",
  publisher: "Sajjad Portfolio",

  openGraph: {
    title: "Sajjad's CNC Design Portfolio",
    description: "See Sajjad's latest CNC design work for laser cutting, engraving, and mechanical prototyping.",
    url: "https://unisol-sajjad.vercel.app",
    siteName: "Sajjad CNC Portfolio",
    images: [
      {
       url: "https://unisol-sajjad.vercel.app/images/cnc-laser-2d-design.png", // 🔁 dynamic per page possible
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
    title: "Sajjad's CNC Design Portfolio",
    description: "Explore high-quality 2D & 3D CNC designs for industrial fabrication and creative solutions.",
    creator: "@sajjad_cnc", // 🔁 optional
    images: ["https://unisol-sajjad.vercel.app/images/cnc-laser-2d-design.png"], // 🔁 dynamic per page possible
  },
  icons: {
    icon: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    shortcut: "/sajjad-2d-3d-cnc-dxf-svg.svg",
    apple: "/sajjad-2d-3d-cnc-dxf-svg.svg",
  },
  category: "technology",
};

export const revalidate = 10; // ✅ Regenerate every 10 seconds

export default async function Home() {
  try {
    const supabase = await createSupabaseServerClient();
    const category = "2d-3d";

    const { data: siteContent } = await supabase
      .from("site_content")
      .select("main_image_url , about-us-video-2d");

    const heroImage = siteContent?.[0]?.main_image_url || "/images/hero-image.png";
    const aboutVideo = siteContent?.[0]?.["about-us-video-2d"];
    const heroText = "Transforming ideas into stunning 2D and 3D CNC designs. Precision, creativity, and craftsmanship in every project.";
    const type = "2d-3d";

    // ✅ Fetch ALL projects from portfolio_items table
    const { data: projects = [], error: projectsError } = await supabase
      .from("portfolio_items")
      .select("id, title, category, tag, image_url, web_link, display_order, created_at")
      .eq('category', '2d-3d')
      .order("display_order", { ascending: false })
      .order("created_at", { ascending: false });

    if (projectsError) {
      console.error("Error fetching projects:", projectsError);
      return <div className="text-center text-textmain-100">Error loading projects. Please try again later.</div>;
    }
    

    // Generate tags from projects
    const allTags = projects ? projects.flatMap((item) => item.tag || []) : [];
    const tags = ["All", ...new Set(allTags)];

    return (
      <main className="flex min-h-screen flex-col bg-[#1e1e1e]">
        <Navbar />
        <div className="container mt-24 mx-auto px-12 py-4">
          <HeroSection heroImage={heroImage} heroText={heroText} type={type} />
          <AboutSection aboutvideo={aboutVideo} />
          {/* Recent Posts Section with Projects */}
          <section className="mt-12">
            <h2 className="text-center text-4xl font-bold text-textmain-100 mt-4 mb-8">
              Recent Posts
            </h2>
            <ProjectsSectionClient
              initialProjects={projects}
              initialTags={tags}
              category={category}
            />
          </section>
        </div>
        <Footer />
      </main>
    );
  } catch (err) {
    console.error("Unexpected error in Home:", err);
    return <div className="text-center text-textmain-100">Unexpected error occurred. Please try again later.</div>;
  }
}

