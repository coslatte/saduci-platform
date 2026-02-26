"use client";

import { useState } from "react";
import type * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/atoms/Buttons";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Alert } from "@/components/molecules/Alert";
import {
  APP_NAME,
  LOGIN_DEFAULT_EMAIL,
  LOGIN_DEFAULT_PASSWORD,
  LOGIN_PROMPT,
  LOGIN_BUTTON,
  LOGIN_ERROR_MSG,
  ALERT_ERROR_TITLE,
} from "@/constants/constants";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const finalEmail = email.trim() || LOGIN_DEFAULT_EMAIL;
    const finalPassword = password.trim() || LOGIN_DEFAULT_PASSWORD;

    setLoading(true);
    try {
      await login(finalEmail, finalPassword);
      router.push("/");
    } catch {
      setError(LOGIN_ERROR_MSG);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-primary-700 text-2xl font-bold text-white shadow-md">
          S
        </div>
        <h1 className="text-(length:--font-size-2xl) font-bold tracking-tight text-slate-900">
          {APP_NAME}
        </h1>
        <p className="mt-1 text-(length:--font-size-sm) text-slate-500">
          {LOGIN_PROMPT}
        </p>
      </div>

      {error && (
        <Alert variant="danger" title={ALERT_ERROR_TITLE}>
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
          {LOGIN_BUTTON}
        </Button>
      </form>
    </div>
  );
}
