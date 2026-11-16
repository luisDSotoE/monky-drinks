import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  Plus,
  Check,
  Copy,
  Clock,
  Phone,
  Sparkles,
  Utensils,
  Heart,
  MapPin,
  Settings,
  ArrowRight,
  ChefHat,
  Home,
  Users,
  Compass,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useCatalogStore } from '../store/useCatalogStore';
import type { CatalogProduct } from '../store/useCatalogStore';
import MiCasaLogo from '../components/micasa/MiCasaLogo';

// WhatsApp Icon SVG oficial
const WhatsAppIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
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

const CATEGORIES = [
  { id: 'all', name: '⭐ Todo el Menú' },
  { id: 'asados', name: '🥩 Asados al Carbón' },
  { id: 'tipicos', name: '🍲 Platos Criollos' },
  { id: 'picadas', name: '🌽 Entradas & Picadas' },
  { id: 'bebidas', name: '🍹 Bebidas & Jugos' },
];

const GALLERY_IMAGES = [
  {
    title: 'Punta de Anca a la Brasa',
    desc: 'Corte seleccionado sobre carbón caliente',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Costillas BBQ Glaseadas',
    desc: 'Caramelizadas con leña y sabor ahumado',
    url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Ambiente Campestre & Familiar',
    desc: 'Espacio cálido rodeado de naturaleza',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Picada de la Casa',
    desc: 'Para compartir en familia y amigos',
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Limonada de Coco & Corozo',
    desc: 'Refrescantes con frutas de la región',
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Tradición y Fuego de Leña',
    desc: 'El secreto de nuestra sazón inigualable',
    url: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
  },
];

