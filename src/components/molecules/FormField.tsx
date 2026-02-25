import { cn, dataDisabledProps } from "@/lib/utils";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "id">;
  disabled?: boolean;
}

export function FormField({
  id,
  label,
  required,
  error,
  hint,
  className,
  inputProps,
  disabled,
}: FormFieldProps) {
  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn("flex flex-col gap-1.5", className)}
    >
      <Label htmlFor={id} required={required} disabled={disabled}>
        {label}
      </Label>
      <Input
        id={id}
        error={!!error}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        aria-invalid={!!error}
        disabled={disabled}
        {...inputProps}
      />
      {hint && !error && (
        <p
          id={`${id}-hint`}
          className="text-[length:var(--font-size-xs)] text-zinc-500"
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-[length:var(--font-size-xs)] text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
