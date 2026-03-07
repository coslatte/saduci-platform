import Link from "next/link";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Buttons";
import {
  NOT_FOUND_CODE,
  NOT_FOUND_TITLE,
  NOT_FOUND_SUBTITLE,
  NOT_FOUND_BACK_BUTTON,
} from "@/constants/constants";

const styles = {
  wrapper:
    "flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center",
  codeText:
    "font-secondary select-none font-bold leading-none text-primary-600",
  codeSize: "text-[7rem] md:text-[10rem]",
  textBlock: "flex max-w-sm flex-col gap-2",
  divider: "mx-auto h-px w-12 bg-primary-200",
} as const;

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <p
        className={`${styles.codeText} ${styles.codeSize}`}
        aria-label={`Error ${NOT_FOUND_CODE}`}
      >
        {NOT_FOUND_CODE}
      </p>
      <div className={styles.divider} role="presentation" />
      <div className={styles.textBlock}>
        <Text as="h1" size="2xl" weight="semibold" tracking="tight">
          {NOT_FOUND_TITLE}
        </Text>
        <Text size="sm" muted>
          {NOT_FOUND_SUBTITLE}
        </Text>
      </div>
      <Link href="/">
        <Button variant="primary">{NOT_FOUND_BACK_BUTTON}</Button>
      </Link>
    </div>
  );
}
