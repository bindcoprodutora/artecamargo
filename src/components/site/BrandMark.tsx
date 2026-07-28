import { cn } from "@/lib/utils";

/** Marca gráfica inspirada no logo: círculo azul, cruz, raios dourados e ramos verdes. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Símbolo Arte Camargos"
      className={cn("h-9 w-9", className)}
    >
      <circle cx="24" cy="24" r="22" fill="var(--institucional)" />
      <g stroke="var(--dourado)" strokeWidth="1.4" strokeLinecap="round">
        <line x1="24" y1="5.5" x2="24" y2="9.5" />
        <line x1="10.7" y1="10.7" x2="13.5" y2="13.5" />
        <line x1="37.3" y1="10.7" x2="34.5" y2="13.5" />
        <line x1="6" y1="24" x2="10" y2="24" />
        <line x1="42" y1="24" x2="38" y2="24" />
      </g>
      <path
        d="M24 13.5v18M17.5 20h13"
        stroke="var(--dourado)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M16 35c3-1.5 5.5-1.5 8-1.5s5 0 8 1.5"
        stroke="#2f6118"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span className="gold-rule w-16" />
      <BrandMark className="h-5 w-5 opacity-70" />
      <span className="gold-rule w-16" />
    </div>
  );
}
