"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Divider } from "@/components/atoms/Divider";
import { Spinner } from "@/components/atoms/Spinner";
import { Button } from "@/components/atoms/Buttons";
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

const PAGE_WRAPPER = "p-0";
const PAGE_HEADER = "mb-8 flex items-start justify-between gap-4";
const PAGE_TITLE = "text-2xl font-semibold text-zinc-900";
const PAGE_SUBTITLE = "text-sm text-zinc-500 mt-1";
const MOCK_TOGGLE =
  "flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer select-none shrink-0 mt-1";
const GRID = "grid grid-cols-1 md:grid-cols-3 gap-6";
const SECTION_HEADER =
  "flex items-center gap-2 text-sm font-medium text-zinc-700";
const PROFILE_CONTENT = "flex flex-col items-center text-center gap-4 py-2";
const PROFILE_NAME = "font-semibold text-base text-zinc-900 leading-tight";
const PROFILE_EMAIL = "text-sm text-zinc-500 mt-0.5";
const FORM_WRAPPER = "flex flex-col gap-5";
const FORM_FOOTER = "flex justify-end pt-1";

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
    <main className={PAGE_WRAPPER}>
      <div className={PAGE_HEADER}>
        <div>
          <h1 className={PAGE_TITLE}>{SETTINGS_PAGE_TITLE}</h1>
          <p className={PAGE_SUBTITLE}>{SETTINGS_PAGE_SUBTITLE}</p>
        </div>
        <label className={MOCK_TOGGLE}>
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

      <div className={GRID}>
        <div className="md:col-span-1 flex flex-col gap-4 border-b border-slate-100 pb-6 md:border-b-0 md:border-r md:pr-6">
          <div className={SECTION_HEADER}>
            <FiUser size={14} />
            <span>{SETTINGS_PROFILE_SECTION}</span>
          </div>
          <div className={PROFILE_CONTENT}>
            <Avatar name={effectiveUser.name} size="xl" />
            <div>
              <p className={PROFILE_NAME}>{effectiveUser.name}</p>
              <p className={PROFILE_EMAIL}>{effectiveUser.email}</p>
            </div>
            <Badge status="info">{effectiveUser.role}</Badge>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <div className={SECTION_HEADER}>
            <FiShield size={14} />
            <span>{SETTINGS_SECURITY_SECTION}</span>
          </div>
          <form onSubmit={handleSubmit} className={FORM_WRAPPER}>
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

            <div className={FORM_FOOTER}>
              <Button type="submit" disabled={loading}>
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
