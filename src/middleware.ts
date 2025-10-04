import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  // console.log(res, "respons")
  // console.log(req,"respons")
  return res;

}

export const config = {
  matcher: ['/admin/:path*'],
};