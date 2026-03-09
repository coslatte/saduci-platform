import { Button } from "@/components/atoms";
import type { Variant, Size } from "@/lib/types";

interface ButtonBlockProps {
  label?: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  href?: string;
}

export function ButtonBlock({
  label = "Botón",
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
}: ButtonBlockProps) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
        <Button variant={variant} size={size} fullWidth={fullWidth}>
          {label}
        </Button>
      </a>
    );
  }
  return (
    <Button variant={variant} size={size} fullWidth={fullWidth}>
      {label}
    </Button>
  );
}