export default function MiCasaRestaurantePage() {
  const { addToCart } = useCartStore();
  const { miCasaBusiness, getProductsByBusiness } = useCatalogStore();
  const dishes = getProductsByBusiness('micasa').filter((p) => p.isAvailable);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const miCasaPhone = miCasaBusiness.whatsappNumber || '3183630494';

  const handleCopy = () => {
    navigator.clipboard.writeText(miCasaPhone);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleAdd = (dish: CatalogProduct) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      business: 'micasa',
      image: dish.image,
    });
    setAddedItemName(dish.name);
    setTimeout(() => setAddedItemName(null), 1500);
  };

  const filteredDishes = dishes.filter((d) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'asados') return d.category.toLowerCase().includes('asado');
    if (activeCategory === 'tipicos')
      return (
        d.category.toLowerCase().includes('criollo') ||
        d.category.toLowerCase().includes('típico') ||
        d.category.toLowerCase().includes('tipico')
      );
    if (activeCategory === 'picadas')
      return (
        d.category.toLowerCase().includes('picada') ||
        d.category.toLowerCase().includes('entrada')
      );
    if (activeCategory === 'bebidas')
      return (
        d.category.toLowerCase().includes('bebida') ||
        d.category.toLowerCase().includes('jugo')
      );
    return d.category === activeCategory;
  });

  return (
    <div className="micasa-page min-h-screen pb-32 text-[#292929] selection:bg-[#C9141E] selection:text-white">
      {/* ════ A. ENCABEZADO / NAVBAR DEDICADO DE MI CASA ════ */}
      <nav className="sticky top-[57px] z-40 bg-[#FFF8EF]/95 backdrop-blur-md border-b border-[#C9141E]/15 px-4 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo y Nombre */}
          <a href="#inicio" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <MiCasaLogo size={42} showText={false} />
            </div>
            <div>
              <span className="font-lora font-bold text-lg text-[#C9141E] leading-tight block">
                MI CASA
              </span>
              <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-[#356B42] uppercase block">
                Restaurante
              </span>
            </div>
          </a>

          {/* Enlaces de Navegación Rápida */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-[#292929]">
            <a href="#inicio" className="hover:text-[#C9141E] transition-colors">
              Inicio
            </a>
            <a href="#nosotros" className="hover:text-[#C9141E] transition-colors">
              Nosotros
            </a>
            <a href="#menu" className="hover:text-[#C9141E] transition-colors">
              Menú
            </a>
            <a href="#galeria" className="hover:text-[#C9141E] transition-colors">
              Galería
            </a>
            <a href="#experiencia" className="hover:text-[#C9141E] transition-colors">
              Experiencia
            </a>
            <a href="#contacto" className="hover:text-[#C9141E] transition-colors">
              Contacto
            </a>
          </div>

          {/* Botón Destacado: Haz tu Pedido */}
          <a
            href="#menu"
            className="inline-flex items-center gap-2 bg-[#C9141E] hover:bg-[#970D16] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md shadow-red-950/20 transition-all transform hover:scale-105 active:scale-95"
          >
            <Utensils size={14} />
            <span>Haz tu Pedido</span>
          </a>
        </div>
      </nav>

      {/* ════ B. HERO SECTION IMPACTANTE ════ */}
      <section
        id="inicio"
        className="relative pt-12 pb-20 md:py-24 px-4 overflow-hidden bg-gradient-to-b from-[#FFF8EF] via-[#FFF3E3] to-[#FFF8EF] border-b border-[#C9141E]/10"
      >
        {/* Detalles Gráficos Decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Columna Izquierda: Información Principal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Badges de Confianza */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-white border border-[#C9141E]/20 text-[#292929] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <span className="flex items-center gap-1.5 text-[#C9141E]">
                <Flame size={14} className="text-[#C9141E] animate-pulse" />
                Asados al Carbón
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1.5 text-[#356B42]">
                <Heart size={14} />
                {miCasaBusiness.deliveryInfo}
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1 text-gray-500">
                <MapPin size={13} className="text-[#C9141E]" />
                {miCasaBusiness.address}
              </span>
            </div>

            {/* Nombre Destacado en Rojo Principal */}
            <h1 className="font-lora text-5xl sm:text-7xl font-extrabold text-[#C9141E] tracking-tight leading-[1.05] mb-4">
              MI CASA <br className="hidden sm:inline" />
              <span className="text-[#292929]">RESTAURANTE</span>
            </h1>

            {/* Frase Oficial */}
            <p className="font-serif italic text-2xl sm:text-3xl text-[#970D16] mb-6 font-medium">
              "{miCasaBusiness.slogan}"
            </p>

            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Cortes tiernos marinados a la leña, el inconfundible sabor del carbón tradicional y la calidez de comer como en casa, rodeado de un ambiente natural acogedor.
            </p>

            {/* Botones de Acción Hero */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C9141E] hover:bg-[#970D16] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-xl shadow-red-950/25 transition-all transform hover:scale-105 active:scale-95"
              >
                <span>Explorar nuestro menú</span>
                <ArrowRight size={18} />
              </a>

              <a
                href={`https://wa.me/57${miCasaPhone}?text=${encodeURIComponent('¡Hola Mi Casa Restaurante! Me gustaría consultar información y hacer un pedido.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-[#292929] border border-gray-300 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-sm transition-all hover:border-[#C9141E]"
              >
                <WhatsAppIcon size={20} className="text-[#356B42]" />
                <span>Contáctanos</span>
              </a>
            </div>
          </motion.div>

          {/* Columna Derecha: Composición Visual con Fotografía y Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000"
                alt="Asados Mi Casa"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              {/* Sello flotante del logo oficial */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-[#C9141E]/20">
                <MiCasaLogo size={85} showText={false} />
              </div>

              {/* Tarjeta flotante en la foto */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-[#356B42] uppercase tracking-wider flex items-center gap-1">
                    <Flame size={12} className="text-[#C9141E]" /> 100% Brasa al Carbón
                  </span>
                  <span className="text-[#C9141E] font-black text-sm">$32.000</span>
                </div>
                <h4 className="font-lora font-bold text-base text-[#292929]">Punta de Anca al Carbón</h4>
                <p className="text-gray-500 text-xs">Corte jugoso de 350g con papa salada y patacón</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════ C. SECCIÓN NOSOTROS (HISTORIA & AMBIENTE FAMILIAR) ════ */}
      <section id="nosotros" className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mosaico de Fotos del Establecimiento */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-lg h-56 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
                  alt="Instalaciones Mi Casa"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg h-44 bg-[#FFF8EF] p-6 flex flex-col justify-center border border-[#C9141E]/15 text-center">
                <span className="font-lora text-4xl font-extrabold text-[#C9141E]">100%</span>
                <span className="text-xs uppercase font-bold text-[#356B42] tracking-wider mt-1">
                  Sabor Casero & Leña
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="rounded-3xl overflow-hidden shadow-lg h-44 bg-[#C9141E] text-white p-6 flex flex-col justify-center text-center">
                <Heart size={32} className="mx-auto mb-2 text-white/90" />
                <span className="font-lora text-xl font-bold">Atención Familiar</span>
                <span className="text-xs text-white/80">Te hacemos sentir en casa</span>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg h-56 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
                  alt="Mesa Servida"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Texto Editorial de Nosotros */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#FFF8EF] border border-[#C9141E]/20 text-[#C9141E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <ChefHat size={14} />
              <span>Nuestra Historia & Tradición</span>
            </div>

            <h2 className="font-lora text-4xl sm:text-5xl font-extrabold text-[#292929] tracking-tight mb-6 leading-tight">
              Donde cada plato tiene el <br />
              <span className="text-[#C9141E]">sabor de tu hogar</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              En <strong>MI CASA RESTAURANTE</strong> fusionamos la tradición de los fogones campesinos con los mejores cortes asados al carbón. Creemos que la buena comida une a las familias, por eso preparamos cada almuerzo con ingredientes frescos de nuestra tierra, leña seleccionada y la sazón de casa.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              Nuestro espacio está rodeado de vegetación natural, madera rústica y un ambiente diurno fresco que te invita a disfrutar sin prisas, con porciones generosas y una sonrisa cercana.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-red-50 text-[#C9141E]">
                  <Home size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#292929]">Ambiente Acogedor</h4>
                  <p className="text-xs text-gray-500">Decoración cálida con plantas</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-50 text-[#356B42]">
                  <Flame size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#292929]">Cocina al Carbón</h4>
                  <p className="text-xs text-gray-500">Carnes a punto perfecto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ D. SECCIÓN NUESTRO MENÚ ════ */}
      <section id="menu" className="py-20 md:py-28 px-4 bg-[#FFF8EF]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[#C9141E]/20 text-[#C9141E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
            <Utensils size={14} />
            <span>Carta Gastronómica</span>
          </div>

          <h2 className="font-lora text-4xl sm:text-5xl font-extrabold text-[#C9141E] tracking-tight mb-4">
            Nuestro Menú Especial
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mb-10">
            Descubre nuestras especialidades a la brasa, platos criollos tradicionales y bebidas naturales recién hechas.
          </p>

          {/* Filtros de Categoría */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                  activeCategory === cat.id
                    ? 'bg-[#C9141E] text-white shadow-md shadow-red-950/20 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid de Platos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Imagen del Plato */}
                <div className="relative h-56 w-full overflow-hidden bg-amber-50">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                  {dish.badge && (
                    <div className="absolute top-3.5 left-3.5 bg-[#C9141E] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles size={12} />
                      {dish.badge}
                    </div>
                  )}

                  <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-xl text-[#C9141E] font-black text-lg shadow-md">
                    ${dish.price.toLocaleString('es-CO')}
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#356B42] bg-emerald-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                      {dish.category}
                    </span>
                    <h3 className="font-lora text-xl font-bold text-[#292929] group-hover:text-[#C9141E] transition-colors mb-2 leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <span className="text-xs text-[#356B42] font-semibold flex items-center gap-1">
                      <Flame size={14} className="text-[#C9141E]" /> Al Carbón
                    </span>

                    <button
                      onClick={() => handleAdd(dish)}
                      className="bg-[#C9141E] hover:bg-[#970D16] active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md shadow-red-950/20 flex items-center gap-1.5"
                    >
                      {addedItemName === dish.name ? (
                        <>
                          <Check size={16} />
                          <span>¡Agregado!</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Agregar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ E. SECCIÓN GALERÍA TIPO MASONRY EDITORIAL ════ */}
      <section id="galeria" className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#FFF8EF] border border-[#C9141E]/20 text-[#C9141E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
            <Compass size={14} />
            <span>Nuestros Momentos</span>
          </div>

          <h2 className="font-lora text-4xl sm:text-5xl font-extrabold text-[#292929] tracking-tight mb-4">
            Galería de Experiencias
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mb-12">
            Un recorrido visual por nuestros asados a la leña, ambiente campestre y platos insignia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden h-72 shadow-md group cursor-pointer border border-gray-100"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h4 className="font-lora text-lg font-bold">{img.title}</h4>
                  <p className="text-xs text-white/80 mt-0.5">{img.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ F. SECCIÓN EXPERIENCIA MI CASA (4 PILARES) ════ */}
      <section id="experiencia" className="py-20 md:py-28 px-4 bg-[#FFF8EF]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[#C9141E]/20 text-[#C9141E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
            <Sparkles size={14} />
            <span>La Diferencia Mi Casa</span>
          </div>

          <h2 className="font-lora text-4xl sm:text-5xl font-extrabold text-[#C9141E] tracking-tight mb-4">
            ¿Por qué elegirnos?
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mb-12">
            Cuatro pilares que convierten cada almuerzo en una experiencia memorable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#C9141E] flex items-center justify-center mb-5">
                <Home size={26} />
              </div>
              <h3 className="font-lora text-lg font-bold text-[#292929] mb-2">Ambiente Familiar</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                El lugar perfecto para compartir en familia con la tranquilidad de tu propia casa.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#356B42] flex items-center justify-center mb-5">
                <Heart size={26} />
              </div>
              <h3 className="font-lora text-lg font-bold text-[#292929] mb-2">Decoración Natural</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Vegetación abundante, plantas tropicales y madera rústica que refrescan tus sentidos.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#92400E] flex items-center justify-center mb-5">
                <Flame size={26} />
              </div>
              <h3 className="font-lora text-lg font-bold text-[#292929] mb-2">Sabor a la Brasa</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Asados al carbón con leña seleccionada que conserva todos los jugos de la carne.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#C9141E] flex items-center justify-center mb-5">
                <Users size={26} />
              </div>
              <h3 className="font-lora text-lg font-bold text-[#292929] mb-2">Atención Cálida</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Servicio con esmero, rapidez y la amabilidad que caracteriza a nuestra gente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════ G. SECCIÓN CONTACTO Y UBICACIÓN ════ */}
      <section id="contacto" className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#FFF8EF] via-white to-[#FFF8EF] border-2 border-[#C9141E]/20 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 mx-auto bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center text-[#C9141E] mb-4">
                <Phone size={30} />
              </div>

              <h2 className="font-lora text-3xl sm:text-4xl font-extrabold text-[#C9141E] tracking-tight mb-2">
                Pide a Domicilio o Visítanos
              </h2>

              <p className="text-gray-600 text-sm sm:text-base mb-8">
                Llevamos tu almuerzo caliente hasta la puerta de tu casa o reserva tu mesa para compartir un momento especial.
              </p>

              {/* Botón WhatsApp de Contacto */}
              <a
                href={`https://wa.me/57${miCasaPhone}?text=${encodeURIComponent('¡Hola Mi Casa Restaurante! Deseo hacer un pedido a domicilio.')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#356B42] hover:bg-[#2A5534] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/20 transition-all transform hover:scale-105 active:scale-95 mb-8"
              >
                <WhatsAppIcon size={24} />
                <span>Escríbenos al WhatsApp ({miCasaPhone})</span>
              </a>

              {/* Módulo de Nequi / Transferencias */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500 tracking-wider block">
                    Transferencias Nequi / Daviplata
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#292929]">
                    {miCasaBusiness.nequiNumber || miCasaPhone}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    copiedNumber
                      ? 'bg-[#356B42] text-white'
                      : 'bg-[#C9141E] hover:bg-[#970D16] text-white'
                  }`}
                >
                  {copiedNumber ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedNumber ? '¡Copiado!' : 'Copiar Número'}</span>
                </button>
              </div>

              {/* Datos de Horario y Dirección */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200 text-xs text-gray-600 font-semibold">
                <div className="flex items-center justify-center gap-2">
                  <Clock size={16} className="text-[#C9141E]" />
                  <span>Horario: {miCasaBusiness.schedule}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={16} className="text-[#C9141E]" />
                  <span>Ubicación: {miCasaBusiness.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ H. FOOTER ELEGANTE ════ */}
      <footer className="bg-[#292929] text-white py-14 px-4 border-t-4 border-[#C9141E]">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-3 flex items-center justify-center">
            <MiCasaLogo size={60} showText={false} />
          </div>

          <h3 className="font-lora text-2xl font-bold text-white tracking-wider mb-1">
            MI CASA RESTAURANTE
          </h3>
          <p className="text-gray-400 text-xs italic mb-6">
            "{miCasaBusiness.slogan}"
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-300 font-bold uppercase tracking-wider mb-8">
            <a href="#inicio" className="hover:text-[#C9141E] transition-colors">
              Inicio
            </a>
            <a href="#nosotros" className="hover:text-[#C9141E] transition-colors">
              Nosotros
            </a>
            <a href="#menu" className="hover:text-[#C9141E] transition-colors">
              Menú
            </a>
            <a href="#galeria" className="hover:text-[#C9141E] transition-colors">
              Galería
            </a>
            <a href="#experiencia" className="hover:text-[#C9141E] transition-colors">
              Experiencia
            </a>
            <a href="#contacto" className="hover:text-[#C9141E] transition-colors">
              Contacto
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>MI CASA RESTAURANTE • Sabor, Tradición y Asados al Carbón © 2026</p>

            <Link
              to="/admin/micasa"
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors"
            >
              <Settings size={13} />
              <span>Acceso Administrador Mi Casa</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
