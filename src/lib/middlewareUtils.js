import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // console.log('Middleware Supabase URL:', supabaseUrl);
  // console.log('Middleware Supabase Key:', supabaseKey);

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          request.cookies.set(name, value, options)
          supabaseResponse.cookies.set(name, value, options)
        },
        remove: (name, options) => {
          request.cookies.set(name, '', options)
          supabaseResponse.cookies.set(name, '', options)
        },
      },
    }
  )

  await supabase.auth.getUser()

  return supabaseResponse
}