import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProductModifier {
  name: string;
  extraPrice: number;
}

export interface CatalogProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  badge?: string;
  image: string;
  business: 'monky' | 'micasa';
  isAvailable: boolean;
  modifiers?: Array<{
    groupName: string;
    options: ProductModifier[];
  }>;
}

export interface BusinessConfig {
  name: string;
  slogan: string;
  whatsappNumber: string;
  nequiNumber: string;
  address: string;
  schedule: string;
  deliveryInfo: string;
  instagram?: string;
}

interface CatalogState {
  monkyBusiness: BusinessConfig;
  miCasaBusiness: BusinessConfig;
  products: CatalogProduct[];

  // Acciones de Negocio
  updateBusinessConfig: (business: 'monky' | 'micasa', config: Partial<BusinessConfig>) => void;

  // Acciones de Productos
  addProduct: (product: Omit<CatalogProduct, 'id'>) => void;
  updateProduct: (id: string, updatedFields: Partial<CatalogProduct>) => void;
  deleteProduct: (id: string) => void;
  toggleProductAvailability: (id: string) => void;

  // Getters
  getProductsByBusiness: (business: 'monky' | 'micasa') => CatalogProduct[];
  getCategoriesByBusiness: (business: 'monky' | 'micasa') => string[];
}

// Productos iniciales de Monky Drinks
const INITIAL_MONKY_PRODUCTS: CatalogProduct[] = [
  {
    id: 'monky-1',
    name: 'Monky Clásica',
    price: 11000,
    category: 'Micheladas',
    description: 'Michelada tradicional escarchada con sal marina y limón refrescante.',
    image: '/Monky Clasica.jpeg',
    business: 'monky',
    isAvailable: true,
  },
  {
    id: 'monky-2',
    name: 'Monky Mix',
    price: 13000,
    category: 'Micheladas',
    description: 'Nuestra combinación estelar con gomitas artesanales y escarchado especial.',
    image: '/Monky Mix.jpeg',
    business: 'monky',
    isAvailable: true,
  },
  {
    id: 'monky-3',
    name: 'Monky Supreme',
    price: 16000,
    category: 'Micheladas',
    description: 'La reina de la casa con perlas explosivas y doble ración de toppings.',
    image: '/Monky Suprem.jpeg',
    business: 'monky',
    isAvailable: true,
  },
  {
    id: 'monky-4',
    name: 'Monky Lata',
    price: 18000,
    category: 'Micheladas',
    description: 'Versión especial en lata lista para disfrutar bien helada.',
    image: '/Monky lata.jpeg',
    business: 'monky',
    isAvailable: true,
  },
  {
    id: 'monky-5',
    name: 'Enchilada de Lulo',
    price: 8000,
    category: 'Monky Enchiladas',
    description: 'Cítrica y picante con pulpa natural de lulo campesino.',
    image: '/Monky enchilada.jpeg',
    business: 'monky',
    isAvailable: true,
  },
  {
    id: 'monky-6',
    name: 'Enchilada de Mora',
    price: 8000,
    category: 'Monky Enchiladas',
    description: 'Dulzor de mora silvestre con chile artesanal.',
    image: '/Monky enchilada.jpeg',
    business: 'monky',
    isAvailable: true,
  },
  {
    id: 'monky-7',
    name: 'Enchilada de Limón',
    price: 8000,
    category: 'Monky Enchiladas',
    description: 'Toque ácido tradicional con sal marina y tajín.',
    image: '/Monky enchilada.jpeg',
    business: 'monky',
    isAvailable: true,
  },
  {
    id: 'monky-8',
    name: 'Enchilada de Naranja',
    price: 8000,
    category: 'Monky Enchiladas',
    description: 'Sabor tropical cítrico perfecto para la tarde.',
    image: '/Monky enchilada.jpeg',
    business: 'monky',
    isAvailable: true,
  },
  {
    id: 'monky-9',
    name: 'Gomitas Adicionales',
    price: 3000,
    category: 'Adicionales',
    description: 'Porción extra de gomitas dulces y ácidas.',
    image: '',
    business: 'monky',
    isAvailable: true,
  },
  {
    id: 'monky-10',
    name: 'Perlas Explosivas',
    price: 5000,
    category: 'Adicionales',
    description: 'Perlas con jugo concentrado que estallan en tu paladar.',
    image: '',
    business: 'monky',
    isAvailable: true,
  },
  {
    id: 'monky-11',
    name: 'Perlas con Licor',
    price: 7000,
    category: 'Adicionales',
    description: 'Perlas infusionadas con licor para subir de nivel tu michelada.',
    image: '',
    business: 'monky',
    isAvailable: true,
  },
];

// Productos iniciales de Mi Casa Restaurante
const INITIAL_MICASA_PRODUCTS: CatalogProduct[] = [
  {
    id: 'mc-1',
    name: 'Punta de Anca al Carbón (350g)',
    price: 32000,
    category: '🥩 Asados al Carbón',
    description: 'Corte tierno y jugoso asado a la brasa con leña de monte, papa salada, patacón crocante y guacamole.',
    badge: 'Recomendado del Chef',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    business: 'micasa',
    isAvailable: true,
  },
  {
    id: 'mc-2',
    name: 'Costillas BBQ al Carbón',
    price: 29000,
    category: '🥩 Asados al Carbón',
    description: 'Costillas de cerdo caramelizadas a fuego lento en nuestra salsa barbacoa de la casa con papas rústicas.',
    badge: 'Más Vendido',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800',
    business: 'micasa',
    isAvailable: true,
  },
  {
    id: 'mc-3',
    name: 'Pechuga a la Brasa Campestre',
    price: 24000,
    category: '🥩 Asados al Carbón',
    description: 'Pechuga marinada con finas hierbas y limón mandarina, asada al carbón con arepa campesina y ensalada.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=800',
    business: 'micasa',
    isAvailable: true,
  },
  {
    id: 'mc-4',
    name: 'Churrasco Mi Casa (350g)',
    price: 34000,
    category: '🥩 Asados al Carbón',
    description: 'Generoso corte mariposa asado a la brasa con sal marina gruesa y chimichurri casero.',
    badge: 'Corte Premium',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
    business: 'micasa',
    isAvailable: true,
  },
  {
    id: 'mc-5',
    name: 'Bandeja Campestre Especial',
    price: 28000,
    category: '🍲 Platos Criollos',
    description: 'Carne asada o chicharrón, fríjoles caseros, arroz blanco, huevo frito, tajada de plátano y aguacate.',
    badge: 'Favorito Criollo',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
    business: 'micasa',
    isAvailable: true,
  },
  {
    id: 'mc-6',
    name: 'Sancocho Criollo Campesino',
    price: 22000,
    category: '🍲 Platos Criollos',
    description: 'Tradicional sancocho a leña con plátano, yuca, mazorca, presa tierna, arroz blanco y aguacate.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    business: 'micasa',
    isAvailable: true,
  },
  {
    id: 'mc-7',
    name: 'Picada Mi Casa (Para 2-3 personas)',
    price: 45000,
    category: '🌽 Entradas & Picadas',
    description: 'Trozos de res al carbón, cerdo, chorizo artesanal, chicharrón, papa criolla dorada y patacones.',
    badge: 'Para Compartir',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    business: 'micasa',
    isAvailable: true,
  },
  {
    id: 'mc-8',
    name: 'Limonada de Coco Campesina',
    price: 9000,
    category: '🍹 Bebidas & Jugos',
    description: 'Cremosa y refrescante con pulpa de coco natural y limones frescos recién exprimidos.',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    business: 'micasa',
    isAvailable: true,
  },
];

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      monkyBusiness: {
        name: 'Monky Fusión Drinks',
        slogan: 'La evolución de las micheladas y Monky enchiladas',
        whatsappNumber: '3118894341',
        nequiNumber: '3118894341',
        address: 'Chimichagua - Cesar',
        schedule: 'Jueves a Domingo • 4:00 PM - 12:00 AM',
        deliveryInfo: '🏍️ Domicilio Rápido en Chimichagua',
        instagram: '@monky_fusion_drinks',
      },

      miCasaBusiness: {
        name: 'Mi Casa Restaurante',
        slogan: 'Una experiencia que deleitara tus sentidos',
        whatsappNumber: '3183630494',
        nequiNumber: '3183630494',
        address: 'Chimichagua - Cesar',
        schedule: 'Lunes a Domingo • 11:00 AM - 9:00 PM',
        deliveryInfo: '🏠 Domicilio GRATIS',
      },

      products: [...INITIAL_MONKY_PRODUCTS, ...INITIAL_MICASA_PRODUCTS],

      updateBusinessConfig: (business, config) => {
        set((state) => {
          if (business === 'monky') {
            return { monkyBusiness: { ...state.monkyBusiness, ...config } };
          }
          return { miCasaBusiness: { ...state.miCasaBusiness, ...config } };
        });
      },

      addProduct: (newProd) => {
        set((state) => ({
          products: [
            ...state.products,
            {
              ...newProd,
              id: `${newProd.business}-${Date.now()}`,
            },
          ],
        }));
      },

      updateProduct: (id, updatedFields) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedFields } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      toggleProductAvailability: (id) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, isAvailable: !p.isAvailable } : p
          ),
        }));
      },

      getProductsByBusiness: (business) => {
        return get().products.filter((p) => p.business === business);
      },

      getCategoriesByBusiness: (business) => {
        const prods = get().products.filter((p) => p.business === business);
        const categories = Array.from(new Set(prods.map((p) => p.category)));
        return categories.length > 0 ? categories : ['General'];
      },
    }),
    {
      name: 'platform-catalog-v1',
    }
  )
);
