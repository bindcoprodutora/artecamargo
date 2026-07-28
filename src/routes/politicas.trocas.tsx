import { createFileRoute } from "@tanstack/react-router";
import { GoldDivider } from "@/components/site/BrandMark";

export const Route = createFileRoute("/politicas/trocas")({
  head: () => ({
    meta: [
      { title: "Política de Trocas e Devoluções | Arte Camargos" },
      {
        name: "description",
        content:
          "Como funcionam trocas, devoluções e prazos de arrependimento nas compras da Arte Camargos Bijouterias.",
      },
      { property: "og:title", content: "Política de Trocas e Devoluções | Arte Camargos" },
      {
        property: "og:description",
        content: "Prazos, condições e passo a passo para solicitar troca ou devolução.",
      },
    ],
  }),
  component: Trocas,
});

function Trocas() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
      <h1 className="text-3xl text-institucional sm:text-4xl">
        Política de Trocas e Devoluções
      </h1>
      <GoldDivider className="mt-6 !mx-0" />

      <div className="mt-10 space-y-8 text-[15px]/relaxed text-foreground/85">
        <section>
          <h2 className="text-xl">Direito de arrependimento</h2>
          <p className="mt-2">
            Você pode desistir da compra em até 7 dias corridos após receber o pedido, conforme o
            Código de Defesa do Consumidor. Basta nos avisar pelo WhatsApp ou e-mail dentro desse
            prazo.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Peças com defeito</h2>
          <p className="mt-2">
            Se alguma peça chegar com defeito de fabricação, entre em contato em até 30 dias após o
            recebimento, com fotos do item. Fazemos a troca ou a devolução integral do valor, sem
            custo adicional para você.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Condições para troca</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>A peça deve estar sem sinais de uso, montagem ou modificação.</li>
            <li>Embalagem e eventuais etiquetas devem ser preservadas.</li>
            <li>É necessário informar o número do pedido.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl">Como solicitar</h2>
          <p className="mt-2">
            Fale com a nossa equipe pelo WhatsApp informando o número do pedido e o motivo. Nós
            orientamos o envio e acompanhamos todo o processo de perto. Após recebermos e conferirmos
            a peça, o reembolso é processado em até 10 dias úteis pelo mesmo meio de pagamento.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Frete de devolução</h2>
          <p className="mt-2">
            Em casos de defeito ou envio incorreto, o frete de retorno é por nossa conta. Em
            devoluções por arrependimento, o custo do envio de retorno fica com o cliente.
          </p>
        </section>
      </div>
    </article>
  );
}
