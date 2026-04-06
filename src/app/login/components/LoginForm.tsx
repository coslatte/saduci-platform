"use client";

import { useState } from "react";
import type * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/atoms/Buttons";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Text } from "@/components/atoms/Text";
import { Alert } from "@/components/molecules/Alert";
import {
  APP_NAME,
  LOGIN_PROMPT,
  LOGIN_BUTTON,
  LOGIN_ERROR_MSG,
  LOGIN_EMAIL_LABEL,
  LOGIN_EMAIL_PLACEHOLDER,
  LOGIN_PASSWORD_LABEL,
  LOGIN_PASSWORD_PLACEHOLDER,
  LOGIN_HELP_TEXT,
  ALERT_ERROR_TITLE,
} from "@/constants/constants";

/**
 * Handles credential input, authentication request, and login feedback states.
 * Used in X case: primary sign-in form for user access.
 */
export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const finalIdentifier = identifier.trim();
    const finalPassword = password;

    setLoading(true);
    try {
      await login(finalIdentifier, finalPassword);
      router.push("/");
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : LOGIN_ERROR_MSG,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:space-y-8 sm:p-8 md:p-10">
      <div className="text-center">
        <Text
          as="h1"
          size="3xl"
          weight="bold"
          family="secondary"
          tracking="tight"
          className="text-slate-900"
        >
          {APP_NAME.toUpperCase()}
        </Text>
        <Text as="p" size="sm" muted className="mt-2">
          {LOGIN_PROMPT}
        </Text>
        <Text as="p" size="xs" muted className="mt-1">
          {LOGIN_HELP_TEXT}
        </Text>
      </div>

      {error && (
        <Alert variant="danger" title={ALERT_ERROR_TITLE}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="login-identifier">{LOGIN_EMAIL_LABEL}</Label>
          <Input
            id="login-identifier"
            type="text"
            value={identifier}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setIdentifier(event.target.value)
            }
            placeholder={LOGIN_EMAIL_PLACEHOLDER}
            fullWidth
            autoFocus
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="login-password">{LOGIN_PASSWORD_LABEL}</Label>
          <Input
            id="login-password"
            type="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            placeholder={LOGIN_PASSWORD_PLACEHOLDER}
            fullWidth
            required
          />
        </div>
        <Button
          variant="glass"
          type="submit"
          loading={loading}
          className="w-full"
          size="lg"
        >
          {LOGIN_BUTTON}
        </Button>
      </form>
    </div>
  );
}
