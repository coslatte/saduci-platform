"use client";

import { FiGithub, FiBox, FiBookOpen } from "react-icons/fi";
import LinkCard from "@/components/molecules/LinkCard";
import { useAuth } from "@/lib/auth";
import { Text } from "@/components/atoms/Text";
import { Divider } from "@/components/atoms/Divider";
import {
  HOME_DEFAULT_GREETING,
  HOME_WELCOME_SUBTITLE,
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
    <div className="flex flex-col gap-8">
      <div>
        <Text
          as="h1"
          size="2xl"
          weight="bold"
          tracking="tight"
          className="md:text-(length:--font-size-3xl)"
        >
          {greeting}
        </Text>
        <Text size="sm" muted className="mt-2">
          {HOME_WELCOME_SUBTITLE}
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <FiBox className="size-5 text-primary-600" />
          <Text as="h2" size="lg" weight="semibold">
            {ABOUT_TITLE}
          </Text>
        </div>
        <div className="space-y-4">
          <Text size="sm" className="leading-relaxed text-slate-600">
            {ABOUT_DESC}
          </Text>
        </div>
      </div>

      <Divider />

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
            iconPosition="left"
          />
        ))}
      </div>
    </div>
  );
}
