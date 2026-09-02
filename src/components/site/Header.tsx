import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";
import { BrandLogoFull } from "./BrandMark";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/produtos", label: "Explorar Produtos" },
  { to: "/nossa-historia", label: "Nossa História" },
  { to: "/atacado", label: "Atacado" },
  { to: "/duvidas", label: "Dúvidas" },
] as const;

function SearchForm({ onDone, autoFocus }: { onDone?: () => void; autoFocus?: boolean }) {
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
        autoFocus={autoFocus}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Buscar cruzes, medalhas, entremeios…"
        aria-label="Buscar produtos"
        className="h-10 rounded-full border-border bg-background/90 pl-9 text-sm"
      />
    </form>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const forceSolid = searchOpen || mobileOpen;
  const isCompact = scrolled || forceSolid || !overHero;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500 ease-out",
        isCompact
          ? "border-b border-border/50 bg-white/85 text-foreground shadow-[var(--shadow-soft)] backdrop-blur-md"
          : "bg-transparent text-institucional-dark"
      )}
    >
      {!isCompact && (
        <span className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[180%] bg-gradient-to-b from-white/75 to-transparent" />
      )}

      <div
        className={cn(
          "relative mx-auto max-w-7xl px-4 transition-all duration-500 ease-out sm:px-6 lg:px-8",
          isCompact ? "py-2" : "py-4 lg:py-5"
        )}
      >
        <div
          className={cn(
            "relative transition-all duration-500 ease-out",
            isCompact ? "min-h-[56px] lg:min-h-[64px]" : "min-h-[120px] lg:min-h-[160px]"
          )}
        >
          {/* Mobile menu */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir menu"
                  className="hover:bg-transparent hover:opacity-70"
                >
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

          {/* Logo */}
          <Link
            to="/"
            aria-label="Página inicial"
            className={cn(
              "absolute transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isCompact
                ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:-translate-x-0"
                : "left-1/2 top-3 lg:top-4 -translate-x-1/2"
            )}
          >
            <BrandLogoFull
              className={cn(
                "h-16 w-auto origin-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:h-24",
                isCompact
                  ? "pointer-events-none translate-y-[-12px] scale-[0.92] opacity-0"
                  : "translate-y-0 scale-100 opacity-100"
              )}
            />
            <BrandLogo
              className={cn(
                "absolute left-0 top-0 h-10 w-auto origin-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isCompact
                  ? "translate-x-0 scale-100 opacity-100"
                  : "pointer-events-none translate-x-[-16px] scale-[0.9] opacity-0"
              )}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className={cn(
              "hidden items-center gap-8 transition-all duration-500 ease-out lg:flex",
              isCompact
                ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bottom-auto"
                : "absolute bottom-3 left-1/2 -translate-x-1/2 top-auto lg:bottom-4"
            )}
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-[15px] font-semibold tracking-wide after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:opacity-80 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div
            className={cn(
              "absolute right-0 flex items-center gap-1 transition-all duration-500 ease-out",
              isCompact
                ? "top-1/2 -translate-y-1/2 bottom-auto"
                : "bottom-3 top-auto lg:bottom-4"
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              aria-label={searchOpen ? "Fechar busca" : "Buscar"}
              onClick={() => setSearchOpen((v) => !v)}
              className="hover:bg-transparent hover:opacity-70"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
            <CartDrawer />
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4 pt-2">
            <div className="mx-auto max-w-xl">
              <SearchForm autoFocus onDone={() => setSearchOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
