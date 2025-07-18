// page.jsx (for route /web)
import { createSupabaseServerClient } from "@/lib/supaclintnewforpubblog";
import HeroSection from "@/app/components/HeroSection";
import Navbar from "@/app/components/Navbar";
import ProjectsSectionClient from "@/app/components/ProjectsSectionClient";
import Footer from "@/app/components/Footer";
import AboutSection from "@/app/components/AboutSection";
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
const aboutVideo = siteContent?.[0]?.["about-us-video-web"];
const heroText =  "Crafting digital experiences that connect, engage, and inspire. From clean code to captivating design — let’s build your online presence together!"
const type = "web";

    // ✅ Fetch 'web' projects from portfolio_items table
    const { data: projects = [], error: projectsError } = await supabase
      .from("portfolio_items")
      .select("id, title, category, tag, image_url, web_link, display_order, created_at")
      .eq('category', 'web')
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
          <section className="mt-12">
            <h2 className="text-center text-4xl font-bold text-textmain-100 mt-4 mb-8">
              My Work
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
    console.error("Unexpected error in WebPortfolioPage:", err);
    return <div className="text-center text-textmain-100">Unexpected error occurred. Please try again later.</div>;
  }
}