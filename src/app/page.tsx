"use client";

import { FiGithub, FiBox, FiActivity, FiBookOpen } from "react-icons/fi";
import LinkCard from "@/components/molecules/LinkCard";
import { useAuth } from "@/lib/auth";
import {
  HOME_DEFAULT_GREETING,
  HOME_WELCOME_SUBTITLE,
  ABOUT_TITLE,
  ABOUT_DESC,
  ABOUT_TAG_MC,
  ABOUT_VERSION,
  PROJECT_LINKS,
} from "@/constants/constants";

export default function Home() {
  const { user } = useAuth();
  const greeting = user
    ? `Hola, ${user.name.split(" ")[0]}`
    : HOME_DEFAULT_GREETING;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-(length:--font-size-2xl) font-bold tracking-tight text-slate-900 md:text-(length:--font-size-3xl)">
          {greeting}
        </h1>
        <p className="mt-2 text-(length:--font-size-sm) text-slate-500">
          {HOME_WELCOME_SUBTITLE}
        </p>
      </div>

      <div className="flex flex-col gap-4 border-b border-slate-100 pb-8">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <FiBox className="size-5 text-primary-600" />
          <h2 className="text-(length:--font-size-lg) font-semibold text-slate-800">
            {ABOUT_TITLE}
          </h2>
        </div>
        <div className="space-y-4">
          <p className="text-(length:--font-size-sm) leading-relaxed text-slate-600">
            {ABOUT_DESC}
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-(length:--font-size-xs) font-medium text-primary-700">
              <FiActivity className="size-3.5" /> {ABOUT_TAG_MC}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-50 px-3 py-1 text-(length:--font-size-xs) font-medium text-secondary-700">
              {ABOUT_VERSION}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECT_LINKS.map((link) => (
          <LinkCard
            key={link.href}
            href={link.href}
            icon={
              link.href.includes("github") ? (
                <FiGithub className="size-5" />
              ) : (
                <FiBookOpen className="size-5" />
              )
            }
            label={link.label}
            description={link.description}
          />
        ))}
      </div>
    </div>
  );
}
