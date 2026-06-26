import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ShoppingCart, Sparkles, Copy, Check, Trash2, GlassWater, Zap, Crown, CupSoda } from 'lucide-react';

// ════ ICONO OFICIAL DE WHATSAPP (SVG) ════
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
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

// Variantes de Animación
const fadeInUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// Bases de datos de productos
const MICHELADAS = [
  { name: "Monky Clásica", price: 11000, color: "border-neon-blue", iconColor: "text-neon-blue", glow: "hover:shadow-[0_0_30px_rgba(0,191,255,0.3)]", icon: GlassWater },
  { name: "Monky Mix", price: 13000, color: "border-neon-pink", iconColor: "text-neon-pink", glow: "hover:shadow-[0_0_30px_rgba(255,0,184,0.3)]", icon: Zap },
  { name: "Monky Supreme", price: 16000, color: "border-neon-purple", iconColor: "text-neon-purple", glow: "hover:shadow-[0_0_30px_rgba(138,43,226,0.3)]", icon: Crown },
  { name: "Monky Lata", price: 18000, color: "border-neon-green", iconColor: "text-neon-green", glow: "hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]", icon: CupSoda }
];

const ENCHILADAS = [
  { name: "Enchilada de Lulo", price: 8000 },
  { name: "Enchilada de Mora", price: 8000 },
  { name: "Enchilada de Limón", price: 8000 },
  { name: "Enchilada de Naranja", price: 8000 }
];

const EXTRAS = [
  { name: "Gomitas Adicionales", price: 3000 },
  { name: "Perlas Explosivas", price: 5000 }
];

interface CartItem {
  id: string;
  name: string;
  price: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [copiedNequi, setCopiedNequi] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 

  // ══════════════ AQUÍ SE CAMBIÓ EL NÚMERO ══════════════
  const nequiNumber = "3118894341";

