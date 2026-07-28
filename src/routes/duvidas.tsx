import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { GoldDivider } from "@/components/site/BrandMark";
import { whatsappLink } from "@/lib/shopify";

const FAQ = [
  {
    q: "Vocês vendem no atacado?",
    a: "Sim. O site funciona no varejo, por peça ou kit, e os pedidos maiores são conversados diretamente pelo WhatsApp, onde montamos condições especiais para lojistas e revendedores.",
  },
  {
    q: "Qual a diferença entre os banhos?",
    a: "Trabalhamos com banhos como dourado, prateado e ródio. Eles mudam a cor e o acabamento da peça — o dourado tem tom mais quente, o prateado é clássico e o ródio traz um brilho frio e resistente.",
  },
  {
    q: "Como conservar as peças?",
    a: "Evite contato com perfumes, álcool e produtos de limpeza, guarde em saquinhos individuais longe da umidade e limpe apenas com pano seco e macio. Assim o banho dura muito mais.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: "Os pedidos são separados e enviados em até 2 dias úteis. O prazo de transporte varia conforme a transportadora e o CEP, e aparece no checkout antes de finalizar a compra.",
  },
  {
    q: "Como acompanho meu pedido?",
    a: "Assim que o pedido é despachado, você recebe o código de rastreio por e-mail. Se tiver qualquer dúvida no caminho, é só chamar a gente no WhatsApp.",
  },
  {
    q: "O pagamento é seguro?",
    a: "Sim. Todo o pagamento é processado no checkout da Shopify, com criptografia e os principais meios de pagamento — cartão, Pix e boleto.",
  },
  {
    q: "Posso trocar ou devolver uma peça?",
    a: "Pode. Você tem 7 dias para desistir da compra e 30 dias para relatar defeitos de fabricação. Os detalhes estão na nossa Política de Trocas e Devoluções.",
  },
];

export const Route = createFileRoute("/duvidas")({
  head: () => ({
    meta: [
      { title: "Perguntas Frequentes | Arte Camargos Bijouterias" },
      {
        name: "description",
        content:
          "Dúvidas sobre banhos, conservação das peças, prazos de entrega, atacado, pagamento e trocas na Arte Camargos Bijouterias.",
      },
      { property: "og:title", content: "Perguntas Frequentes | Arte Camargos Bijouterias" },
      {
        property: "og:description",
        content: "Respostas rápidas sobre entrega, banhos, atacado, pagamento e trocas.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: Duvidas,
});

function Duvidas() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
      <header className="text-center">
        <p className="eyebrow text-madeira">Ajuda</p>
        <h1 className="mt-4 text-3xl text-institucional sm:text-4xl">Perguntas Frequentes</h1>
        <GoldDivider className="mt-6" />
      </header>

      <Accordion type="single" collapsible className="mt-10">
        {FAQ.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm/relaxed text-muted-foreground">{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 rounded-lg bg-secondary/60 p-8 text-center">
        <h2 className="text-xl">Não encontrou sua resposta?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Nossa equipe responde pessoalmente no WhatsApp.
        </p>
        <Button asChild variant="whatsapp" className="mt-6">
          <a
            href={whatsappLink("Olá! Tenho uma dúvida sobre os produtos da Arte Camargos.")}
            target="_blank"
            rel="noreferrer noopener"
          >
            <MessageCircle className="mr-1 h-4 w-4" />
            Falar no WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
