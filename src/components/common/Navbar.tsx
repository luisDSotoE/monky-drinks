import { NavLink } from 'react-router-dom';
import { Sparkles, UtensilsCrossed, MapPin, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/85 border-b border-white/10 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Identidad / Inicio (SIN la palabra Roomies) */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-red-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <span className="text-lg">🍽️</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bebas text-2xl tracking-wider text-white group-hover:text-amber-400 transition-colors leading-none">
              MENÚ DIGITAL
            </span>
            <span className="text-[10px] font-poppins text-gray-400 flex items-center gap-1 font-medium mt-0.5">
              <MapPin size={10} className="text-amber-400" />
              Chimichagua - Cesar
            </span>
          </div>
        </NavLink>

        {/* Switcher de Negocios */}
        <nav className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 shadow-inner">
          <NavLink
            to="/monky-drinks"
            className={({ isActive }) =>
              `px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-neon-pink to-neon-blue text-white shadow-[0_0_15px_rgba(255,0,184,0.5)] font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <Sparkles size={14} className="text-neon-yellow" />
            <span>Monky Drinks</span>
          </NavLink>

          <NavLink
            to="/mi-casa"
            className={({ isActive }) =>
              `px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#C21807] text-white shadow-[0_0_15px_rgba(194,24,7,0.4)] font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <UtensilsCrossed size={14} className="text-amber-300" />
            <span>Mi Casa</span>
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `p-1.5 rounded-full text-xs font-semibold transition-all flex items-center justify-center ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`
            }
            title="Centro de Administración"
          >
            <ShieldCheck size={16} />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
