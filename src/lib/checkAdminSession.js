import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function checkAdminSession() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    redirect('/admin');
  }

  return supabase;
} 
