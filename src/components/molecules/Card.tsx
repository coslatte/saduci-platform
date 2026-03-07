import { cn, dataDisabledProps } from "@/lib/utils";

/**
 * Props for `Card` component.
 */
interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  disabled?: boolean;
}

/**
 * Card
 *
 * Generic container that provides a bordered white surface with optional
 * header and footer slots. Use `padded=false` to let the content control
 * spacing.
 */
export function Card({
  header,
  footer,
  children,
  className,
  padded = true,
  disabled,
}: CardProps) {
  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn(
        "rounded-xl border border-zinc-200 bg-white shadow-sm",
        className,
      )}
    >
      {header && (
        <div className={cn("border-b px-5 py-4 border-zinc-200")}>{header}</div>
      )}
      <div className={cn(padded && "px-5 py-4")}>{children}</div>
      {footer && (
        <div className={cn("border-t px-5 py-4 border-zinc-200")}>{footer}</div>
      )}
    </div>
  );
}
