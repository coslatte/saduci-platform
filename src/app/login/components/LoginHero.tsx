import Image from "next/image";
import { cn } from "@/lib/utils";

export default function LoginHero({ className }: { className?: string }) {
  return (
    <figure
      aria-hidden
      className={cn("flex items-center justify-center", className)}
    >
      <div className="w-full max-w-md motion-safe:animate-[slide-in-down_0.7s_ease-out_forwards]">
        <Image
          src="/pics/login-welcome.jpg"
          alt="Bienvenida a la plataforma"
          width={900}
          height={600}
          className="rounded-2xl object-cover shadow-xl w-full h-auto"
          priority
        />
      </div>
    </figure>
  );
}
