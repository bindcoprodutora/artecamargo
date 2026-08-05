import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo-arte-camargos.jpeg.asset.json";
import logoFullAsset from "@/assets/logo-arte-camargos-full.png.asset.json";
import logoWideAsset from "@/assets/logo-arte-camargos-wide.png.asset.json";

/** Emblema oficial da Arte Camargos (recorte do símbolo do logo). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("relative block h-9 w-9 overflow-hidden rounded-full", className)}
      aria-hidden={false}
      role="img"
      aria-label="Símbolo Arte Camargos"
    >
      <img
        src={logoAsset.url}
        alt=""
        className="absolute max-w-none"
        style={{ width: "370%", left: "-133%", top: "-19%" }}
      />
    </span>
  );
}

/** Logo horizontal (PNG sem fundo), usada no menu compacto. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      src={logoWideAsset.url}
      alt="Arte Camargos Bijouterias"
      className={cn("h-auto w-40 object-contain", className)}
    />
  );
}

/** Versão ampliada da logo (PNG sem fundo), para o menu expandido. */
export function BrandLogoFull({ className }: { className?: string }) {
  return (
    <img
      src={logoFullAsset.url}
      alt="Arte Camargos Bijouterias"
      className={cn("h-auto w-64 object-contain", className)}
    />
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
