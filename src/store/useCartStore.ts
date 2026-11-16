import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCatalogStore } from './useCatalogStore';

export interface CartItem {
  cartItemId: string;
  id: string;
  name: string;
  price: number;
  business: 'monky' | 'micasa';
  details?: string;
  quantity: number;
  image?: string;
}

export interface CustomerOrderInfo {
  name: string;
  orderType: 'delivery' | 'table' | 'takeaway';
  locationDetail: string;
  notes: string;
}

export const BUSINESS_PHONES = {
  monky: '3118894341',
  micasa: '3183630494',
};

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
  isMixedModalOpen: boolean;
  customerInfo: CustomerOrderInfo;

  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  setIsMixedModalOpen: (open: boolean) => void;
  setCustomerInfo: (info: Partial<CustomerOrderInfo>) => void;

  addToCart: (item: {
    id?: string;
    name: string;
    price: number;
    business?: 'monky' | 'micasa';
    details?: string;
    image?: string;
  }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getCartBusinessStatus: () => 'empty' | 'monky' | 'micasa' | 'mixed';
  getWhatsAppUrl: (preferredBusiness?: 'monky' | 'micasa' | null) => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      isMixedModalOpen: false,

      customerInfo: {
        name: '',
        orderType: 'delivery',
        locationDetail: '',
        notes: '',
      },

      setIsCartOpen: (open) => set({ isCartOpen: open }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setIsMixedModalOpen: (open) => set({ isMixedModalOpen: open }),

      setCustomerInfo: (info) =>
        set((state) => ({ customerInfo: { ...state.customerInfo, ...info } })),

      addToCart: ({ id, name, price, business = 'monky', details = '', image }) => {
        set((state) => {
          const itemKey = `${id || name}-${details}-${business}`;
          const existingItemIndex = state.cart.findIndex((item) => item.cartItemId === itemKey);

          if (existingItemIndex > -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex].quantity += 1;
            return { cart: updatedCart, isCartOpen: true };
          }

          return {
            cart: [
              ...state.cart,
              {
                cartItemId: itemKey,
                id: id || Math.random().toString(),
                name,
                price: Number(price),
                business,
                details,
                image,
                quantity: 1,
              },
            ],
            isCartOpen: true,
          };
        });
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, delta) => {
        set((state) => {
          const updated = state.cart
            .map((item) => {
              if (item.cartItemId === cartItemId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null);
          return { cart: updated };
        });
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      getCartBusinessStatus: () => {
        const { cart } = get();
        if (cart.length === 0) return 'empty';
        const hasMonky = cart.some((i) => i.business === 'monky');
        const hasMiCasa = cart.some((i) => i.business === 'micasa');

        if (hasMonky && hasMiCasa) return 'mixed';
        if (hasMonky) return 'monky';
        return 'micasa';
      },

      getWhatsAppUrl: (preferredBusiness = null) => {
        const { cart, customerInfo, getCartTotal, getCartBusinessStatus } = get();
        const status = getCartBusinessStatus();

        const catalog = useCatalogStore.getState();
        const monkyPhone = catalog?.monkyBusiness?.whatsappNumber || BUSINESS_PHONES.monky;
        const miCasaPhone = catalog?.miCasaBusiness?.whatsappNumber || BUSINESS_PHONES.micasa;

        let targetPhone = monkyPhone;
        if (preferredBusiness === 'micasa' || (!preferredBusiness && status === 'micasa')) {
          targetPhone = miCasaPhone;
        }

        if (cart.length === 0) {
          return `https://wa.me/57${targetPhone}?text=${encodeURIComponent('¡Hola! Me gustaría hacer un pedido.')}`;
        }

        const monkyItems = cart.filter((i) => i.business === 'monky');
        const miCasaItems = cart.filter((i) => i.business === 'micasa');
        const total = getCartTotal();

        let message = `🍽️ *NUEVO PEDIDO DIGITAL* 🍽️\n`;

        // Datos del Cliente y Entrega
        if (customerInfo.name.trim()) {
          message += `👤 *Cliente:* ${customerInfo.name.trim()}\n`;
        }

        const typeLabels: Record<string, string> = {
          delivery: '🏠 Domicilio',
          table: '🍽️ En Mesa',
          takeaway: '🛍️ Para Recoger',
        };

        const typeText = typeLabels[customerInfo.orderType] || '🏠 Domicilio';
        message += `📍 *Modalidad:* ${typeText}`;
        if (customerInfo.locationDetail.trim()) {
          message += ` (${customerInfo.locationDetail.trim()})`;
        }
        message += `\n`;

        if (customerInfo.notes.trim()) {
          message += `📝 *Notas:* ${customerInfo.notes.trim()}\n`;
        }

        // Productos de Monky
        if (monkyItems.length > 0) {
          message += `\n🐒 *--- MONKY FUSIÓN DRINKS ---*\n`;
          monkyItems.forEach((item) => {
            message += `🍹 ${item.quantity}x ${item.name} ${item.details ? `(${item.details})` : ''} - $${(item.price * item.quantity).toLocaleString('es-CO')}\n`;
          });
        }

        // Productos de Mi Casa
        if (miCasaItems.length > 0) {
          message += `\n🏡 *--- MI CASA RESTAURANTE ---*\n`;
          miCasaItems.forEach((item) => {
            message += `🥩 ${item.quantity}x ${item.name} ${item.details ? `(${item.details})` : ''} - $${(item.price * item.quantity).toLocaleString('es-CO')}\n`;
          });
        }

        message += `\n━━━━━━━━━━━━━━━━━━━━━━`;
        message += `\n💥 *TOTAL GENERAL: $${total.toLocaleString('es-CO')}*`;
        message += `\n💸 *Pago:* Efectivo o Transferencia`;
        message += `\n📍 *Chimichagua - Cesar*`;

        return `https://wa.me/57${targetPhone}?text=${encodeURIComponent(message)}`;
      },
    }),
    {
      name: 'digital-menu-cart',
    }
  )
);
