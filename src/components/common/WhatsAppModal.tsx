import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, UtensilsCrossed } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export default function WhatsAppModal() {
  const { isMixedModalOpen, setIsMixedModalOpen, getWhatsAppUrl } = useCartStore();

  if (!isMixedModalOpen) return null;

  const handleSelectLine = (business: 'monky' | 'micasa') => {
    const url = getWhatsAppUrl(business);
    setIsMixedModalOpen(false);
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-poppins">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(0,0,0,0.8)] text-white text-center"
        >
          <button
            onClick={() => setIsMixedModalOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center text-amber-400">
            <UtensilsCrossed size={28} />
          </div>

          <h3 className="text-2xl font-bebas tracking-wide text-amber-400 mb-2">
            ¡Tienes un Pedido Combinado!
          </h3>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            Tu carrito incluye productos de <strong className="text-neon-pink">Monky Drinks</strong> y de{' '}
            <strong className="text-red-400">Mi Casa Restaurante</strong>.
            <br />
            ¿A cuál de nuestras dos líneas deseas enviar este pedido?
          </p>

          <div className="flex flex-col gap-3.5">
            <button
              onClick={() => handleSelectLine('monky')}
              className="p-4 rounded-2xl bg-gradient-to-r from-neon-pink/20 to-purple-900/30 border border-neon-pink/40 hover:border-neon-pink transition-all flex items-center justify-between group shadow-lg text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neon-pink text-white shadow-md">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="font-bebas text-lg tracking-wider text-neon-yellow group-hover:text-white">
                    Línea Monky Drinks
                  </p>
                  <p className="text-xs text-gray-400">WhatsApp: 311 889 4341</p>
                </div>
              </div>
              <span className="text-xs font-bold text-neon-pink group-hover:translate-x-1 transition-transform">
                Enviar →
              </span>
            </button>

            <button
              onClick={() => handleSelectLine('micasa')}
              className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 to-amber-950/30 border border-red-600/40 hover:border-red-500 transition-all flex items-center justify-between group shadow-lg text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#C21807] text-white shadow-md">
                  <UtensilsCrossed size={20} />
                </div>
                <div>
                  <p className="font-bebas text-lg tracking-wider text-red-400 group-hover:text-white">
                    Línea Mi Casa Restaurante
                  </p>
                  <p className="text-xs text-gray-400">WhatsApp: 318 363 0494</p>
                </div>
              </div>
              <span className="text-xs font-bold text-red-400 group-hover:translate-x-1 transition-transform">
                Enviar →
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

