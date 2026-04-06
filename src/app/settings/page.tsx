"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Divider } from "@/components/atoms/Divider";
import { Spinner } from "@/components/atoms/Spinner";
import { Button } from "@/components/atoms/Buttons";
import { Text } from "@/components/atoms/Text";
import { Alert } from "@/components/molecules/Alert";
import { FormField } from "@/components/molecules/FormField";
import { useAuth } from "@/lib/auth";
import { FiShield, FiUser } from "react-icons/fi";
import {
  SETTINGS_PAGE_TITLE,
  SETTINGS_PAGE_SUBTITLE,
  SETTINGS_PROFILE_SECTION,
  SETTINGS_SECURITY_SECTION,
  SETTINGS_CURRENT_PWD_LABEL,
  SETTINGS_NEW_PWD_LABEL,
  SETTINGS_CONFIRM_PWD_LABEL,
  SETTINGS_SAVE_BTN,
  SETTINGS_SAVING_BTN,
  SETTINGS_MOCK_LABEL,
  SETTINGS_PWD_MIN_HINT,
  SETTINGS_PWD_EMPTY,
  SETTINGS_PWD_TOO_SHORT,
  SETTINGS_PWD_MISMATCH,
  SETTINGS_PWD_SUCCESS,
  SETTINGS_PWD_ERROR,
  SETTINGS_NET_ERROR,
} from "@/constants/constants";

export default function UserSettingsPage() {
  const { user } = useAuth();
  const [useMock, setUseMock] = useState(false);

  const effectiveUser =
    useMock || !user
      ? {
          name: "Juan Pérez",
          email: "juan.perez@example.com",
          role: "Administrador",
        }
      : user;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPwdError, setNewPwdError] = useState<string | undefined>();
  const [confirmPwdError, setConfirmPwdError] = useState<string | undefined>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setNewPwdError(undefined);
    setConfirmPwdError(undefined);

    let valid = true;

    if (!newPassword) {
      setNewPwdError(SETTINGS_PWD_EMPTY);
      valid = false;
    } else if (newPassword.length < 8) {
      setNewPwdError(SETTINGS_PWD_TOO_SHORT);
      valid = false;
    }

    if (!confirmPassword || newPassword !== confirmPassword) {
      setConfirmPwdError(SETTINGS_PWD_MISMATCH);
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, mock: useMock }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        setMessage(data.message || SETTINGS_PWD_SUCCESS);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setIsSuccess(false);
        setMessage(data.message || SETTINGS_PWD_ERROR);
      }
    } catch {
      setIsSuccess(false);
      setMessage(SETTINGS_NET_ERROR);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-0">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Text as="h1" size="2xl" weight="semibold" className="text-zinc-900">
            {SETTINGS_PAGE_TITLE}
          </Text>
          <Text as="p" size="sm" muted className="mt-1">
            {SETTINGS_PAGE_SUBTITLE}
          </Text>
        </div>
        <label className="flex cursor-pointer select-none items-center gap-1.5 self-start text-(length:--font-size-xs) text-zinc-400 sm:mt-1 sm:self-auto">
          <input
            type="checkbox"
            checked={useMock}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUseMock(e.target.checked)
            }
          />
          {SETTINGS_MOCK_LABEL}
        </label>
      </div>

      <Divider className="mb-6 border-slate-200/80" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1 flex flex-col gap-4 border-b border-slate-100 pb-6 md:border-b-0 md:border-r md:pr-6">
          <div className="flex items-center gap-2 text-zinc-700">
            <FiUser size={14} />
            <Text as="span" size="sm" weight="medium" className="text-zinc-700">
              {SETTINGS_PROFILE_SECTION}
            </Text>
          </div>
          <div className="flex flex-col items-center text-center gap-4 py-2">
            <Avatar name={effectiveUser.name} size="xl" />
            <div>
              <Text
                as="p"
                size="base"
                weight="semibold"
                className="leading-tight text-zinc-900"
              >
                {effectiveUser.name}
              </Text>
              <Text as="p" size="sm" muted className="mt-0.5">
                {effectiveUser.email}
              </Text>
            </div>
            <Badge status="info">{effectiveUser.role}</Badge>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-zinc-700">
            <FiShield size={14} />
            <Text as="span" size="sm" weight="medium" className="text-zinc-700">
              {SETTINGS_SECURITY_SECTION}
            </Text>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <FormField
              id="current-password"
              label={SETTINGS_CURRENT_PWD_LABEL}
              inputProps={{
                type: "password",
                value: currentPassword,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentPassword(e.target.value),
                placeholder: "Contraseña actual",
              }}
            />

            <Divider />

            <FormField
              id="new-password"
              label={SETTINGS_NEW_PWD_LABEL}
              hint={SETTINGS_PWD_MIN_HINT}
              error={newPwdError}
              inputProps={{
                type: "password",
                value: newPassword,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPassword(e.target.value),
                placeholder: "Nueva contraseña",
              }}
            />

            <FormField
              id="confirm-password"
              label={SETTINGS_CONFIRM_PWD_LABEL}
              error={confirmPwdError}
              inputProps={{
                type: "password",
                value: confirmPassword,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value),
                placeholder: "Confirmar nueva contraseña",
              }}
            />

            {message && (
              <Alert variant={isSuccess ? "success" : "danger"}>
                {message}
              </Alert>
            )}

            <div className="flex justify-stretch pt-1 sm:justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Spinner size="sm" />
                    {SETTINGS_SAVING_BTN}
                  </span>
                ) : (
                  SETTINGS_SAVE_BTN
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
