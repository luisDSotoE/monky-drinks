import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, UtensilsCrossed, User, MapPin, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface GlobalCartDrawerProps {
  onCheckout: () => void;
}

export default function GlobalCartDrawer({ onCheckout }: GlobalCartDrawerProps) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    customerInfo,
    setCustomerInfo,
  } = useCartStore();

  const [showDetails, setShowDetails] = useState(false);

  if (!isCartOpen) return null;

  const total = getCartTotal();
  const count = getCartCount();
  const monkyItems = cart.filter((i) => i.business === 'monky');
  const miCasaItems = cart.filter((i) => i.business === 'micasa');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end font-poppins">
        {/* Fondo oscurecido con blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Panel lateral deslizante */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#0f0f0f] border-l border-white/10 text-white h-full flex flex-col shadow-2xl z-10"
        >
          {/* Header del Drawer */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl text-neon-green">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h3 className="font-bebas text-2xl tracking-wider text-white">Tu Pedido</h3>
                <p className="text-xs text-gray-400">{count} producto{count !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-white/5 transition-colors"
                  title="Vaciar carrito"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Lista de Productos con Scroll */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <ShoppingBag size={30} className="text-gray-500" />
                </div>
                <p className="text-lg font-bebas tracking-wide text-gray-300">Tu carrito está vacío</p>
                <p className="text-xs text-gray-500 max-w-xs mt-1">
                  Explora los menús de Monky Drinks o Mi Casa Restaurante para agregar tus favoritos.
                </p>
              </div>
            ) : (
              <>
                {/* 🐒 SECCIÓN MONKY DRINKS */}
                {monkyItems.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-neon-yellow">
                      <Sparkles size={16} />
                      <span className="font-bebas text-lg tracking-wider">Monky Fusión Drinks</span>
                    </div>

                    <div className="space-y-3">
                      {monkyItems.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="bg-white/5 border border-white/5 hover:border-neon-pink/30 rounded-2xl p-3.5 flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-sm text-gray-100 truncate">{item.name}</h4>
                            {item.details && (
                              <p className="text-xs text-gray-400 truncate mt-0.5">{item.details}</p>
                            )}
                            <p className="font-mono text-xs text-neon-green mt-1 font-semibold">
                              ${(item.price * item.quantity).toLocaleString('es-CO')}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center bg-black/60 rounded-xl border border-white/10 p-1">
                              <button
                                onClick={() => updateQuantity(item.cartItemId, -1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.cartItemId, 1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-gray-500 hover:text-red-400 p-1.5 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 🏡 SECCIÓN MI CASA RESTAURANTE */}
                {miCasaItems.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-red-400">
                      <UtensilsCrossed size={16} />
                      <span className="font-bebas text-lg tracking-wider">Mi Casa Restaurante</span>
                    </div>

                    <div className="space-y-3">
                      {miCasaItems.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="bg-white/5 border border-white/5 hover:border-red-500/30 rounded-2xl p-3.5 flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-sm text-gray-100 truncate">{item.name}</h4>
                            {item.details && (
                              <p className="text-xs text-gray-400 truncate mt-0.5">{item.details}</p>
                            )}
                            <p className="font-mono text-xs text-amber-400 mt-1 font-semibold">
                              ${(item.price * item.quantity).toLocaleString('es-CO')}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center bg-black/60 rounded-xl border border-white/10 p-1">
                              <button
                                onClick={() => updateQuantity(item.cartItemId, -1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.cartItemId, 1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-gray-500 hover:text-red-400 p-1.5 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 📝 FORMULARIO DE DATOS DE ENTREGA Y CLIENTE */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between text-left text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <User size={14} className="text-amber-400" />
                      Datos de Entrega {customerInfo.name ? `(${customerInfo.name})` : '(Opcional pero recomendado)'}
                    </span>
                    {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {/* Selector rápido de tipo de pedido siempre visible */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {[
                      { id: 'delivery', label: '🏠 Domicilio' },
                      { id: 'table', label: '🍽️ En Mesa' },
                      { id: 'takeaway', label: '🛍️ Recoger' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setCustomerInfo({ orderType: type.id as any })}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold transition-all ${
                          customerInfo.orderType === type.id
                            ? 'bg-amber-500 text-black shadow-md font-bold'
                            : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>

                  {/* Campos desplegables o siempre visibles si se expande */}
                  {(showDetails || customerInfo.name) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2.5 pt-2 border-t border-white/10"
                    >
                      <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                          <User size={10} /> Nombre de quien recibe
                        </label>
                        <input
                          type="text"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ name: e.target.value })}
                          placeholder="Ej: Carlos Gómez"
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                          <MapPin size={10} />
                          {customerInfo.orderType === 'table'
                            ? 'Número de Mesa'
                            : customerInfo.orderType === 'takeaway'
                            ? 'Hora estimada de recogida'
                            : 'Dirección y Barrio en Chimichagua'}
                        </label>
                        <input
                          type="text"
                          value={customerInfo.locationDetail}
                          onChange={(e) => setCustomerInfo({ locationDetail: e.target.value })}
                          placeholder={
                            customerInfo.orderType === 'table'
                              ? 'Ej: Mesa 4 (terraza)'
                              : customerInfo.orderType === 'takeaway'
                              ? 'Ej: Paso en 20 minutos'
                              : 'Ej: Calle 6 # 10-25 Barrio El Centro'
                          }
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-1">
                          <FileText size={10} /> Notas o instrucciones
                        </label>
                        <input
                          type="text"
                          value={customerInfo.notes}
                          onChange={(e) => setCustomerInfo({ notes: e.target.value })}
                          placeholder="Ej: Sin cebolla, bebida bien fría..."
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer del Drawer con Total y Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-white/10 bg-black/60 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-gray-400">Total a Pagar:</span>
                <span className="font-bebas text-3xl text-white tracking-wider">
                  ${total.toLocaleString('es-CO')}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <WhatsAppIcon size={22} />
                <span>Confirmar y Enviar por WhatsApp</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
