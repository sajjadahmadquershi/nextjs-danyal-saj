

// import { cookies } from "next/headers";
// import { createSupabaseServerClient } from "@/utility/supabaseServerClient";

// export async function GET() {
//   const cookieStore = cookies(); // ✅ Read cookies securely
//   const supabase = createSupabaseServerClient(cookieStore);

//   const { data: blogs, error } = await supabase
//     .from("blogs")
//     .select("slug, updated_at");

//   if (error) {
//     console.error("Supabase error:", error);
//     return new Response(JSON.stringify([]), { status: 500 });
//   }

//   return new Response(JSON.stringify(blogs), {
//     headers: { "Content-Type": "application/json" },
//   });
// }


// //D:\nextjs-portfolio-main\Next.js-app\src\app\api\sitemap\blogs\route.js
// import { createSupabaseServerClient } from '@/utility/supabaseServerClient';

// export async function GET() {
//   const supabase = createSupabaseServerClient();

//   const { data: blogs, error } = await supabase
//     .from("blogs")
//     .select("slug, updated_at");

//   if (error) {
//     console.error("Supabase error:", error);
//     return new Response(JSON.stringify([]), { status: 500 });
//   }

//   return new Response(JSON.stringify(blogs), {
//     headers: { "Content-Type": "application/json" },
//   });
// }
// import { createSupabaseServerClient } from '@/utility/supabaseServerClient';

// export async function GET() {
//   const supabase = createSupabaseServerClient();

//   try {
//     const { data: blogs, error } = await supabase
//       .from('blogs')
//       .select('slug, updated_at');

//     if (error) {
//       console.error('Supabase error:', error);
//       return new Response(JSON.stringify([]), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     return new Response(JSON.stringify(blogs || []), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     return new Response(JSON.stringify([]), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }