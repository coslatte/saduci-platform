"use client";

import { FiGithub, FiBox, FiBookOpen } from "react-icons/fi";
import LinkCard from "@/components/molecules/LinkCard";
import { useAuth } from "@/lib/auth";
import { Text } from "@/components/atoms/Text";
import { DashboardInfoSection } from "@/app/components/DashboardInfoSection";
import {
  HOME_DEFAULT_GREETING,
  HOME_WELCOME_SUBTITLE,
  HOME_DOCUMENTATION_SECTION_TITLE,
  HOME_DOCUMENTATION_SECTION_DESCRIPTION,
  ABOUT_TITLE,
  ABOUT_DESC,
  PROJECT_LINKS,
} from "@/constants/constants";

export default function Home() {
  const { user } = useAuth();
  const greeting = user
    ? `Hola, ${user.name.split(" ")[0]}`
    : HOME_DEFAULT_GREETING;

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto divide-y divide-slate-200/80">
      <DashboardInfoSection
        className="pb-8"
        titleAs="h1"
        title={greeting}
        description={HOME_WELCOME_SUBTITLE}
      >
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center gap-3">
            <FiBox className="size-5 text-primary-600" />
            <Text as="h3" size="lg" weight="semibold">
              {ABOUT_TITLE}
            </Text>
          </div>
          <div className="space-y-4">
            <Text
              size="sm"
              className="leading-relaxed text-justify text-slate-600"
            >
              {ABOUT_DESC}
            </Text>
          </div>
        </div>
      </DashboardInfoSection>

      <DashboardInfoSection
        title={HOME_DOCUMENTATION_SECTION_TITLE}
        className="pt-8"
      >
        <Text size="sm" muted className="text-justify">
          {HOME_DOCUMENTATION_SECTION_DESCRIPTION}
        </Text>

        <div className="grid gap-4 sm:mx-auto sm:w-full sm:max-w-4xl sm:grid-cols-2">
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
              iconPosition="left"
            />
          ))}
        </div>
      </DashboardInfoSection>
    </div>
  );
}
