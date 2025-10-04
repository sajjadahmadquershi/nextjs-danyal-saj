'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (!loading && user) {
      router.push('/admin/dashboard');
    }
  }, [user, loading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg('Login failed: ' + error.message);
      } else if (data.user) {
        // Wait a moment for auth state to update, then redirect
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 100);
      }
    } catch (error) {
      setErrorMsg('Login failed: ' + error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <div>Loading...</div>
      </div>
    );
  }

  // Don't render login form if user is already authenticated
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600"
          disabled={isLoggingIn}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 rounded bg-gray-700 border border-gray-600"
          disabled={isLoggingIn}
        />
        <button
          type="submit"
          disabled={isLoggingIn}
          className={`w-full ${
            isLoggingIn 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-semibold py-2 rounded transition`}
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
