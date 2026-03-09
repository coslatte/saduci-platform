import { Card } from "@/components/molecules";

interface CardBlockProps {
  header?: string;
  content?: string;
}

export function CardBlock({
  header = "Título",
  content = "Contenido de la tarjeta.",
}: CardBlockProps) {
  return (
    <Card
      header={
        header ? (
          <span className="font-semibold text-slate-800">{header}</span>
        ) : undefined
      }
    >
      <p className="text-slate-600 text-sm">{content}</p>
    </Card>
  );
}
