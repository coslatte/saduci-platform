import { Spinner } from "@/components/atoms";

interface AppLoadingProps {
  className?: string;
}

export function AppLoading({ className }: AppLoadingProps) {
  return (
    <div
      className={`flex min-h-[60vh] items-center justify-center ${className ?? ""}`}
    >
      <Spinner size="lg" label="Cargando..." />
    </div>
  );
}

export default AppLoading;
