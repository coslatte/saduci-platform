import { Alert } from "@/components/molecules";

type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertBlockProps {
  variant?: AlertVariant;
  title?: string;
  message?: string;
}

export function AlertBlock({
  variant = "info",
  title = "Información",
  message = "Mensaje de la alerta.",
}: AlertBlockProps) {
  return (
    <Alert variant={variant} title={title}>
      {message}
    </Alert>
  );
}
