import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  Eye,
  Sparkles,
  Phone,
  Clock,
  X,
  ToggleLeft,
  ToggleRight,
  Store,
  LogOut,
  Search,
  KeyRound,
  TrendingUp,
} from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';
import type { CatalogProduct } from '../../store/useCatalogStore';
import { useAuthStore } from '../../store/useAuthStore';
import AdminLoginCard from '../../components/admin/AdminLoginCard';

export default function MonkyAdminPage() {
  const { isMonkyLoggedIn, loginMonky, logoutMonky, monkyAuth, updateCredentials } = useAuthStore();

  const {
    monkyBusiness,
    updateBusinessConfig,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,
    getProductsByBusiness,
    getCategoriesByBusiness,
  } = useCatalogStore();

  const products = getProductsByBusiness('monky');
  const categories = getCategoriesByBusiness('monky');

  // Si no está logueado, mostrar pantalla de Login
  if (!isMonkyLoggedIn) {
    return <AdminLoginCard business="monky" onLogin={loginMonky} />;
  }

  // Estados de navegación y filtros
  const [activeTab, setActiveTab] = useState<'products' | 'business' | 'security'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<CatalogProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Formulario de Negocio
  const [bizForm, setBizForm] = useState({
    name: monkyBusiness.name,
    slogan: monkyBusiness.slogan,
    whatsappNumber: monkyBusiness.whatsappNumber,
    nequiNumber: monkyBusiness.nequiNumber,
    address: monkyBusiness.address,
    schedule: monkyBusiness.schedule,
    deliveryInfo: monkyBusiness.deliveryInfo,
    instagram: monkyBusiness.instagram || '',
  });

  // Formulario de Producto
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: categories[0] || 'Micheladas',
    description: '',
    badge: '',
    image: '',
  });

  // Formulario de Seguridad
  const [securityForm, setSecurityForm] = useState({
    user: monkyAuth.username,
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig('monky', bizForm);
    showToast('¡Datos de Monky Drinks actualizados con éxito!');
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      price: '',
      category: categories[0] || 'Micheladas',
      description: '',
      badge: '',
      image: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: CatalogProduct) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      price: prod.price.toString(),
      category: prod.category,
      description: prod.description,
      badge: prod.badge || '',
      image: prod.image,
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        price: Number(productForm.price),
        category: productForm.category,
        description: productForm.description,
        badge: productForm.badge,
        image: productForm.image,
      });
      showToast(`¡"${productForm.name}" actualizado!`);
    } else {
      addProduct({
        name: productForm.name,
        price: Number(productForm.price),
        category: productForm.category,
        description: productForm.description,
        badge: productForm.badge,
        image: productForm.image || '/Monky Clasica.jpeg',
        business: 'monky',
        isAvailable: true,
      });
      showToast(`¡"${productForm.name}" añadido al menú!`);
    }

    setIsModalOpen(false);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    updateCredentials('monky', securityForm.user, securityForm.newPassword);
    showToast('¡Credenciales de acceso actualizadas!');
    setSecurityForm({ ...securityForm, newPassword: '', confirmPassword: '' });
  };

  // Filtrado reactivo de productos
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const activeCount = products.filter((p) => p.isAvailable).length;

  return (
    <div className="min-h-screen bg-[#070707] text-white font-poppins pb-24 selection:bg-pink-500 selection:text-white">
      {/* ════ TOAST NOTIFICATION ════ */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#121212] border-2 border-neon-green text-neon-green px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(57,255,20,0.4)] flex items-center gap-2 font-bold text-sm"
          >
            <Check size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ TOP NAVBAR DEL PANEL ════ */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-neon-pink/30 px-4 py-3 shadow-[0_4px_30px_rgba(255,0,184,0.15)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Cambiar de negocio"
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl border-2 border-neon-pink p-0.5 bg-black shadow-[0_0_15px_rgba(255,0,184,0.4)]">
                <img src="/logo-monky.png" alt="Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div>
                <h1 className="font-bebas text-xl sm:text-2xl tracking-wider text-neon-yellow leading-none flex items-center gap-2">
                  <span>MONKY DRINKS</span>
                  <span className="text-[10px] bg-neon-pink text-white font-poppins font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                    Admin
                  </span>
                </h1>
                <p className="text-[10px] text-gray-400">Control de Bebidas & Pedidos</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/monky-drinks"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neon-pink/20 border border-neon-pink/50 text-neon-pink text-xs font-bold hover:bg-neon-pink hover:text-white transition-all shadow-[0_0_15px_rgba(255,0,184,0.3)]"
            >
              <Eye size={14} />
              <span className="hidden sm:inline">Ver Menú en Vivo</span>
            </Link>

            <button
              onClick={logoutMonky}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* ════ DASHBOARD KPIS ════ */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Bebidas Activas</p>
              <p className="font-bebas text-2xl sm:text-3xl text-neon-green tracking-wider mt-0.5">
                {activeCount} / {products.length}
              </p>
            </div>
            <div className="p-3 bg-neon-green/10 text-neon-green rounded-xl">
              <TrendingUp size={22} />
            </div>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Categorías</p>
              <p className="font-bebas text-2xl sm:text-3xl text-neon-yellow tracking-wider mt-0.5">
                {categories.length}
              </p>
            </div>
            <div className="p-3 bg-neon-yellow/10 text-neon-yellow rounded-xl">
              <Sparkles size={22} />
            </div>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Línea WhatsApp</p>
              <p className="font-mono text-sm sm:text-base font-bold text-white truncate mt-0.5">
                {monkyBusiness.whatsappNumber}
              </p>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Phone size={22} />
            </div>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">Nequi Pagos</p>
              <p className="font-mono text-sm sm:text-base font-bold text-neon-pink truncate mt-0.5">
                {monkyBusiness.nequiNumber}
              </p>
            </div>
            <div className="p-3 bg-neon-pink/10 text-neon-pink rounded-xl">
              <Store size={22} />
            </div>
          </div>
        </div>
      </section>

      {/* ════ TABS DE NAVEGACIÓN ════ */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex border-b border-white/10 gap-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 font-semibold text-sm transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'products'
                ? 'border-neon-pink text-neon-pink'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles size={16} />
            <span>Productos & Micheladas ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('business')}
            className={`pb-3 font-semibold text-sm transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'business'
                ? 'border-neon-yellow text-neon-yellow'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Store size={16} />
            <span>Datos de Contacto (WhatsApp & Nequi)</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 font-semibold text-sm transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'security'
                ? 'border-neon-blue text-neon-blue'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <KeyRound size={16} />
            <span>Seguridad & Contraseña</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 mt-6">
        {/* ════ PESTAÑA 1: PRODUCTOS ════ */}
        {activeTab === 'products' && (
          <div>
            {/* Barra de Filtros y Búsqueda */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-[#111111] p-3 rounded-2xl border border-white/10">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar bebida, sabor o ingrediente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:border-neon-pink outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 focus:border-neon-pink outline-none"
                >
                  <option value="all">Todas las Categorías</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleOpenAddModal}
                  className="bg-neon-pink hover:bg-[#e60073] text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,0,184,0.4)] transition-all whitespace-nowrap"
                >
                  <Plus size={16} />
                  <span>Agregar</span>
                </button>
              </div>
            </div>

            {/* Grid de Productos */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#111] rounded-3xl border border-white/10">
                <p className="text-gray-400 text-sm">No se encontraron productos con ese filtro.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className={`bg-[#111111] border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                      prod.isAvailable
                        ? 'border-white/10 hover:border-neon-pink/40 shadow-md'
                        : 'border-red-900/30 opacity-60 bg-black/70'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-xl bg-black border border-white/10 overflow-hidden shrink-0">
                        {prod.image ? (
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neon-pink text-xs">
                            🍹
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] uppercase font-bold text-neon-yellow bg-neon-yellow/10 px-2 py-0.5 rounded">
                            {prod.category}
                          </span>
                          {prod.badge && (
                            <span className="text-[10px] uppercase font-bold text-neon-pink bg-neon-pink/10 px-2 py-0.5 rounded">
                              {prod.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="font-semibold text-white text-sm truncate">{prod.name}</h3>
                        <p className="font-bebas text-lg text-neon-green tracking-wider">
                          ${prod.price.toLocaleString('es-CO')}
                        </p>
                      </div>
                    </div>

                    {prod.description && (
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2">{prod.description}</p>
                    )}

                    <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-3">
                      <button
                        onClick={() => toggleProductAvailability(prod.id)}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white"
                      >
                        {prod.isAvailable ? (
                          <>
                            <ToggleRight size={18} className="text-neon-green" />
                            <span className="text-neon-green font-semibold">Disponible</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={18} className="text-red-500" />
                            <span className="text-red-400">Agotado</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(prod)}
                          className="p-1.5 text-gray-400 hover:text-neon-blue rounded-lg hover:bg-white/5 transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════ PESTAÑA 2: NEGOCIO (WHATSAPP & NEQUI) ════ */}
        {activeTab === 'business' && (
          <div className="max-w-2xl mx-auto bg-[#111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h2 className="font-bebas text-3xl text-neon-yellow tracking-wide mb-2">
              Configuración de Monky Drinks
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mb-6">
              Actualiza las líneas donde los clientes enviarán sus pedidos de WhatsApp y transferencias de Nequi.
            </p>

            <form onSubmit={handleSaveBusiness} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Nombre del Negocio</label>
                <input
                  type="text"
                  value={bizForm.name}
                  onChange={(e) => setBizForm({ ...bizForm, name: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-neon-pink outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Eslogan Principal</label>
                <input
                  type="text"
                  value={bizForm.slogan}
                  onChange={(e) => setBizForm({ ...bizForm, slogan: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-neon-pink outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neon-pink mb-1 flex items-center gap-1">
                    <Phone size={14} /> WhatsApp para Pedidos (Sin espacios)
                  </label>
                  <input
                    type="text"
                    value={bizForm.whatsappNumber}
                    onChange={(e) => setBizForm({ ...bizForm, whatsappNumber: e.target.value })}
                    className="w-full bg-black/60 border border-neon-pink/40 rounded-xl px-4 py-2.5 text-white font-mono font-bold focus:border-neon-pink outline-none"
                    placeholder="3118894341"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neon-yellow mb-1">
                    Número Nequi para Pagos
                  </label>
                  <input
                    type="text"
                    value={bizForm.nequiNumber}
                    onChange={(e) => setBizForm({ ...bizForm, nequiNumber: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono font-bold focus:border-neon-yellow outline-none"
                    placeholder="3118894341"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Ubicación / Dirección</label>
                  <input
                    type="text"
                    value={bizForm.address}
                    onChange={(e) => setBizForm({ ...bizForm, address: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-neon-pink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1 flex items-center gap-1">
                    <Clock size={14} /> Horario de Atención
                  </label>
                  <input
                    type="text"
                    value={bizForm.schedule}
                    onChange={(e) => setBizForm({ ...bizForm, schedule: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-neon-pink outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Instagram</label>
                <input
                  type="text"
                  value={bizForm.instagram}
                  onChange={(e) => setBizForm({ ...bizForm, instagram: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-neon-pink outline-none"
                  placeholder="@monky_fusion_drinks"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-4 rounded-xl bg-neon-pink hover:bg-[#e60073] text-white font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,184,0.4)] transition-all"
              >
                <Save size={18} />
                <span>Guardar Cambios de Monky</span>
              </button>
            </form>
          </div>
        )}

        {/* ════ PESTAÑA 3: SEGURIDAD (CONTRASEÑA) ════ */}
        {activeTab === 'security' && (
          <div className="max-w-md mx-auto bg-[#111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h2 className="font-bebas text-3xl text-neon-blue tracking-wide mb-2">
              Seguridad del Panel Monky
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mb-6">
              Cambia el usuario y la contraseña de acceso a este panel de administración.
            </p>

            <form onSubmit={handleSaveSecurity} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Usuario de Administrador</label>
                <input
                  type="text"
                  value={securityForm.user}
                  onChange={(e) => setSecurityForm({ ...securityForm, user: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-neon-blue outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Nueva Contraseña</label>
                <input
                  type="password"
                  value={securityForm.newPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-neon-blue outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  value={securityForm.confirmPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-neon-blue outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-xl bg-neon-blue hover:bg-blue-600 text-white font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,191,255,0.4)] transition-all"
              >
                <Save size={18} />
                <span>Actualizar Contraseña</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ════ MODAL PARA AGREGAR / EDITAR PRODUCTO CON PREVISUALIZACIÓN EN VIVO ════ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111111] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl my-8"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>

              <h3 className="font-bebas text-2xl text-neon-yellow mb-4">
                {editingProduct ? 'Editar Bebida / Michelada' : 'Nueva Bebida / Michelada'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Formulario */}
                <form onSubmit={handleSaveProduct} className="md:col-span-7 space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-gray-300 mb-1">Nombre del Producto</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:border-neon-pink outline-none"
                      placeholder="Ej: Monky Tropical Especial"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-300 mb-1">Precio ($ COP)</label>
                      <input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono focus:border-neon-pink outline-none"
                        placeholder="16000"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-300 mb-1">Categoría</label>
                      <input
                        type="text"
                        list="monky-categories"
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:border-neon-pink outline-none"
                        placeholder="Micheladas"
                        required
                      />
                      <datalist id="monky-categories">
                        <option value="Micheladas" />
                        <option value="Monky Enchiladas" />
                        <option value="Adicionales" />
                      </datalist>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-300 mb-1">Descripción / Ingredientes</label>
                    <textarea
                      rows={2}
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2 text-white focus:border-neon-pink outline-none"
                      placeholder="Ingredientes especiales o escarchado..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-300 mb-1">Badge (Opcional)</label>
                      <input
                        type="text"
                        value={productForm.badge}
                        onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2 text-white focus:border-neon-pink outline-none"
                        placeholder="Ej: Nuevo / Top"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-300 mb-1">URL o Foto</label>
                      <input
                        type="text"
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2 text-white focus:border-neon-pink outline-none"
                        placeholder="/Monky Mix.jpeg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-neon-pink hover:bg-[#e60073] text-white font-bold tracking-wider"
                    >
                      {editingProduct ? 'Actualizar' : 'Guardar Producto'}
                    </button>
                  </div>
                </form>

                {/* Previsualización en Vivo de la Tarjeta */}
                <div className="md:col-span-5 bg-black/60 p-4 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">
                    Previsualización en el Menú:
                  </span>
                  <div className="w-24 h-24 rounded-full bg-black border-2 border-neon-pink overflow-hidden mb-3 shadow-[0_0_20px_rgba(255,0,184,0.3)]">
                    <img
                      src={productForm.image || '/Monky Clasica.jpeg'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bebas text-2xl text-neon-yellow tracking-wide truncate max-w-full">
                    {productForm.name || 'Nombre del Producto'}
                  </h4>
                  <p className="font-bebas text-lg text-neon-green mt-1">
                    ${Number(productForm.price || 0).toLocaleString('es-CO')}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-2 line-clamp-2">
                    {productForm.description || 'Aquí aparecerá la descripción para el cliente.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
