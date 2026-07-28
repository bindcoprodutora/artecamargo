import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Check, Loader2, Lock, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductCard } from "@/components/site/ProductCard";
import { useCartStore } from "@/stores/cartStore";
import {
  fetchProductByHandle,
  fetchProducts,
  formatPrice,
  swatchColor,
  type ShopifyProduct,
} from "@/lib/shopify";

import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produto/$handle")({
  loader: async ({ params }) => {
    const product = await fetchProductByHandle(params.handle);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Peça indisponível | Arte Camargos Bijouterias" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.product.node;
    const description = (p.description || `${p.title} — componente para artesanato religioso.`)
      .slice(0, 155)
      .trim();
    const image = p.images.edges[0]?.node.url;
    return {
      meta: [
        { title: `${p.title} | Arte Camargos Bijouterias` },
        { name: "description", content: description },
        { property: "og:title", content: `${p.title} | Arte Camargos Bijouterias` },
        { property: "og:description", content: description },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: ProdutoDetalhe,
});

function ProdutoDetalhe() {
  const { product } = Route.useLoaderData() as { product: ShopifyProduct };
  const node = product.node;

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  const variants = useMemo(() => node.variants.edges.map((v) => v.node), [node]);
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const first = variants.find((v) => v.availableForSale) ?? variants[0];
    return Object.fromEntries((first?.selectedOptions ?? []).map((o) => [o.name, o.value]));
  });
  const [imgIndex, setImgIndex] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const variant =
    variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value)) ??
    variants[0];

  const images = node.images.edges.map((e) => e.node);
  const activeImage = variant?.image ?? images[imgIndex] ?? images[0];
  const stock = variant?.quantityAvailable ?? null;

  const { data: relacionados } = useQuery({
    queryKey: ["produtos", "relacionados", node.productType],
    queryFn: () => fetchProducts(12),
  });

  const combina = (relacionados ?? []).filter((p) => p.node.id !== node.id).slice(0, 4);

  const adicionar = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
  };

  const handleAdd = async () => {
    await adicionar();
    toast.success("Peça adicionada ao carrinho", {
      description: node.title,
      position: "top-center",
    });
  };

  const handleBuyNow = async () => {
    await adicionar();
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/produtos">Explorar Produtos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {node.productType && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/produtos" search={{ categoria: node.productType }}>
                    {node.productType}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1">{node.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Galeria */}
        <div>
          <div
            className="relative aspect-square overflow-hidden rounded-lg bg-secondary/40"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setZoom({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
              });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            {activeImage ? (
              <img
                src={activeImage.url}
                alt={activeImage.altText ?? node.title}
                className="h-full w-full object-cover transition-transform duration-300"
                style={
                  zoom
                    ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                    : undefined
                }
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setImgIndex(i)}
                  aria-label={`Ver imagem ${i + 1} de ${node.title}`}
                  className={cn(
                    "h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                    i === imgIndex ? "border-cobalto" : "border-transparent hover:border-areia",
                  )}
                >
                  <img
                    src={img.url}
                    alt={img.altText ?? `${node.title} — imagem ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {node.productType && <p className="eyebrow text-madeira">{node.productType}</p>}
          <h1 className="mt-2 text-3xl leading-tight sm:text-4xl">{node.title}</h1>

          <p className="mt-4 text-2xl font-bold text-cobalto">
            {variant
              ? formatPrice(variant.price.amount, variant.price.currencyCode)
              : formatPrice(
                  node.priceRange.minVariantPrice.amount,
                  node.priceRange.minVariantPrice.currencyCode,
                )}
          </p>

          <p className="mt-2 text-sm">
            {variant?.availableForSale ? (
              <span className="inline-flex items-center gap-1.5 text-verde">
                <Check className="h-4 w-4" />
                Disponível em estoque
                {stock !== null && stock > 0 && stock <= 5 ? ` — últimas ${stock} unidades` : ""}
              </span>
            ) : (
              <span className="text-muted-foreground">Esta variação está indisponível no momento</span>
            )}
          </p>

          {/* Variações */}
          <div className="mt-8 space-y-6">
            {node.options
              .filter((o) => o.values.length > 0 && o.name.toLowerCase() !== "title")
              .map((option) => {
                const usaSwatch = option.values.some((v) => swatchColor(option.name, v));
                return (
                  <fieldset key={option.name}>
                    <legend className="eyebrow text-madeira">
                      {option.name}
                      <span className="ml-2 text-[10px] tracking-normal normal-case text-muted-foreground">
                        {selected[option.name]}
                      </span>
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {option.values.map((value) => {
                        const color = swatchColor(option.name, value);
                        const ativo = selected[option.name] === value;
                        if (usaSwatch && color) {
                          return (
                            <button
                              key={value}
                              type="button"
                              title={value}
                              aria-label={`${option.name}: ${value}`}
                              aria-pressed={ativo}
                              onClick={() =>
                                setSelected((s) => ({ ...s, [option.name]: value }))
                              }
                              className={cn(
                                "h-9 w-9 rounded-full border-2 transition-transform hover:scale-110",
                                ativo ? "border-cobalto" : "border-border",
                              )}
                              style={{ backgroundColor: color }}
                            />
                          );
                        }
                        return (
                          <button
                            key={value}
                            type="button"
                            aria-pressed={ativo}
                            onClick={() => setSelected((s) => ({ ...s, [option.name]: value }))}
                            className={cn(
                              "min-w-11 rounded-md border px-3.5 py-2 text-sm transition-colors",
                              ativo
                                ? "border-cobalto bg-cobalto/10 text-cobalto"
                                : "border-border hover:border-areia",
                            )}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAdd}
              disabled={isLoading || !variant?.availableForSale}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="mr-1 h-4 w-4" />
                  Adicionar ao Carrinho
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={handleBuyNow}
              disabled={isLoading || !variant?.availableForSale}
            >
              Comprar Agora
            </Button>
          </div>

          {/* Promessa da marca */}
          <ul className="mt-6 grid gap-3 rounded-lg bg-secondary/60 p-5 text-sm">
            <li className="flex items-start gap-2.5">
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-dourado" />
              Acabamento cuidadoso, pensado para durar no uso do dia a dia.
            </li>
            <li className="flex items-start gap-2.5">
              <Truck className="mt-0.5 h-4 w-4 flex-shrink-0 text-cobalto" />
              Peças conferidas e embaladas com cuidado antes de seguir viagem.
            </li>
            <li className="flex items-start gap-2.5">
              <Lock className="mt-0.5 h-4 w-4 flex-shrink-0 text-verde" />
              Compra segura com checkout Shopify e atendimento próximo.
            </li>
          </ul>

          <Accordion type="single" collapsible className="mt-8" defaultValue="descricao">
            <AccordionItem value="descricao">
              <AccordionTrigger>Descrição</AccordionTrigger>
              <AccordionContent>
                <p className="whitespace-pre-line text-sm/relaxed text-muted-foreground">
                  {node.description || "Componente para montagem de terços e peças religiosas."}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cuidados">
              <AccordionTrigger>Cuidados de conservação</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm/relaxed text-muted-foreground">
                  Para preservar o brilho do banho, evite contato com perfumes, álcool e produtos de
                  limpeza. Guarde as peças em saquinhos individuais, longe da umidade, e limpe
                  apenas com um pano seco e macio.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {combina.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl sm:text-3xl">Combina com esta peça</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {combina.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
