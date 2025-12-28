'use client';

import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // solo después de montar en cliente
  }, []);

  const simpleHeader = pathname === "/" || pathname === "/signup";
  const logoHref = simpleHeader ? "/" : "/home";

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  // Evitamos renderizar condicional que depende de SSR
  if (!mounted) return null;

  return (
    <header className="bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href={logoHref} className="text-2xl font-bold tracking-wide flex items-center gap-2">
          🛍️ <span>FakeStore</span>
        </Link>

        {!simpleHeader && (
          <button
            onClick={logout}
            className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-100 transition"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
}
