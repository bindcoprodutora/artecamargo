import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "arte-camargos-connect-4u5yc-vp858qht.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "4f4ecbd4eeed88df74c8aa7939f4b1b8";

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  quantityAvailable?: number | null;
  selectedOptions: Array<{ name: string; value: string }>;
  image: { url: string; altText: string | null } | null;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType: string;
    tags: string[];
    createdAt: string;
    availableForSale: boolean;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    variants: { edges: Array<{ node: ShopifyVariant }> };
    options: Array<{ name: string; values: string[] }>;
  };
}

const PRODUCT_FIELDS = `
  id
  title
  description
  handle
  productType
  tags
  createdAt
  availableForSale
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 8) { edges { node { url altText } } }
  variants(first: 50) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        availableForSale
        selectedOptions { name value }
        image { url altText }
      }
    }
  }
  options { name values }
`;

export const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: pagamento necessário", {
      description:
        "O acesso à API do Shopify precisa de um plano ativo. Acesse admin.shopify.com para atualizar.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(
      `Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`,
    );
  }

  return data;
}

export async function fetchProducts(first = 100, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query: query ?? null });
  return data?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  const product = data?.data?.product;
  return product ? { node: product } : null;
}

export function formatPrice(amount: string | number, currencyCode = "BRL") {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  try {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: currencyCode }).format(
      value,
    );
  } catch {
    return `${currencyCode} ${value.toFixed(2)}`;
  }
}

export function isNewProduct(createdAt: string) {
  const days = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return days <= 30;
}

export function lowestVariantStock(product: ShopifyProduct) {
  const quantities = product.node.variants.edges
    .map((v) => v.node.quantityAvailable)
    .filter((q): q is number => typeof q === "number" && q > 0);
  if (quantities.length === 0) return null;
  return Math.max(...quantities);
}

/** Mapeamento de cor para os swatches de resina. */
export const RESIN_COLOR_MAP: Record<string, string> = {
  azul: "#004aad",
  "azul escuro": "#071971",
  branco: "#ffffff",
  branca: "#ffffff",
  preto: "#111111",
  preta: "#111111",
  vermelho: "#a4161a",
  vermelha: "#a4161a",
  verde: "#2f6118",
  rosa: "#e5a0b5",
  roxo: "#5a3a86",
  lilas: "#b9a3d6",
  "lilás": "#b9a3d6",
  bege: "#c4a583",
  marrom: "#6b4a2e",
  dourado: "#f1ca53",
  perola: "#f2ece2",
  "pérola": "#f2ece2",
  transparente: "#eef2f6",
  amarelo: "#f1ca53",
  cinza: "#8b8b8b",
  "vinho": "#5c1a2b",
  "turquesa": "#3aa8a0",
};

export const PLATING_COLOR_MAP: Record<string, string> = {
  dourado: "#f1ca53",
  "níquel": "#c9cdd2",
  niquel: "#c9cdd2",
  prata: "#c9cdd2",
  "ouro velho": "#9a7b3f",
  "ródio": "#d8dce0",
};

export function swatchColor(optionName: string, value: string) {
  const key = value.trim().toLowerCase();
  const name = optionName.trim().toLowerCase();
  if (name.includes("banho")) return PLATING_COLOR_MAP[key] ?? RESIN_COLOR_MAP[key] ?? null;
  if (name.includes("cor") || name.includes("resina")) return RESIN_COLOR_MAP[key] ?? null;
  return null;
}

export const WHATSAPP_NUMBER = "5531999999999";

export function whatsappLink(
  message = "Olá! Tenho interesse em fazer um pedido de atacado.",
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
