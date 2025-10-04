
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

 const createSupabaseServerClient = (cookieStore) => {
  return createServerComponentClient({ cookies: cookieStore });
};

export default createSupabaseServerClient;
