import { site } from "@/site.config";

export interface BriefOptions {
  format: string;
  products: number;
  social: boolean;
  rush: boolean;
}

export function calculateQuote(options: BriefOptions) {
  const format =
    site.pricing.formats.find((item) => item.id === options.format) ??
    site.pricing.formats[0];
  const products = Math.max(
    1,
    Math.min(site.pricing.maxProducts, Math.round(options.products)),
  );
  const images = products * format.imagesPerProduct;
  const imageCost = images * format.perImage;
  const socialCost = options.social ? site.pricing.extras.social.price : 0;
  const subtotal = format.setup + imageCost + socialCost;
  const rushCost = options.rush
    ? Math.round(subtotal * site.pricing.extras.rush.rate)
    : 0;
  return {
    format,
    products,
    images,
    imageCost,
    socialCost,
    rushCost,
    total: subtotal + rushCost,
  };
}

export function money(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: site.pricing.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
