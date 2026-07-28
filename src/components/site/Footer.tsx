import { Link } from "@tanstack/react-router";
import { Instagram, Lock, MessageCircle, Music2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandMark } from "./BrandMark";
import { whatsappLink } from "@/lib/shopify";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-10 w-10" />
            <span>
              <span className="text-display block text-base">Arte Camargos</span>
              <span className="eyebrow block text-[9px] text-madeira">Bijouterias</span>
            </span>
          </div>
          <p className="text-display mt-4 max-w-xs text-lg leading-snug text-institucional">
            Transformar a criatividade em expressão de fé.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram da Arte Camargos"
              className="rounded-full border border-border p-2 transition-colors hover:border-cobalto hover:text-cobalto"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="TikTok da Arte Camargos"
              className="rounded-full border border-border p-2 transition-colors hover:border-cobalto hover:text-cobalto"
            >
              <Music2 className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow text-madeira">Institucional</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/nossa-historia" className="transition-colors hover:text-cobalto">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link to="/produtos" className="transition-colors hover:text-cobalto">
                Explorar Produtos
              </Link>
            </li>
            <li>
              <Link to="/atacado" className="transition-colors hover:text-cobalto">
                Atacado
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-madeira">Ajuda</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/politicas/trocas" className="transition-colors hover:text-cobalto">
                Política de Trocas e Devoluções
              </Link>
            </li>
            <li>
              <Link to="/politicas/privacidade" className="transition-colors hover:text-cobalto">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link to="/duvidas" className="transition-colors hover:text-cobalto">
                Perguntas Frequentes
              </Link>
            </li>
            <li>
              <a
                href={whatsappLink("Olá! Gostaria de falar com a equipe da Arte Camargos.")}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-cobalto"
              >
                Fale Conosco
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-madeira">Novidades e inspirações</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Receba novidades e inspirações em primeira mão.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              setEmail("");
              toast.success("Que bom ter você por perto!", {
                description: "Vamos avisar você sempre que chegarem novidades.",
                position: "top-center",
              });
            }}
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              aria-label="Seu e-mail para receber novidades"
              className="h-10"
            />
            <Button type="submit" variant="institucional">
              Quero receber
            </Button>
          </form>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-verde transition-opacity hover:opacity-80"
          >
            <MessageCircle className="h-4 w-4" />
            Atacado no WhatsApp
          </a>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-verde" />
            Compra segura • checkout Shopify
          </p>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Arte Camargos Bijouterias. Feito com fé e cuidado, em
          família.
        </div>
      </div>
    </footer>
  );
}
