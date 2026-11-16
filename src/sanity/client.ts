import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Configuración de Sanity.io
export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'fk1u7ys6',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: true,
};

export const sanityClient = createClient(sanityConfig);

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return '';
  return builder.image(source).auto('format').fit('max').url();
}

// ════ QUERIES GROQ PARA SANITY.IO ════

export const BUSINESS_BY_SLUG_QUERY = `*[_type == "business" && (slug.current == $businessSlug || _id == $businessSlug)][0] {
  _id,
  name,
  "slug": slug.current,
  slogan,
  description,
  address,
  whatsappNumber,
  nequiNumber,
  schedule,
  deliveryInfo,
  instagram,
  themeColor,
  logo,
  bannerImage
}`;

export const BUSINESSES_QUERY = `*[_type == "business"] {
  _id,
  name,
  "slug": slug.current,
  slogan,
  description,
  address,
  whatsappNumber,
  nequiNumber,
  schedule,
  deliveryInfo,
  instagram,
  themeColor,
  logo,
  bannerImage
}`;

export const CATEGORIES_BY_BUSINESS_QUERY = `*[_type == "category" && business->slug.current == $businessSlug] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  order
}`;

export const PRODUCTS_BY_BUSINESS_QUERY = `*[_type == "product" && business->slug.current == $businessSlug && isAvailable == true] {
  _id,
  name,
  "slug": slug.current,
  basePrice,
  description,
  badge,
  image,
  "category": category->slug.current,
  modifiers[] {
    groupName,
    required,
    options[] {
      name,
      extraPrice
    }
  }
}`;

export function isSanityConfigured(): boolean {
  return (
    Boolean(import.meta.env.VITE_SANITY_PROJECT_ID) &&
    import.meta.env.VITE_SANITY_PROJECT_ID !== 'demo-project'
  );
}
