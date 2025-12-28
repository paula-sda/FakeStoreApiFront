'use client';
import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useRouter } from "next/navigation";
import AuthFormWrapper from "@/app/components/AuthFormWrapper";
import InputField from "@/app/components/InputField";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [msg, setMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    if (!email || !password) {
      setMsg({ type: 'error', text: "Rellena todos los campos." });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMsg({ type: 'error', text: error.message });
    } else if (data.user) {
      const name = data.user.user_metadata?.name ?? data.user.email;
      setMsg({ type: 'success', text: `¡Bienvenido ${name}!` });
      setTimeout(() => router.push("/home"), 1500);
    }

    setLoading(false);
  }

  return (
    <AuthFormWrapper>
      <form onSubmit={onSubmit} className="grid gap-5">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Iniciar sesión</h1>

        <InputField label="Email" type="email" value={email} placeholder="tu@email.com" onChange={e => setEmail(e.target.value)} required />
        <InputField label="Contraseña" type="password" value={password} placeholder="Tu contraseña" onChange={e => setPass(e.target.value)} required />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 disabled:opacity-50 font-semibold transition"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>

        {msg && (
          <p className={`mt-3 text-center ${msg.type === 'success' ? 'text-green-600' : 'text-red-600'} font-medium`}>
            {msg.text}
          </p>
        )}
      </form>

      <div className="mt-8 text-center text-purple-800 font-medium">
        ¿No tienes cuenta? <a href="/signup" className="text-purple-700 hover:underline font-semibold block mt-2">Crear una cuenta</a>
      </div>
    </AuthFormWrapper>
  );
}