  const addToCart = (name: string, price: number) => {
    const newItem = { id: Math.random().toString(), name, price };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCopyNequi = () => {
    navigator.clipboard.writeText(nequiNumber);
    setCopiedNequi(true);
    setTimeout(() => setCopiedNequi(false), 2000);
  };

  const getWhatsAppLink = () => {
    if (cart.length === 0) {
      return `https://wa.me/57${nequiNumber}?text=${encodeURIComponent("¡Hola! Quiero pedir una Monky.")}`;
    }
    
    let text = "🔥🐒 *HOLA, QUIERO HACER EL SIGUIENTE PEDIDO:* 🐒🔥\n\n";
    cart.forEach(item => {
      text += `🍹 ${item.name} ($${item.price.toLocaleString('es-CO')})\n`;
    });
    text += `\n💥 *TOTAL: $${cartTotal.toLocaleString('es-CO')}*`;
    text += `\n💸 *Pago en efectivo o transferencia*`;
    
    return `https://wa.me/57${nequiNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative min-h-screen text-white select-none pb-24">
      <div className="particles-bg"></div>

      {/* ════ SECCIÓN HERO ════ */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 pt-16 pb-10">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="w-72 h-72 md:w-85 md:h-85 rounded-full glass-panel border-neon-pink border-3 box-glow-pink flex items-center justify-center mb-8 overflow-hidden bg-black/50"
        >
          <img src="/logo-monky.png" alt="Monky Logo" className="w-full h-full object-cover" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-bebas text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow via-neon-pink to-neon-blue tracking-wider leading-none mb-4"
        >
          MONKY FUSIÓN DRINKS
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-xl md:text-3xl font-poppins text-gray-200 font-light max-w-2xl tracking-wide mb-8 text-glow-pink"
        >
          La evolución de las micheladas y Monky enchiladas
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex items-center gap-2 bg-black/70 px-5 py-2 rounded-full border border-neon-yellow text-neon-yellow mb-3 font-poppins font-semibold uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(255,214,0,0.2)]"
        >
          <MapPin size={18} className="animate-bounce" />
          <span>Chimichagua - Cesar</span>
        </motion.div>
        
        <p className="text-neon-blue font-poppins font-medium text-sm uppercase tracking-[0.3em] mb-12 text-glow-blue">Ahora en La Piragua</p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 z-10 font-poppins font-bold text-sm tracking-widest"
        >
          <a href="#menu" className="bg-neon-pink hover:bg-pink-600 text-white py-4 px-10 rounded-full box-glow-pink transition-all transform hover:scale-105 uppercase">
            Hacer mi pedido
          </a>
        </motion.div>
      </section>

      {/* ════ SECCIÓN MENÚ (MICHELADAS) ════ */}
      <section id="menu" className="py-24 px-4 max-w-7xl mx-auto relative">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="text-6xl md:text-7xl font-bebas text-center text-neon-yellow text-glow-yellow mb-16"
        >
          MICHELADAS MONKEY
        </motion.h2>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-poppins"
        >
          {MICHELADAS.map((item, idx) => (
            <motion.div 
              key={idx} variants={fadeInUp} whileHover={{ scale: 1.05, y: -12 }}
              className={`glass-panel rounded-3xl p-8 border-t-4 ${item.color} flex flex-col items-center justify-between group transition-all duration-300 ${item.glow}`}
            >
              <div className="w-24 h-24 rounded-full bg-black/60 mb-6 flex items-center justify-center border border-white/10 transition-colors shadow-inner group-hover:bg-white/5">
                <item.icon size={44} className={`${item.iconColor} opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_currentColor]`} />
              </div>

              <h3 className="text-3xl font-bebas tracking-wide mb-2 text-center group-hover:text-neon-yellow transition-colors">{item.name}</h3>
              <p className="text-2xl font-black text-gray-200 mb-8 tracking-tight">${item.price.toLocaleString('es-CO')}</p>
              
              <button 
                onClick={() => addToCart(item.name, item.price)}
                className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 group-hover:border-none group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-pink text-sm font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <ShoppingCart size={18} /> Agregar al Pedido
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════ SABORES ════ */}
      <section className="py-8 px-4 font-poppins">
        <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto">
          <motion.div whileHover={{ scale: 1.08 }} className="px-8 py-3 rounded-full border border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] font-bold text-base bg-red-950/20 backdrop-blur-md cursor-pointer tracking-wide uppercase">
            🔥 Rojo Explosivo
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }} className="px-8 py-3 rounded-full border border-neon-green text-neon-green box-glow-green font-bold text-base bg-emerald-950/20 backdrop-blur-md cursor-pointer tracking-wide uppercase">
            🍃 Verde Salvaje
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }} className="px-8 py-3 rounded-full border border-neon-yellow text-neon-yellow shadow-[0_0_20px_rgba(255,214,0,0.4)] font-bold text-base bg-amber-950/20 backdrop-blur-md cursor-pointer tracking-wide uppercase">
            🌴 Amarillo Tropical
          </motion.div>
        </div>
      </section>

      {/* ════ MONKY ENCHILADAS ════ */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="text-6xl md:text-7xl font-bebas text-center text-neon-orange text-glow-orange mb-16"
        >
          MONKY ENCHILADAS
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 font-poppins">
          {ENCHILADAS.map((item, idx) => (
            <motion.div 
              key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} whileHover={{ scale: 1.05 }}
              onClick={() => addToCart(item.name, item.price)}
              className="glass-panel p-6 rounded-2xl border border-transparent hover:border-neon-orange/50 text-center group bg-gradient-to-b from-black/60 to-orange-950/10 hover:shadow-[0_0_25px_rgba(255,115,0,0.25)] transition-all cursor-pointer active:scale-95"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-neon-orange transition-colors">{item.name.replace("Enchilada de ", "")}</h3>
              <p className="text-xl md:text-2xl font-bebas text-gray-300 group-hover:text-white tracking-widest">${item.price.toLocaleString('es-CO')}</p>
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity text-neon-yellow text-sm font-bold flex justify-center items-center gap-1">
                <ShoppingCart size={14} /> Añadir
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ ADICIONALES ════ */}
      <section className="py-12 px-4 max-w-3xl mx-auto font-poppins">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="glass-panel rounded-3xl p-8 border border-white/10 relative overflow-hidden bg-black/50"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 text-neon-purple"><Sparkles size={120} /></div>
          <h2 className="text-4xl font-bebas text-neon-purple text-glow-purple mb-8 tracking-wider">Adicionales</h2>
          <div className="flex flex-col gap-5">
            {EXTRAS.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-black/60 rounded-xl border border-white/5 hover:border-neon-purple/40 transition-colors animate-float">
                <span className="text-xl font-bold tracking-wide">{item.name}</span>
                <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 sm:mt-0">
                  <span className="text-neon-green font-bebas text-2xl tracking-wider">+${item.price.toLocaleString('es-CO')}</span>
                  <button 
                    onClick={() => addToCart(item.name, item.price)}
                    className="bg-white/10 hover:bg-neon-purple text-white p-2 rounded-lg transition-colors"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ════ SECCIÓN PAGOS ════ */}
      <section className="py-12 px-4 max-w-2xl mx-auto font-poppins">
        <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden shadow-2xl">
          <h3 className="text-3xl font-bebas tracking-wider mb-3 uppercase text-white">Transferencias y Efectivo</h3>
          <p className="text-gray-300 mb-8 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Copia nuestro número para realizar tu transferencia (Nequi/Bancolombia) o paga en efectivo al recibir el pedido.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-0 w-full max-w-sm mx-auto">
            <div className="bg-[#050505] border border-[#222] py-4 px-5 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none flex items-center justify-center gap-3 w-full sm:w-auto">
              <span className="text-[#FF007F] font-black text-lg tracking-tight leading-none flex items-center bg-[#FF007F]/10 px-2 py-1 rounded">
                Nequi
              </span>
              <div className="w-px h-6 bg-white/10 mx-1"></div>
              <span className="font-mono text-xl md:text-2xl tracking-widest text-white font-semibold">
                {nequiNumber}
              </span>
            </div>
            
            <button 
              onClick={handleCopyNequi}
              className={`py-4 px-6 sm:rounded-r-2xl sm:rounded-bl-none rounded-b-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                copiedNequi 
                ? 'bg-[#25D366] text-white shadow-[0_0_15px_rgba(37,211,102,0.4)]' 
                : 'bg-[#FF007F] hover:bg-[#E60073] text-white shadow-[0_0_15px_rgba(255,0,127,0.3)]'
              }`}
            >
              {copiedNequi ? <Check size={20} /> : <Copy size={20} />}
              {copiedNequi ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer className="glass-panel mt-24 py-12 border-t border-white/5 text-center font-poppins bg-black/80 pb-32">
         <div className="flex flex-col items-center justify-center gap-5">
          <div className="w-20 h-20 rounded-full border border-neon-blue box-glow-blue overflow-hidden p-1 bg-black">
             <img src="/logo-monky.png" alt="Monky Logo" className="w-full h-full object-contain" />
          </div>
          <a 
            href="https://instagram.com/monky_fusion_drinks" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 text-neon-pink hover:text-white text-lg font-semibold transition-colors mt-2 text-glow-pink"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            @monky_fusion_drinks
          </a>
          <p className="text-gray-600 text-xs tracking-widest mt-6">Monky Fusión Drinks © 2026</p>
        </div>
      </footer>

      {/* ════ BARRA FLOTANTE DE CARRITO ════ */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full z-50 bg-black/90 backdrop-blur-xl border-t-2 border-neon-green shadow-[0_-10px_30px_rgba(57,255,20,0.15)] font-poppins rounded-t-3xl"
          >
            <AnimatePresence>
              {isCartOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="max-h-[50vh] overflow-y-auto p-4 border-b border-white/10"
                >
                  <h3 className="text-neon-yellow font-bebas text-2xl mb-4 tracking-widest text-center">Tu Pedido</h3>
                  <div className="flex flex-col gap-3 max-w-2xl mx-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-sm font-semibold">{item.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-300 font-mono">${item.price.toLocaleString('es-CO')}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 p-1">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="max-w-4xl mx-auto flex items-center justify-between p-4 md:px-8">
              <div 
                className="flex flex-col cursor-pointer"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <div className="flex items-center gap-2 text-neon-green font-bold">
                  <ShoppingCart size={20} />
                  <span>{cart.length} productos</span>
                </div>
                <span className="text-2xl font-bebas tracking-widest mt-1">
                  Total: ${cartTotal.toLocaleString('es-CO')}
                </span>
                <span className="text-xs text-gray-400 underline decoration-dashed mt-1">Ver detalles</span>
              </div>
              
              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-3 px-6 md:px-10 rounded-full flex items-center gap-2 transition-transform transform hover:scale-105 shadow-[0_0_15px_rgba(37,211,102,0.4)]"
              >
                <WhatsAppIcon size={24} />
                <span className="hidden sm:inline uppercase tracking-wider text-sm">Enviar Pedido</span>
                <span className="sm:hidden uppercase tracking-wider text-sm">Pedir</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ ICONO FLOTANTE OFICIAL DE WHATSAPP ════ */}
      <AnimatePresence>
        {cart.length === 0 && (
          <motion.a 
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            href={getWhatsAppLink()} 
            target="_blank" rel="noreferrer"
            className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_25px_rgba(37,211,102,0.7)] hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
            style={{ animation: 'pulse 2s infinite' }}
          >
            <WhatsAppIcon size={32} />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}