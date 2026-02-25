import { cn, dataDisabledProps } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export function Input({
  error,
  fullWidth = false,
  className,
  disabled,
  ...props
}: InputProps) {
  return (
    <input
      {...dataDisabledProps(disabled)}
      className={cn(
        "h-9 rounded-lg border bg-white px-3 text-[length:var(--font-size-sm)] text-zinc-900 shadow-xs",
        "placeholder:text-zinc-400",
        "transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
        "disabled:cursor-not-allowed disabled:opacity-0",
        error
          ? "border-red-400 focus:ring-red-500 focus:border-red-500"
          : "border-zinc-300",
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
}
