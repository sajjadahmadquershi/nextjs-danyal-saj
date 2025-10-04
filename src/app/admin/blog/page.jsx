


// import { checkAdminSession } from "@/lib/isAdminUser";
// import Navbar from "@/app/components/Navbar";
// import Footer from "@/app/components/Footer";
// import BlogListWithSearch from "@/app/components/BlogListWithSearch";
// import HeroSection from "@/app/components/HeroSection";


// export const revalidate = 60;

// export default async function BlogPage() {
//   const supabase = await checkAdminSession();


//   const { data: siteContent } = await supabase
//     .from("site_content")
//     .select("main_image_url");

//   const { data: blogs = [] } = await supabase
//     .from("blogs")
//     .select("id, title, slug, excerpt, thumbnail_url, published_at, tags, category")
//     .eq("is_published", true)
//     .not("published_at", "is", null)
//     .order("published_at", { ascending: false });

//   // ✅ Check if admin user
  
//   const isAdmin = true

//   return (
//     <main className="flex min-h-screen flex-col bg-[#1e1e1e]">
//       <Navbar />
//       <div className="container mt-24 mx-auto px-12 py-4">
//         <HeroSection
//           heroImage={siteContent?.[0]?.main_image_url || "/images/hero-image.png"}
//           heroText="Transforming ideas into stunning 2D and 3D CNC designs. Precision, creativity, and craftsmanship in every project."
//           type="2d-3d"
//         />
//         <BlogListWithSearch blogs={blogs} isAdmin={isAdmin} />
//       </div>
//       <Footer />
//     </main>
//   );
// }
import { getSupabaseAndUser } from "@/lib/getSupabaseAndUser";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BlogListWithSearch from "@/app/components/BlogListWithSearch";
import HeroSection from "@/app/components/HeroSection";

export const revalidate = 60;

export default async function BlogPage() {
  const { supabase, user } = await getSupabaseAndUser();

  const { data: siteContent } = await supabase
    .from("site_content")
    .select("main_image_url");

  const { data: blogs = [] } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, thumbnail_url, published_at, tags, category")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const isAdmin = user?.id === process.env.NEXT_PUBLIC_ADMIN_ID;


  return (
    <main className="flex min-h-screen flex-col bg-[#1e1e1e]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection
          heroImage={siteContent?.[0]?.main_image_url || "/images/hero-image.png"}
          heroText="Transforming ideas into stunning 2D and 3D CNC designs. Precision, creativity, and craftsmanship in every project."
          type="2d-3d"
        />
        <BlogListWithSearch blogs={blogs} isAdmin={isAdmin} defaultCategoryFilter="all" />
      </div>
      <Footer />
    </main>
  );
}
