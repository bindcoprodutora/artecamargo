import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/shopify";
import { cn } from "@/lib/utils";

export function AtacadoCta({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg px-6 py-10 sm:px-10",
        isDark ? "bg-institucional text-white" : "bg-linho text-institucional",
        className,
      )}
    >
      <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className={cn("eyebrow", isDark ? "text-dourado" : "text-madeira")}>
            Condições especiais
          </p>
          <h2 className="text-display mt-2 text-2xl leading-snug sm:text-3xl">
            Compra para revenda ou grandes quantidades?
          </h2>
          <p className={cn("mt-3 text-sm/relaxed", isDark ? "text-white/80" : "text-institucional/80")}>
            Fale direto com a gente no WhatsApp e garanta condições especiais de atacado. O
            atendimento é próximo, humano e feito para o seu negócio crescer.
          </p>
        </div>
        <Button asChild size="lg" variant={isDark ? "gold" : "institucional"}>
          <a href={whatsappLink()} target="_blank" rel="noreferrer noopener">
            <MessageCircle className="mr-1 h-4 w-4" />
            Falar no WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("Olá! Tenho interesse em fazer um pedido de atacado.")}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Falar com a Arte Camargos no WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-verde p-3.5 text-white shadow-lift transition-transform duration-300 hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
