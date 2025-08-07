'use client';
import { useAuth } from '@/context/AuthContext';
import AdminPortfolio from '@/app/components/admin';

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-red-500">Access denied. Admin privileges required.</div>
      </div>
    );
  }

  return <AdminPortfolio />;
} 