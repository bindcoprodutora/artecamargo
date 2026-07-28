import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductCard, ProductCardSkeleton } from "@/components/site/ProductCard";
import { AtacadoCta } from "@/components/site/AtacadoCta";
import { fetchProducts, formatPrice, swatchColor, type ShopifyProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";

type Ordem = "relevancia" | "menor-preco" | "maior-preco" | "mais-novos";

interface ProdutosSearch {
  busca?: string;
  categoria?: string;
  banho?: string;
  cor?: string;
  tamanho?: string;
  min?: number;
  max?: number;
  ordem?: Ordem;
}

const ORDENS: Array<{ value: Ordem; label: string }> = [
  { value: "relevancia", label: "Relevância" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "mais-novos", label: "Mais novos" },
];

export const Route = createFileRoute("/produtos")({
  validateSearch: (search: Record<string, unknown>): ProdutosSearch => ({
    busca: typeof search.busca === "string" && search.busca ? search.busca : undefined,
    categoria: typeof search.categoria === "string" ? search.categoria : undefined,
    banho: typeof search.banho === "string" ? search.banho : undefined,
    cor: typeof search.cor === "string" ? search.cor : undefined,
    tamanho: typeof search.tamanho === "string" ? search.tamanho : undefined,
    min: typeof search.min === "number" ? search.min : undefined,
    max: typeof search.max === "number" ? search.max : undefined,
    ordem: ORDENS.some((o) => o.value === search.ordem) ? (search.ordem as Ordem) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Explorar Produtos | Arte Camargos Bijouterias" },
      {
        name: "description",
        content:
          "Catálogo completo de cruzes, medalhas, entremeios e passantes. Filtre por categoria, banho, cor da resina, tamanho e faixa de preço.",
      },
      { property: "og:title", content: "Explorar Produtos | Arte Camargos Bijouterias" },
      {
        property: "og:description",
        content:
          "Encontre os componentes ideais para suas criações religiosas: filtros por banho, cor e tamanho.",
      },
    ],
  }),
  component: Produtos,
});

