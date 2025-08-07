// ✅ Correct file: src/utility/supabaseServerClient.js
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createSupabaseServerClient = () => {
  return createRouteHandlerClient({ cookies });
};

