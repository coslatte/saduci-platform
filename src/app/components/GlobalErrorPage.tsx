"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Buttons";
import {
  ERROR_PAGE_TITLE,
  ERROR_PAGE_SUBTITLE,
  ERROR_PAGE_RETRY_BUTTON,
  ERROR_PAGE_BACK_BUTTON,
} from "@/constants/constants";

export interface GlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const styles = {
  wrapper:
    "flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center",
  codeText: "font-secondary select-none font-bold leading-none text-zinc-300",
  codeSize: "text-[7rem] md:text-[10rem]",
  textBlock: "flex max-w-sm flex-col gap-2",
  divider: "mx-auto h-px w-12 bg-zinc-200",
  actions: "flex flex-wrap justify-center gap-3",
  digestText: "mt-1 font-mono",
} as const;

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  useEffect(() => {
    console.error("[ErrorPage]", error.message);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.codeText} ${styles.codeSize}`} aria-label="Error">
        500
      </p>
      <div className={styles.divider} role="presentation" />
      <div className={styles.textBlock}>
        <Text as="h1" size="2xl" weight="semibold" tracking="tight">
          {ERROR_PAGE_TITLE}
        </Text>
        <Text size="sm" muted>
          {ERROR_PAGE_SUBTITLE}
        </Text>
        {error.digest && (
          <Text size="xs" muted className={styles.digestText}>
            Referencia: {error.digest}
          </Text>
        )}
      </div>
      <div className={styles.actions}>
        <Button variant="primary" onClick={reset}>
          {ERROR_PAGE_RETRY_BUTTON}
        </Button>
        <Link href="/">
          <Button variant="outline">{ERROR_PAGE_BACK_BUTTON}</Button>
        </Link>
      </div>
    </div>
  );
}
