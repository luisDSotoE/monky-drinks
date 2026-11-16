import { Outlet } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import Navbar from '../components/common/Navbar';
import GlobalCartDrawer from '../components/common/GlobalCartDrawer';
import WhatsAppModal from '../components/common/WhatsAppModal';

export default function RootLayout() {
  const {
    getCartCount,
    getCartTotal,
    toggleCart,
    getCartBusinessStatus,
    getWhatsAppUrl,
    setIsMixedModalOpen,
  } = useCartStore();

  const count = getCartCount();
  const total = getCartTotal();

  const handleCheckout = () => {
    const status = getCartBusinessStatus();
    if (status === 'mixed') {
      setIsMixedModalOpen(true);
    } else {
      window.open(getWhatsAppUrl(), '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-pink-500 selection:text-white">
      {/* Navbar Superior Minimalista */}
      <Navbar />

      {/* Vistas dinámicas */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Botón Flotante Global de Carrito */}
      {count > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg">
          <div className="bg-[#111111]/95 text-white border border-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-4">
            <button
              onClick={toggleCart}
              className="flex items-center gap-3 text-left hover:opacity-90 transition-opacity"
            >
              <div className="relative bg-white/10 p-2.5 rounded-xl text-neon-green">
                <ShoppingCart size={22} />
                <span className="absolute -top-1.5 -right-1.5 bg-neon-pink text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-poppins">Total del Pedido</p>
                <p className="font-bebas text-xl sm:text-2xl text-white tracking-wider">
                  ${total.toLocaleString('es-CO')}
                </p>
              </div>
            </button>

            <button
              onClick={handleCheckout}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-5 py-2.5 rounded-xl text-sm font-poppins tracking-wider uppercase transition-transform hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center gap-2"
            >
              Pedir
            </button>
          </div>
        </div>
      )}

      {/* Panel Detallado del Carrito */}
      <GlobalCartDrawer onCheckout={handleCheckout} />

      {/* Modal para decidir línea en pedidos mixtos */}
      <WhatsAppModal />
    </div>
  );
}

