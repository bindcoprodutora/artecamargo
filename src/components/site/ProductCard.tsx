import { Link } from "@tanstack/react-router";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, isNewProduct, type ShopifyProduct } from "@/lib/shopify";

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-square w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const image = node.images.edges[0]?.node;
  const variants = node.variants.edges.map((v) => v.node);
  const variant = variants.find((v) => v.availableForSale) ?? variants[0];
  const hasChoices = node.options.some((o) => o.values.length > 1);
  const stock = variant?.quantityAvailable ?? null;
  const isNew = isNewProduct(node.createdAt);

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Peça adicionada ao carrinho", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <article className="group flex flex-col">
      <Link
        to="/produto/$handle"
        params={{ handle: node.handle }}
        className="relative block overflow-hidden rounded-md bg-secondary/50"
      >
        <div className="aspect-square w-full overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText ?? node.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              Sem imagem
            </div>
          )}
        </div>
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {isNew && (
            <span className="eyebrow rounded-full bg-dourado px-2.5 py-1 text-[9px] text-institucional">
              Novidade
            </span>
          )}
          {!node.availableForSale && (
            <span className="eyebrow rounded-full bg-background/90 px-2.5 py-1 text-[9px] text-muted-foreground">
              Esgotado
            </span>
          )}
          {node.availableForSale && stock !== null && stock > 0 && stock <= 5 && (
            <span className="eyebrow rounded-full bg-background/90 px-2.5 py-1 text-[9px] text-madeira">
              Últimas unidades
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        {node.productType && (
          <p className="eyebrow text-[9px] text-madeira">{node.productType}</p>
        )}
        <h3 className="mt-1 text-[15px] leading-snug font-semibold">
          <Link to="/produto/$handle" params={{ handle: node.handle }} className="hover:text-cobalto">
            {node.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-[15px] font-bold text-cobalto">
          {formatPrice(
            node.priceRange.minVariantPrice.amount,
            node.priceRange.minVariantPrice.currencyCode,
          )}
        </p>

        <div className="mt-4">
          {hasChoices ? (
            <Button asChild variant="outline" className="w-full">
              <Link to="/produto/$handle" params={{ handle: node.handle }}>
                Ver Detalhes
              </Link>
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              variant="outline"
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ShoppingBag className="mr-1 h-4 w-4" />
                  {variant?.availableForSale ? "Adicionar ao Carrinho" : "Indisponível"}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
