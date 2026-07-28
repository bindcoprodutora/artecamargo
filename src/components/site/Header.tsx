import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";
import { BrandMark } from "./BrandMark";

const navLinks = [
  { to: "/produtos", label: "Explorar Produtos" },
  { to: "/nossa-historia", label: "Nossa História" },
  { to: "/atacado", label: "Atacado" },
] as const;

function SearchForm({ onDone }: { onDone?: () => void }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  return (
    <form
      role="search"
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/produtos", search: { busca: term || undefined } });
        onDone?.();
      }}
    >
      <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Buscar cruzes, medalhas, entremeios…"
        aria-label="Buscar produtos"
        className="h-10 rounded-full border-border bg-secondary/60 pl-9 text-sm"
      />
    </form>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link to="/" className="flex flex-shrink-0 items-center gap-2.5" aria-label="Página inicial">
          <BrandMark className="h-8 w-8 lg:h-10 lg:w-10" />
          <span className="hidden leading-tight sm:block">
            <span className="text-display block text-[15px] lg:text-base">Arte Camargos</span>
            <span className="eyebrow block text-[9px] text-madeira">Bijouterias</span>
          </span>
        </Link>

        <div className="mx-auto hidden max-w-md flex-1 md:block">
          <SearchForm />
        </div>

        <nav className="ml-auto hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[13px] font-semibold text-foreground/80 transition-colors hover:text-cobalto"
              activeProps={{ className: "text-cobalto" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-4">
          <CartDrawer />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-6 px-5 pt-10">
                <SearchForm onDone={() => setMobileOpen(false)} />
                <nav className="flex flex-col gap-1" aria-label="Navegação">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="text-display border-b border-border/60 py-3 text-lg"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="md:hidden">
        <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6">
          <SearchForm />
        </div>
      </div>
    </header>
  );

}
