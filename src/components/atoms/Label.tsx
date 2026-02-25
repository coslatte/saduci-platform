import { cn, dataDisabledProps } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

export function Label({
  required,
  className,
  children,
  disabled,
  ...props
}: LabelProps) {
  return (
    <label
      {...dataDisabledProps(disabled)}
      className={cn(
        "text-[length:var(--font-size-sm)] font-medium text-zinc-700",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-500" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
