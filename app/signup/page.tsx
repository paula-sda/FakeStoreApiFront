'use client';
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import AuthFormWrapper from "@/app/components/AuthFormWrapper";
import InputField from "@/app/components/InputField";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const [msg, setMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    if (!email || !password || !name) {
      setMsg({ type: 'error', text: "Rellena todos los campos." });
      setLoading(false);
      return;
    }

    try {
      // Verificar si el email ya existe en la tabla 'profiles'
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        setMsg({ type: 'error', text: "Esta cuenta ya existe." });
        setLoading(false);
        return;
      }

      // Crear la cuenta en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });

      if (error) {
        setMsg({ type: 'error', text: error.message });
        setLoading(false);
        return;
      }

      if (data.user) {
        //Registrar el usuario en la tabla 'profiles'
        await supabase.from('profiles').insert([{ email, name }]);

        setMsg({ type: 'success', text: "Cuenta creada correctamente. Revisa la confirmación en tu email." });
        setEmail(""); setName(""); setPass("");

        // Redirigir al inicio de sesión después de 1.5 segundos
        setTimeout(() => router.push("/"), 1500);
      }
    } catch (err) {
      setMsg({ type: 'error', text: "Ocurrió un error al crear la cuenta." });
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <AuthFormWrapper>
      <form onSubmit={onSubmit} className="grid gap-5">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Crear cuenta</h1>

        <InputField label="Nombre" type="text" value={name} placeholder="Tu nombre" onChange={e => setName(e.target.value)} required />
        <InputField label="Email" type="email" value={email} placeholder="tu@email.com" onChange={e => setEmail(e.target.value)} required />
        <InputField label="Contraseña" type="password" value={password} placeholder="Tu contraseña" onChange={e => setPass(e.target.value)} required />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 disabled:opacity-50 font-semibold transition"
        >
          {loading ? "Creando…" : "Crear cuenta"}
        </button>

        {msg && (
          <p className={`mt-3 text-center ${msg.type === 'success' ? 'text-green-600' : 'text-red-600'} font-medium`}>
            {msg.text}
          </p>
        )}
      </form>

      <div className="mt-8 text-center text-purple-800 font-medium">
        ¿Ya tienes cuenta? <a href="/" className="text-purple-700 hover:underline font-semibold block mt-2">Iniciar sesión</a>
      </div>
    </AuthFormWrapper>
  );
}
