// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// export async function getSupabaseAndUser() {
//   const supabase = createServerComponentClient({ cookies });
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   return { supabase, user };
// }
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// export async function getSupabaseAndUser() {
//   const supabase = createServerComponentClient({ cookies });

//   // سیشن چیک کریں
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // صارف کی معلومات حاصل کریں
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   return { supabase, user, session };
// }

// lib/getSupabaseAndUser.ts
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getSupabaseAndUser() {
  const cookieStore = await cookies(); // ✅ Proper cookie context
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser();

  return { supabase, user };
}
