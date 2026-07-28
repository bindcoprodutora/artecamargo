import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, PackageCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { GoldDivider } from "@/components/site/BrandMark";
import { whatsappLink } from "@/lib/shopify";

export const Route = createFileRoute("/atacado")({
  head: () => ({
    meta: [
      { title: "Atacado | Arte Camargos Bijouterias" },
      {
        name: "description",
        content:
          "Compra para revenda ou grandes quantidades? Fale direto com a nossa equipe no WhatsApp e converse sobre condições especiais de atacado.",
      },
      { property: "og:title", content: "Atacado | Arte Camargos Bijouterias" },
      {
        property: "og:description",
        content:
          "Atendimento próximo e condições especiais para lojistas e revendedores, direto pelo WhatsApp.",
      },
    ],
  }),
  component: Atacado,
});

function Atacado() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
      <header className="text-center">
        <p className="eyebrow text-madeira">Para lojistas e revendedores</p>
        <h1 className="mt-4 text-4xl leading-tight text-institucional sm:text-5xl">
          Atacado com atendimento de gente para gente
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base/relaxed text-muted-foreground">
          Nosso site vende no varejo, por peça ou kit. Já os pedidos maiores são conversados
          diretamente com a nossa equipe — assim conseguimos entender o seu negócio e montar a
          melhor combinação de peças para você.
        </p>
        <GoldDivider className="mt-8" />
      </header>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {[
          {
            icon: Users,
            titulo: "Conversa direta",
            texto: "Você fala com quem conhece as peças e acompanha seu pedido do começo ao fim.",
          },
          {
            icon: Sparkles,
            titulo: "Curadoria para o seu público",
            texto: "Ajudamos a escolher modelos, banhos e cores que combinam com o que você vende.",
          },
          {
            icon: PackageCheck,
            titulo: "Novidades em primeira mão",
            texto: "Avisamos sobre lançamentos e reposições antes de chegarem ao catálogo.",
          },
        ].map((item, i) => (
          <Reveal key={item.titulo} delay={i * 90} className="rounded-lg border border-border p-6">
            <item.icon className="h-5 w-5 text-cobalto" />
            <h2 className="mt-4 text-lg">{item.titulo}</h2>
            <p className="mt-2 text-sm/relaxed text-muted-foreground">{item.texto}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <div className="rounded-lg bg-institucional px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-display text-2xl sm:text-3xl">
            Compra para revenda ou grandes quantidades?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm/relaxed text-white/80">
            Fale direto com a gente no WhatsApp e garanta condições especiais de atacado.
          </p>
          <Button asChild size="lg" variant="gold" className="mt-8">
            <a href={whatsappLink()} target="_blank" rel="noreferrer noopener">
              <MessageCircle className="mr-1 h-4 w-4" />
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </Reveal>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Prefere começar conhecendo as peças?{" "}
        <Link to="/produtos" className="font-semibold text-cobalto hover:underline">
          Explorar Produtos
        </Link>
      </p>
    </div>
  );
}
