import { Text } from "@/components/atoms";
import type { TypographySize, TypographyWeight } from "@/constants/typography";

interface TextBlockProps {
  content?: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span";
  size?: TypographySize;
  weight?: TypographyWeight;
  muted?: boolean;
}

export function TextBlock({
  content = "Escribe aquí...",
  as = "p",
  size = "base",
  weight = "normal",
  muted = false,
}: TextBlockProps) {
  return (
    <Text
      as={as}
      size={size}
      weight={weight}
      muted={muted}
      className="wrap-break-word whitespace-pre-wrap"
    >
      {content}
    </Text>
  );
}
