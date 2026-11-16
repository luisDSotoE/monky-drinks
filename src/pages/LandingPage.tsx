import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, UtensilsCrossed, ArrowRight, Flame, MapPin, Heart } from 'lucide-react';
import MiCasaLogo from '../components/micasa/MiCasaLogo';

export default function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col lg:flex-row overflow-hidden font-poppins">
      {/* ════ MITAD IZQUIERDA: MONKY DRINKS (NEÓN Y OSCURO) ════ */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex-1 lg:hover:flex-[1.2] transition-all duration-500 bg-[#050505] text-white flex flex-col justify-center items-center p-8 sm:p-12 text-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 group"
      >
        {/* Luces y Nebulosa de Neón */}
        <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-700">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-neon-pink/20 rounded-full blur-[110px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-blue/20 rounded-full blur-[110px]" />
          <div className="particles-bg opacity-30" />
        </div>

        {/* Logo Monky Oficial */}
        <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full border-3 border-neon-pink shadow-[0_0_35px_rgba(255,0,184,0.45)] p-1 bg-black/60 mb-6 transition-transform duration-500 group-hover:scale-105">
          <img
            src="/logo-monky.png"
            alt="Monky Fusión Drinks"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Badge Chimichagua (Misma dirección que Mi Casa, sin La Piragua) */}
        <div className="relative z-10 flex items-center gap-1.5 bg-black/80 px-4 py-1.5 rounded-full border border-neon-yellow/50 text-neon-yellow text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(255,214,0,0.25)]">
          <MapPin size={14} className="text-neon-yellow animate-bounce" />
          <span>Chimichagua - Cesar</span>
        </div>

        <h2 className="relative z-10 font-bebas text-5xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow via-neon-pink to-neon-blue tracking-wider mb-3 drop-shadow-[0_0_25px_rgba(255,0,184,0.35)]">
          MONKY FUSIÓN DRINKS
        </h2>

        <p className="relative z-10 text-gray-300 text-sm sm:text-base max-w-md font-light mb-8 leading-relaxed">
          La evolución de las micheladas más salvajes, escarchadas con perlas explosivas y Monky enchiladas artesanales.
        </p>

        <Link
          to="/monky-drinks"
          className="relative z-10 inline-flex items-center gap-2.5 bg-gradient-to-r from-neon-pink via-[#e60073] to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,0,184,0.55)] transition-all transform group-hover:scale-105 active:scale-95"
        >
          <Sparkles size={18} className="text-neon-yellow" />
          <span>Entrar a Monky Drinks</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>

      {/* ════ MITAD DERECHA: MI CASA RESTAURANTE (RÚSTICO, CÁLIDO Y ELEGANTE) ════ */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex-1 lg:hover:flex-[1.2] transition-all duration-500 bg-gradient-to-br from-[#FFFFFF] via-[#FFF8EF] to-[#FCEBD9] text-[#292929] flex flex-col justify-center items-center p-8 sm:p-12 text-center overflow-hidden group shadow-inner"
      >
        {/* Efecto de fondo con texturas campestres y resplandor cálido */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/40 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#C9141E0A_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* LOGO OFICIAL VECTORIAL DE MI CASA RESTAURANTE */}
        <div className="relative z-10 mb-5 transition-transform duration-500 group-hover:scale-105">
          <MiCasaLogo size={165} showText={false} />
        </div>

        {/* Badge Chimichagua (Misma dirección) */}
        <div className="relative z-10 flex items-center gap-1.5 bg-white/95 border border-[#C9141E]/20 text-[#292929] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <MapPin size={14} className="text-[#C9141E]" />
          <span>Chimichagua - Cesar</span>
        </div>

        {/* TÍTULO EN ROJO INTENSO */}
        <h2 className="relative z-10 font-lora text-4xl sm:text-6xl text-[#C9141E] font-extrabold tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(201,20,30,0.15)]">
          Mi Casa Restaurante
        </h2>

        {/* ESLOGAN */}
        <p className="relative z-10 text-[#970D16] italic text-base sm:text-xl font-serif mb-4 font-medium">
          "Una experiencia que deleitara tus sentidos"
        </p>

        {/* BADGES PROMOCIONALES IMPACTANTES */}
        <div className="relative z-10 inline-flex flex-wrap items-center justify-center gap-2.5 bg-white border border-[#C9141E]/20 px-5 py-2.5 rounded-2xl shadow-md text-xs sm:text-sm font-bold text-[#292929] mb-6">
          <span className="flex items-center gap-1.5 text-[#C9141E]">
            <Flame size={16} className="text-[#C9141E] animate-pulse" />
            🥩 Asados al carbón a la brasa
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1.5 text-[#356B42]">
            <Heart size={16} />
            🏠 Domicilio GRATIS
          </span>
        </div>

        <p className="text-gray-600 text-xs sm:text-sm max-w-md font-normal mb-8 leading-relaxed relative z-10">
          Sabor de tradición campesina, cortes tiernos marinados a la leña, almuerzos criollos y la calidez de comer como en casa.
        </p>

        {/* BOTÓN LLAMATIVO MI CASA */}
        <Link
          to="/mi-casa"
          className="relative z-10 inline-flex items-center gap-2.5 bg-[#C9141E] hover:bg-[#970D16] text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest shadow-xl shadow-red-950/25 transition-all transform group-hover:scale-105 active:scale-95 border border-red-500/20"
        >
          <UtensilsCrossed size={18} />
          <span>Entrar a Mi Casa</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}