function optionValues(products: ShopifyProduct[], matcher: (name: string) => boolean) {
  const set = new Set<string>();
  products.forEach((p) =>
    p.node.options.forEach((o) => {
      if (matcher(o.name.toLowerCase())) o.values.forEach((v) => set.add(v));
    }),
  );
  return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function hasOption(product: ShopifyProduct, matcher: (name: string) => boolean, value: string) {
  return product.node.options.some(
    (o) => matcher(o.name.toLowerCase()) && o.values.some((v) => v === value),
  );
}

const isBanho = (n: string) => n.includes("banho");
const isCor = (n: string) => n.includes("cor") || n.includes("resina");
const isTamanho = (n: string) => n.includes("tamanho");

function categoriaDoProduto(p: ShopifyProduct) {
  const known = ["Entremeio", "Cruz", "Medalha", "Passante"];
  const type = p.node.productType?.trim();
  if (type) {
    const match = known.find((k) => type.toLowerCase().includes(k.toLowerCase()));
    if (match) return match;
    return type;
  }
  const tag = p.node.tags?.find((t) =>
    known.some((k) => t.toLowerCase().includes(k.toLowerCase())),
  );
  if (tag) return known.find((k) => tag.toLowerCase().includes(k.toLowerCase())) ?? tag;
  const title = p.node.title.toLowerCase();
  return known.find((k) => title.includes(k.toLowerCase())) ?? "Outros";
}

function Produtos() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  const { data: produtos, isLoading } = useQuery({
    queryKey: ["produtos", "todos"],
    queryFn: () => fetchProducts(150),
  });

  const lista = useMemo(() => produtos ?? [], [produtos]);

  const categorias = useMemo(() => {
    const set = new Set(lista.map(categoriaDoProduto));
    const ordem = ["Entremeio", "Cruz", "Medalha", "Passante"];
    return Array.from(set).sort(
      (a, b) =>
        (ordem.indexOf(a) === -1 ? 99 : ordem.indexOf(a)) -
        (ordem.indexOf(b) === -1 ? 99 : ordem.indexOf(b)),
    );
  }, [lista]);

  const banhos = useMemo(() => optionValues(lista, isBanho), [lista]);
  const cores = useMemo(() => optionValues(lista, isCor), [lista]);
  const tamanhos = useMemo(() => optionValues(lista, isTamanho), [lista]);

  const precos = lista.map((p) => parseFloat(p.node.priceRange.minVariantPrice.amount));
  const precoMin = precos.length ? Math.floor(Math.min(...precos)) : 0;
  const precoMax = precos.length ? Math.ceil(Math.max(...precos)) : 100;
  const currency = lista[0]?.node.priceRange.minVariantPrice.currencyCode ?? "BRL";
  const faixa: [number, number] = [search.min ?? precoMin, search.max ?? precoMax];

  const setSearch = (patch: Partial<ProdutosSearch>) =>
    navigate({ search: (prev: ProdutosSearch) => ({ ...prev, ...patch }) });


  const toggle = (key: keyof ProdutosSearch, value: string) =>
    setSearch({ [key]: search[key] === value ? undefined : value } as Partial<ProdutosSearch>);

  const filtrados = useMemo(() => {
    let result = lista.filter((p) => {
      if (search.categoria && categoriaDoProduto(p) !== search.categoria) return false;
      if (search.banho && !hasOption(p, isBanho, search.banho)) return false;
      if (search.cor && !hasOption(p, isCor, search.cor)) return false;
      if (search.tamanho && !hasOption(p, isTamanho, search.tamanho)) return false;
      const preco = parseFloat(p.node.priceRange.minVariantPrice.amount);
      if (preco < faixa[0] || preco > faixa[1]) return false;
      if (search.busca) {
        const termo = search.busca.toLowerCase();
        const alvo = `${p.node.title} ${p.node.productType} ${p.node.tags.join(" ")} ${p.node.description}`.toLowerCase();
        if (!alvo.includes(termo)) return false;
      }
      return true;
    });

    const ordem = search.ordem ?? "relevancia";
    const preco = (p: ShopifyProduct) => parseFloat(p.node.priceRange.minVariantPrice.amount);
    if (ordem === "menor-preco") result = [...result].sort((a, b) => preco(a) - preco(b));
    if (ordem === "maior-preco") result = [...result].sort((a, b) => preco(b) - preco(a));
    if (ordem === "mais-novos")
      result = [...result].sort(
        (a, b) => new Date(b.node.createdAt).getTime() - new Date(a.node.createdAt).getTime(),
      );
    return result;
  }, [lista, search, faixa[0], faixa[1]]);

  const filtrosAtivos = [
    search.categoria,
    search.banho,
    search.cor,
    search.tamanho,
    search.busca,
  ].filter(Boolean).length;

  const limparFiltros = () =>
    navigate({
      search: { ordem: search.ordem },
    });

  const painelFiltros = (
    <div className="space-y-8">
      {categorias.length > 0 && (
        <fieldset>
          <legend className="eyebrow text-madeira">Categoria</legend>
          <ul className="mt-3 space-y-2">
            {categorias.map((c) => (
              <li key={c} className="flex items-center gap-2.5">
                <Checkbox
                  id={`cat-${c}`}
                  checked={search.categoria === c}
                  onCheckedChange={() => toggle("categoria", c)}
                />
                <label htmlFor={`cat-${c}`} className="cursor-pointer text-sm">
                  {c}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      )}

      {banhos.length > 0 && (
        <fieldset>
          <legend className="eyebrow text-madeira">Banho</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {banhos.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => toggle("banho", b)}
                aria-pressed={search.banho === b}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors",
                  search.banho === b
                    ? "border-cobalto bg-cobalto/10 text-cobalto"
                    : "border-border hover:border-areia",
                )}
              >
                <span
                  className="h-3 w-3 rounded-full border border-border"
                  style={{ backgroundColor: swatchColor("banho", b) ?? "transparent" }}
                />
                {b}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {cores.length > 0 && (
        <fieldset>
          <legend className="eyebrow text-madeira">Cor da resina</legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {cores.map((c) => {
              const color = swatchColor("cor", c);
              return (
                <button
                  key={c}
                  type="button"
                  title={c}
                  aria-label={`Cor ${c}`}
                  aria-pressed={search.cor === c}
                  onClick={() => toggle("cor", c)}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110",
                    search.cor === c ? "border-cobalto" : "border-border",
                  )}
                  style={{ backgroundColor: color ?? "var(--muted)" }}
                >
                  {!color && <span className="text-[9px]">{c.slice(0, 2)}</span>}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {tamanhos.length > 0 && (
        <fieldset>
          <legend className="eyebrow text-madeira">Tamanho</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {tamanhos.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={search.tamanho === t}
                onClick={() => toggle("tamanho", t)}
                className={cn(
                  "min-w-10 rounded-md border px-3 py-1.5 text-xs transition-colors",
                  search.tamanho === t
                    ? "border-cobalto bg-cobalto/10 text-cobalto"
                    : "border-border hover:border-areia",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {precoMax > precoMin && (
        <fieldset>
          <legend className="eyebrow text-madeira">Faixa de preço</legend>
          <div className="mt-5 px-1">
            <Slider
              min={precoMin}
              max={precoMax}
              step={1}
              value={[faixa[0], faixa[1]]}
              onValueChange={([min, max]) => setSearch({ min, max })}
            />
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>{formatPrice(faixa[0], currency)}</span>
              <span>{formatPrice(faixa[1], currency)}</span>
            </div>
          </div>
        </fieldset>
      )}

      {filtrosAtivos > 0 && (
        <Button variant="ghost" className="w-full text-cobalto" onClick={limparFiltros}>
          <X className="mr-1 h-4 w-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  );

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
            {search.categoria ? (
              <BreadcrumbLink asChild>
                <Link to="/produtos">Explorar Produtos</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>Explorar Produtos</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {search.categoria && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{search.categoria}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mt-6">
        <h1 className="text-3xl sm:text-4xl">
          {search.categoria ?? (search.busca ? `Resultados para “${search.busca}”` : "Explorar Produtos")}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Componentes para montagem de terços, rosários e peças religiosas. Combine os filtros para
          encontrar exatamente o que a sua criação pede.
        </p>
      </header>

      <div className="mt-8 lg:hidden">
        <AtacadoCta variant="light" />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-8">
            {painelFiltros}
            <AtacadoCta variant="light" className="px-5 py-6" />
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Carregando peças…"
                : `${filtrados.length} ${filtrados.length === 1 ? "peça encontrada" : "peças encontradas"}`}
            </p>
            <div className="flex items-center gap-2">
              <Sheet open={filtrosAbertos} onOpenChange={setFiltrosAbertos}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="mr-1 h-4 w-4" />
                    Filtros{filtrosAtivos > 0 ? ` (${filtrosAtivos})` : ""}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto">
                  <SheetTitle className="text-display px-5 pt-6 text-xl">Filtros</SheetTitle>
                  <div className="px-5 pt-6 pb-10">{painelFiltros}</div>
                </SheetContent>
              </Sheet>

              <Select
                value={search.ordem ?? "relevancia"}
                onValueChange={(v) => setSearch({ ordem: v as Ordem })}
              >
                <SelectTrigger className="h-9 w-[170px] text-sm" aria-label="Ordenar por">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ORDENS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:gap-x-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filtrados.length === 0 ? (
            <div className="mt-16 text-center">
              <h2 className="text-display text-xl">
                {lista.length === 0
                  ? "Nenhum produto encontrado"
                  : "Nada encontrado com esses filtros"}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                {lista.length === 0
                  ? "Em breve novas peças estarão disponíveis por aqui."
                  : "Tente combinar menos filtros, temos muitas peças esperando por você."}
              </p>
              {filtrosAtivos > 0 && (
                <Button variant="secondary" className="mt-6" onClick={limparFiltros}>
                  Limpar filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:gap-x-6">
              {filtrados.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
