import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";
import { BrandLogo } from "./BrandMark";
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overHero || scrolled || searchOpen || mobileOpen;

  return (
    <header
      className={cn(
        "group fixed top-0 right-0 left-0 z-50 transition-colors duration-300",
        solid ? "bg-linho text-foreground" : "text-institucional-dark",
      )}
    >
      {!solid && (
        <>
          <span className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[160%] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.75),rgba(255,255,255,0))] transition-opacity duration-300 group-hover:opacity-0" />
          <span className="bg-linho pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </>
      )}


      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Linha 1: logo em destaque */}
        <div className="flex items-center justify-between py-3 lg:py-4">
          <span className="w-10 lg:w-24" />
          <Link to="/" aria-label="Página inicial" className="mx-auto block">
            <BrandLogo
              className={cn(
                "h-14 w-auto transition-all duration-300 lg:h-20",
                solid ? "" : "mix-blend-multiply",
              )}
            />
          </Link>
          <div className="flex w-10 items-center justify-end lg:w-24">
            <div className="flex items-center lg:hidden">
              <CartDrawer />
            </div>
          </div>
        </div>

        {/* Linha 2: navegação */}
        <div className="relative hidden items-center justify-center pb-4 lg:flex">
          <nav className="flex items-center gap-8" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[13px] font-semibold tracking-wide transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="absolute right-0 flex items-center gap-1">
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

        {/* Mobile: menu */}
        <div className="flex items-center justify-between pb-3 lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
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
          <Button
            variant="ghost"
            size="icon"
            aria-label="Buscar"
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
        </div>

        {searchOpen && (
          <div className="pb-4">
            <div className="mx-auto max-w-xl">
              <SearchForm autoFocus onDone={() => setSearchOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
