import { createFileRoute } from "@tanstack/react-router";
import { GoldDivider } from "@/components/site/BrandMark";

export const Route = createFileRoute("/politicas/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Arte Camargos" },
      {
        name: "description",
        content:
          "Como a Arte Camargos Bijouterias coleta, usa e protege os dados pessoais dos clientes, de acordo com a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade | Arte Camargos" },
      {
        property: "og:description",
        content: "Transparência sobre coleta, uso e proteção dos seus dados pessoais.",
      },
    ],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
      <h1 className="text-3xl text-institucional sm:text-4xl">Política de Privacidade</h1>
      <GoldDivider className="mt-6 !mx-0" />

      <div className="mt-10 space-y-8 text-[15px]/relaxed text-foreground/85">
        <section>
          <h2 className="text-xl">Dados que coletamos</h2>
          <p className="mt-2">
            Coletamos apenas o necessário para concluir sua compra e atender você: nome, e-mail,
            telefone, endereço de entrega e dados do pedido. Informações de pagamento são tratadas
            diretamente pelo checkout seguro da Shopify, e não temos acesso aos dados do seu cartão.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Como usamos suas informações</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Processar pedidos, emitir notas e realizar entregas.</li>
            <li>Prestar atendimento e responder dúvidas.</li>
            <li>Enviar novidades e ofertas, quando você autoriza.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl">Compartilhamento</h2>
          <p className="mt-2">
            Compartilhamos dados apenas com parceiros essenciais à operação, como a plataforma de
            e-commerce, meios de pagamento e transportadoras. Não vendemos seus dados a terceiros.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Cookies</h2>
          <p className="mt-2">
            Utilizamos cookies para manter o carrinho ativo, lembrar preferências e entender como o
            site é usado. Você pode desativá-los no seu navegador, mas algumas funções podem deixar
            de funcionar corretamente.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Seus direitos (LGPD)</h2>
          <p className="mt-2">
            Você pode solicitar acesso, correção ou exclusão dos seus dados, além de revogar o
            consentimento para comunicações a qualquer momento. É só falar com a nossa equipe pelos
            canais de atendimento.
          </p>
        </section>
      </div>
    </article>
  );
}
