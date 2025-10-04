// "use client";
// import { useRouter } from "next/navigation";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// const LogoutButton = () => {
//   const supabase = createClientComponentClient();
//   const router = useRouter();

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push("/login");
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
//     >
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;
// ✅ app/components/LogoutButton.jsx
import { supabase } from '@/lib/supabaseBrowserClient';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };
  return (
    <button onClick={handleLogout} className="text-red-500">Logout</button>
  );
};

export default LogoutButton;
