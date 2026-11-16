import { useState, useEffect } from 'react';
import {
  sanityClient,
  PRODUCTS_BY_BUSINESS_QUERY,
  BUSINESS_BY_SLUG_QUERY,
  isSanityConfigured,
  urlFor,
} from '../sanity/client';

export interface SanityProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  badge?: string;
  image: string;
  modifiers?: Array<{
    groupName: string;
    required: boolean;
    options: Array<{ name: string; extraPrice: number }>;
  }>;
}

export interface BusinessInfo {
  name: string;
  slogan: string;
  address: string;
  whatsappNumber: string;
  nequiNumber: string;
  schedule?: string;
  deliveryInfo?: string;
  instagram?: string;
  logo?: string;
  bannerImage?: string;
}

export function useSanityProducts(
  businessSlug: 'monky-drinks' | 'mi-casa',
  defaultProducts: SanityProduct[]
) {
  const [products, setProducts] = useState<SanityProduct[]>(defaultProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSanityConfigured()) {
      setProducts(defaultProducts);
      return;
    }

    let isMounted = true;
    setLoading(true);

    sanityClient
      .fetch(PRODUCTS_BY_BUSINESS_QUERY, { businessSlug })
      .then((data: any[]) => {
        if (!isMounted) return;
        if (data && data.length > 0) {
          const mapped: SanityProduct[] = data.map((item) => ({
            id: item._id,
            name: item.name,
            price: item.basePrice,
            description: item.description || '',
            category: item.category || 'general',
            badge: item.badge,
            image: item.image ? urlFor(item.image) : '',
            modifiers: item.modifiers,
          }));
          setProducts(mapped);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn(`[Sanity] Usando catálogo predeterminado para ${businessSlug}:`, err);
        setError(err.message);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [businessSlug]);

  return { products, loading, error, isLiveFromSanity: isSanityConfigured() };
}

export function useSanityBusiness(
  businessSlug: 'monky-drinks' | 'mi-casa',
  defaultInfo: BusinessInfo
) {
  const [business, setBusiness] = useState<BusinessInfo>(defaultInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSanityConfigured()) {
      setBusiness(defaultInfo);
      return;
    }

    let isMounted = true;
    setLoading(true);

    sanityClient
      .fetch(BUSINESS_BY_SLUG_QUERY, { businessSlug })
      .then((data: any) => {
        if (!isMounted) return;
        if (data) {
          setBusiness({
            name: data.name || defaultInfo.name,
            slogan: data.slogan || defaultInfo.slogan,
            address: data.address || defaultInfo.address,
            whatsappNumber: data.whatsappNumber || defaultInfo.whatsappNumber,
            nequiNumber: data.nequiNumber || defaultInfo.nequiNumber,
            schedule: data.schedule || defaultInfo.schedule,
            deliveryInfo: data.deliveryInfo || defaultInfo.deliveryInfo,
            instagram: data.instagram || defaultInfo.instagram,
            logo: data.logo ? urlFor(data.logo) : defaultInfo.logo,
            bannerImage: data.bannerImage ? urlFor(data.bannerImage) : defaultInfo.bannerImage,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn(`[Sanity] Usando info predeterminada de ${businessSlug}:`, err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [businessSlug]);

  return { business, loading };
}
