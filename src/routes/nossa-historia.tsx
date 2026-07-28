import { createFileRoute, Link } from "@tanstack/react-router";
import historiaImg from "@/assets/historia-familia.jpg";
import inspiracaoImg from "@/assets/inspiracao-artesa.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { GoldDivider } from "@/components/site/BrandMark";
import { AtacadoCta } from "@/components/site/AtacadoCta";

export const Route = createFileRoute("/nossa-historia")({
  head: () => ({
    meta: [
      { title: "Nossa História | Arte Camargos Bijouterias" },
      {
        name: "description",
        content:
          "A Arte Camargos nasceu em 2023 como um projeto de família. Conheça a história por trás das peças que ajudam artesãs e lojistas a criar com fé.",
      },
      { property: "og:title", content: "Nossa História | Arte Camargos Bijouterias" },
      {
        property: "og:description",
        content:
          "Uma empresa familiar brasileira que transforma criatividade em expressão de fé desde 2023.",
      },
    ],
  }),
  component: NossaHistoria,
});

function NossaHistoria() {
  return (
    <article className="pb-10">
      <header className="mx-auto max-w-3xl px-4 pt-14 text-center sm:px-6 lg:pt-20">
        <p className="eyebrow text-madeira">Nossa história</p>
        <h1 className="mt-4 text-4xl leading-tight text-institucional sm:text-5xl">
          Uma história de família, escrita todos os dias
        </h1>
        <GoldDivider className="mt-8" />
      </header>

      <Reveal className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-lg">
          <img
            src={historiaImg}
            alt="Bandejas organizadas com componentes religiosos dourados sobre bancada clara"
            loading="lazy"
            width={1600}
            height={1008}
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>

      <div className="mx-auto mt-14 max-w-2xl space-y-7 px-4 text-[17px]/relaxed text-foreground/85 sm:px-6">
        <Reveal>
          <p>
            A Arte Camargos Bijouterias nasceu em 2023, criada pelos pais de Natália Camargos
            especialmente para ela — uma oportunidade de crescimento, aprendizado e independência.
            Um presente em forma de trabalho, feito com a confiança de quem acredita.
          </p>
        </Reveal>

        <Reveal>
          <p>
            A família já tinha caminhada no setor de componentes para artigos religiosos, através de
            uma empresa anterior. Esse conhecimento sobre produtos, fornecedores e, principalmente,
            sobre como atender bem, esteve presente desde o primeiro dia.
          </p>
        </Reveal>

        <Reveal>
          <blockquote className="my-12 border-l-2 border-dourado py-2 pl-6">
            <p className="text-display text-2xl leading-snug text-institucional sm:text-3xl">
              “Para nós, cada peça é pequena no tamanho, mas infinita no propósito.”
            </p>
          </blockquote>
        </Reveal>

        <Reveal>
          <p>
            O começo foi na Shopee, vendendo peça por peça e aprendendo com cada pedido. Depois veio
            o Mercado Livre, e mais tarde o TikTok Shop — sempre acompanhando onde os clientes
            estavam. Este site é o passo mais recente dessa jornada: o canal oficial e definitivo da
            marca.
          </p>
        </Reveal>

        <Reveal>
          <p>
            Não faltaram desafios. Foi preciso aprender sobre materiais e acabamentos, entender o
            e-commerce e encontrar o próprio lugar em um mercado que muitas vezes disputa apenas
            preço. A resposta veio do apoio da família e de uma escolha simples: qualidade, respeito
            e confiança em cada entrega.
          </p>
        </Reveal>

        <Reveal>
          <p className="text-display text-center text-2xl leading-snug text-institucional sm:text-3xl">
            Transformar a criatividade em expressão de fé.
          </p>
        </Reveal>

        <Reveal>
          <p>
            É isso que nos move. Cada cruz, medalha, entremeio ou passante que sai daqui representa
            mais do que um componente: é a chance de ajudar artesãs, empreendedoras, lojistas e
            comunidades a criarem peças cheias de significado — para vender, presentear ou rezar.
          </p>
        </Reveal>

        <Reveal>
          <p>
            Seguimos sendo uma família, atendendo de perto, ouvindo quem cria e aprendendo junto.
            Obrigado por fazer parte desta história que continua sendo escrita todos os dias.
          </p>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <div className="grid items-center gap-8 rounded-lg bg-secondary/50 p-6 sm:p-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-md">
            <img
              src={inspiracaoImg}
              alt="Mãos de artesã montando um terço com componentes dourados"
              loading="lazy"
              width={1600}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl">Vamos criar algo bonito juntas?</h2>
            <p className="mt-3 text-sm/relaxed text-muted-foreground">
              Explore nosso catálogo e escolha as peças que vão dar vida à sua próxima criação.
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link to="/produtos">Explorar Produtos</Link>
            </Button>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <AtacadoCta />
      </div>
    </article>
  );
}
