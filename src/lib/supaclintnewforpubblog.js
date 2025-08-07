// //src\lib\supaclintnewforpubblog.js
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

// export const createSupabaseServerClient = (cookies) => {
//   return createServerComponentClient({ cookies });
// };


// // src/lib/supaclintnewforpubblog.js
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// export const createSupabaseServerClient = async () => {
//   const cookieStore = await cookies();

//   const client = createServerComponentClient({
//     cookies: () => cookieStore
//   });

//   return client;
// };


// src/lib/supaclintnewforpubblog.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  const client = createServerComponentClient({
    cookies: () => cookieStore
  });

  return client;
};