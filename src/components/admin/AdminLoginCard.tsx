import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowLeft, Eye, EyeOff, ShieldAlert, Sparkles, UtensilsCrossed } from 'lucide-react';
import MiCasaLogo from '../micasa/MiCasaLogo';

interface AdminLoginCardProps {
  business: 'monky' | 'micasa';
  onLogin: (user: string, pass: string) => boolean;
}

export default function AdminLoginCard({ business, onLogin }: AdminLoginCardProps) {
  const isMonky = business === 'monky';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between p-4 sm:p-6 font-poppins ${
        isMonky ? 'bg-[#060606] text-white' : 'bg-[#FFF8EF] text-[#292929]'
      }`}
    >
      {/* Botón Volver */}
      <div className="max-w-md mx-auto w-full pt-4">
        <Link
          to="/admin"
          className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors ${
            isMonky ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#C9141E]'
          }`}
        >
          <ArrowLeft size={16} />
          <span>Volver al Portal de Administradores</span>
        </Link>
      </div>

      {/* Tarjeta de Login */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md mx-auto w-full my-auto"
      >
        <div
          className={`rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-2xl border ${
            isMonky
              ? 'bg-[#111111] border-neon-pink/40 shadow-[0_0_40px_rgba(255,0,184,0.2)]'
              : 'bg-white border-[#C9141E]/20 shadow-[0_15px_40px_rgba(201,20,30,0.12)]'
          }`}
        >
          {/* Luz de Fondo */}
          {isMonky ? (
            <div className="absolute top-0 right-0 w-44 h-44 bg-neon-pink/15 rounded-full blur-3xl pointer-events-none" />
          ) : (
            <div className="absolute top-0 right-0 w-44 h-44 bg-red-100/60 rounded-full blur-3xl pointer-events-none" />
          )}

          {/* Logo y Encabezado */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              {isMonky ? (
                <div className="w-full h-full rounded-2xl bg-black border border-neon-pink p-1 shadow-[0_0_20px_rgba(255,0,184,0.35)]">
                  <img src="/logo-monky.png" alt="Logo Monky" className="w-full h-full object-cover rounded-xl" />
                </div>
              ) : (
                <MiCasaLogo size={75} showText={false} />
              )}
            </div>

            <div
              className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 ${
                isMonky
                  ? 'bg-neon-pink/10 text-neon-pink border border-neon-pink/30'
                  : 'bg-red-50 text-[#C9141E] border border-red-200'
              }`}
            >
              {isMonky ? <Sparkles size={12} /> : <UtensilsCrossed size={12} />}
              <span>{isMonky ? 'Monky Drinks Admin' : 'Mi Casa Admin'}</span>
            </div>

            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isMonky ? 'font-bebas tracking-wider text-white' : 'font-lora text-[#292929]'
              }`}
            >
              Acceso al Panel
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Ingresa tus credenciales para administrar el catálogo y los pedidos.
            </p>
          </div>

          {/* Alerta de Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-2xl bg-red-500/15 border border-red-500 text-red-500 text-xs font-bold flex items-center gap-2"
            >
              <ShieldAlert size={16} />
              <span>Usuario o contraseña incorrectos.</span>
            </motion.div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm relative z-10">
            <div>
              <label
                className={`block font-bold mb-1.5 ${
                  isMonky ? 'text-gray-300' : 'text-[#292929]'
                }`}
              >
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none font-medium transition-all ${
                    isMonky
                      ? 'bg-black/60 border-white/15 text-white focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,0,184,0.3)]'
                      : 'bg-gray-50 border-gray-200 text-[#292929] focus:bg-white focus:border-[#C9141E] focus:ring-1 focus:ring-[#C9141E]'
                  }`}
                  placeholder={isMonky ? 'monky' : 'micasa'}
                  required
                />
              </div>
            </div>

            <div>
              <label
                className={`block font-bold mb-1.5 ${
                  isMonky ? 'text-gray-300' : 'text-[#292929]'
                }`}
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border outline-none font-medium transition-all ${
                    isMonky
                      ? 'bg-black/60 border-white/15 text-white focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,0,184,0.3)]'
                      : 'bg-gray-50 border-gray-200 text-[#292929] focus:bg-white focus:border-[#C9141E] focus:ring-1 focus:ring-[#C9141E]'
                  }`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-4 mt-2 rounded-xl text-white font-bold uppercase tracking-wider text-xs transition-all transform active:scale-95 shadow-lg ${
                isMonky
                  ? 'bg-neon-pink hover:bg-[#e60073] shadow-[0_0_25px_rgba(255,0,184,0.45)]'
                  : 'bg-[#C9141E] hover:bg-[#970D16] shadow-red-950/25'
              }`}
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Ayuda de Acceso */}
          <div
            className={`mt-6 pt-6 border-t text-center text-[11px] ${
              isMonky ? 'border-white/10 text-gray-400' : 'border-gray-100 text-gray-500'
            }`}
          >
            <p className="font-semibold mb-1">Credenciales predeterminadas:</p>
            <p className="font-mono bg-black/10 py-1 px-2 rounded-md inline-block">
              Usuario: <strong>{isMonky ? 'monky' : 'micasa'}</strong> | Contraseña:{' '}
              <strong>{isMonky ? 'monky2026' : 'micasa2026'}</strong>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-center text-[11px] text-gray-400 pb-4">
        Acceso seguro al sistema de administración • Chimichagua - Cesar
      </div>
    </div>
  );
}
