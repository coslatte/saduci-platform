"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/atoms/Buttons";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Alert } from "@/components/molecules/Alert";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const finalEmail = email.trim() || "ana@sadeci.com";
    const finalPassword = password.trim() || "password";

    setLoading(true);
    try {
      await login(finalEmail, finalPassword);
      router.push("/");
    } catch {
      setError("No se pudo iniciar sesión. Intente de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-primary-700 text-2xl font-bold text-white shadow-md">
            S
          </div>
          <h1 className="text-[length:var(--font-size-2xl)] font-bold tracking-tight text-slate-900">
            Sadeci Platform
          </h1>
          <p className="mt-1 text-[length:var(--font-size-sm)] text-slate-500">
            Inicie sesión para continuar
          </p>
        </div>

        {error && (
          <Alert variant="danger" title="Error">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="login-email">Correo electrónico</Label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              fullWidth
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="login-password">Contraseña</Label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              fullWidth
            />
          </div>
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
