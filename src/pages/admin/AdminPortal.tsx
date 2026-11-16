import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, UtensilsCrossed, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import MiCasaLogo from '../../components/micasa/MiCasaLogo';

export default function AdminPortal() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-poppins flex flex-col justify-between p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between py-4 border-b border-white/10">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Volver al Menú de Clientes</span>
        </Link>

        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-xs text-amber-400">
          <ShieldCheck size={14} />
          <span>Centro de Administración Web</span>
        </div>
      </div>

      {/* Selector de Negocio */}
      <div className="max-w-4xl mx-auto w-full my-auto py-12 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-bebas text-5xl sm:text-6xl text-white tracking-wider mb-3">
            PANEL DE ADMINISTRACIÓN
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mb-10">
            Selecciona el negocio que deseas administrar para actualizar precios, agregar productos o modificar los datos de contacto y WhatsApp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* 🐒 PANEL MONKY DRINKS */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-[#111111] border-2 border-neon-pink/40 hover:border-neon-pink rounded-3xl p-8 relative overflow-hidden shadow-[0_0_35px_rgba(255,0,184,0.15)] flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-neon-pink/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="w-20 h-20 rounded-2xl bg-black border border-neon-pink p-2 mb-6 shadow-[0_0_20px_rgba(255,0,184,0.3)]">
                <img
                  src="/logo-monky.png"
                  alt="Monky Logo"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 text-neon-yellow text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkles size={14} />
                <span>Micheladas & Enchiladas</span>
              </div>

              <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-3">
                Monky Fusión Drinks
              </h2>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                Administra micheladas, sabores de escarchado, precios dinámicos de cervezas (Like/Cuates), enchiladas y WhatsApp.
              </p>
            </div>

            <Link
              to="/admin/monky"
              className="w-full py-4 rounded-2xl bg-neon-pink hover:bg-[#e60073] text-white font-bold text-center tracking-wider uppercase text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,0,184,0.4)] transition-all"
            >
              <span>Entrar como Administrador</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* 🏡 PANEL MI CASA RESTAURANTE */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-[#FAF6F0] text-[#2D2319] border-2 border-[#854D0E]/30 hover:border-[#C21807] rounded-3xl p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-200/50 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <MiCasaLogo size={80} showText={false} />
              </div>

              <div className="inline-flex items-center gap-1.5 text-[#C21807] text-xs font-bold uppercase tracking-widest mb-2">
                <UtensilsCrossed size={14} />
                <span>Asados al Carbón & Tradición</span>
              </div>

              <h2 className="font-lora text-3xl sm:text-4xl text-[#C21807] font-bold tracking-tight mb-3">
                Mi Casa Restaurante
              </h2>

              <p className="text-[#5C3A21] text-xs sm:text-sm leading-relaxed mb-6">
                Administra cortes al carbón, platos criollos del día, entradas, bebidas campestres, horarios y teléfono de domicilios.
              </p>
            </div>

            <Link
              to="/admin/micasa"
              className="w-full py-4 rounded-2xl bg-[#C21807] hover:bg-[#991B1B] text-white font-bold text-center tracking-wider uppercase text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all"
            >
              <span>Entrar como Administrador</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 py-4">
        Plataforma Gastronómica Multi-Negocio • Chimichagua - Cesar © 2026
      </div>
    </div>
  );
}
