import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Gem, HeartHandshake, Sparkles } from "lucide-react";

import heroImg from "@/assets/hero-rosario.jpg";
import catCruzes from "@/assets/cat-cruzes.jpg";
import catMedalhas from "@/assets/cat-medalhas.jpg";
import catEntremeios from "@/assets/cat-entremeios.jpg";
import catPassantes from "@/assets/cat-passantes.jpg";
import inspiracaoImg from "@/assets/inspiracao-artesa.jpg";
import historiaImg from "@/assets/historia-familia.jpg";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { GoldDivider } from "@/components/site/BrandMark";
import { AtacadoCta } from "@/components/site/AtacadoCta";
import { ProductCard, ProductCardSkeleton } from "@/components/site/ProductCard";
import { fetchProducts } from "@/lib/shopify";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Arte Camargos Bijouterias | Componentes para artesanato religioso",
      },
      {
        name: "description",
        content:
          "Cruzes, medalhas, entremeios e passantes de alta qualidade para montagem de terços e peças religiosas. Variedade, acabamento durável e atendimento próximo.",
      },
      {
        property: "og:title",
        content: "Arte Camargos Bijouterias | Componentes para artesanato religioso",
      },
      {
        property: "og:description",
        content:
          "Transformar a criatividade em expressão de fé: componentes religiosos com acabamento durável para artesãs, lojistas e igrejas.",
      },
    ],
  }),
  component: Home,
});

const categorias = [
  { nome: "Cruzes", img: catCruzes, alt: "Cruzes douradas para montagem de terços" },
  { nome: "Medalhas", img: catMedalhas, alt: "Medalhas religiosas douradas e niqueladas" },
  {
    nome: "Entremeios",
    img: catEntremeios,
    alt: "Entremeios dourados com resina colorida para terços",
  },
  { nome: "Passantes", img: catPassantes, alt: "Passantes e capas de metal dourado" },
];

function Home() {
  const { data: produtos, isLoading } = useQuery({
    queryKey: ["produtos", "home"],
    queryFn: () => fetchProducts(8),
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="order-2 max-w-xl lg:order-1">
            <p className="eyebrow animate-fade-in text-madeira">Desde 2023 • Feito em família</p>
            <h1 className="mt-4 text-4xl leading-[1.08] text-institucional sm:text-5xl lg:text-6xl">
              Transformar a criatividade em expressão de fé
            </h1>
            <p className="mt-5 text-base/relaxed text-muted-foreground sm:text-lg/relaxed">
              Componentes para artesanato religioso — cruzes, medalhas, entremeios e passantes com
              acabamento cuidadoso, variedade de modelos e banhos que resistem ao uso do dia a dia.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/produtos">
                  Explorar Produtos
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/nossa-historia">Conheça nossa história</Link>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={heroImg}
                alt="Terço montado com cruz dourada e contas azuis sobre fundo branco"
                width={1920}
                height={1200}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <span className="animate-shimmer pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgba(241,202,83,0.22)_50%,transparent_65%)] bg-[length:220%_100%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: Gem, titulo: "Acabamento que dura", texto: "Banhos cuidadosos que preservam o brilho das peças." },
            { icon: Sparkles, titulo: "Variedade em um só lugar", texto: "Modelos, cores e tamanhos para cada criação." },
            { icon: HeartHandshake, titulo: "Atendimento próximo", texto: "Gente de verdade para ajudar no seu pedido." },
          ].map((item, i) => (
            <Reveal key={item.titulo} delay={i * 90} className="flex items-start gap-3">
              <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-cobalto" />
              <div>
                <h3 className="text-[15px] font-bold">{item.titulo}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow text-madeira">Escolha por categoria</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Peças para cada etapa da sua criação</h2>
          <GoldDivider className="mt-6" />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {categorias.map((cat, i) => (
            <Reveal key={cat.nome} delay={i * 80}>
              <Link
                to="/produtos"
                search={{ categoria: cat.nome }}
                className="group block overflow-hidden rounded-md"
              >
                <div className="aspect-[4/5] overflow-hidden bg-secondary/50">
                  <img
                    src={cat.img}
                    alt={cat.alt}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between pt-3">
                  <h3 className="text-lg">{cat.nome}</h3>
                  <ArrowRight className="h-4 w-4 text-cobalto transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Novidades */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-madeira">Chegou agora</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Novidades da coleção</h2>
            </div>
            <Button asChild variant="ghost" className="text-cobalto">
              <Link to="/produtos">
                Ver todo o catálogo
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            {!isLoading &&
              produtos?.slice(0, 8).map((p, i) => (
                <Reveal key={p.node.id} delay={(i % 4) * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
          </div>

          {!isLoading && (!produtos || produtos.length === 0) && (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              Nenhum produto encontrado por aqui ainda — em breve novas peças estarão disponíveis.
            </p>
          )}
        </div>
      </section>

      {/* Inspiração */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-lg">
              <img
                src={inspiracaoImg}
                alt="Artesã montando um terço com contas claras e componentes dourados"
                loading="lazy"
                width={1600}
                height={1008}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-madeira">Inspiração</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Veja o que você pode criar</h2>
            <p className="mt-4 text-base/relaxed text-muted-foreground">
              Cada cruz, medalha ou entremeio é o começo de uma peça que vai acompanhar alguém em
              momentos importantes. Terços, rosários, lembrancinhas de batizado e presentes cheios
              de significado nascem das mãos de quem escolhe bem os componentes.
            </p>
            <figure className="mt-8 border-l-2 border-dourado pl-5">
              <blockquote className="text-display text-lg leading-snug text-institucional">
                “As peças chegam bem embaladas e o acabamento se mantém bonito depois de montado.”
              </blockquote>
              <figcaption className="mt-2 text-xs text-muted-foreground">
                Cliente artesã, Minas Gerais
              </figcaption>
            </figure>
            <Button asChild className="mt-8" variant="secondary">
              <Link to="/produtos">Começar minha criação</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Nossa história (teaser) */}
      <section className="bg-linho/60 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          <Reveal>
            <p className="eyebrow text-madeira">Nossa história</p>
            <h2 className="mt-3 text-3xl text-institucional sm:text-4xl">
              Uma história de família que continua sendo escrita
            </h2>
            <p className="mt-4 text-base/relaxed text-institucional/80">
              A Arte Camargos nasceu em 2023, criada por uma família com longa experiência no setor
              de componentes religiosos. Começamos na Shopee, crescemos no Mercado Livre e no TikTok
              Shop — e agora damos o próximo passo com o nosso canal oficial.
            </p>
            <Button asChild className="mt-8" variant="institucional">
              <Link to="/nossa-historia">Conheça nossa história</Link>
            </Button>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-lg">
              <img
                src={historiaImg}
                alt="Bancada de trabalho com bandejas organizadas de componentes religiosos dourados"
                loading="lazy"
                width={1600}
                height={1008}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Atacado */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <AtacadoCta />
        </Reveal>
      </section>
    </>
  );
}
