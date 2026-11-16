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
  UtensilsCrossed,
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
  Flame,
} from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';
import type { CatalogProduct } from '../../store/useCatalogStore';
import { useAuthStore } from '../../store/useAuthStore';
import AdminLoginCard from '../../components/admin/AdminLoginCard';
import MiCasaLogo from '../../components/micasa/MiCasaLogo';

export default function MiCasaAdminPage() {
  const { isMiCasaLoggedIn, loginMiCasa, logoutMiCasa, miCasaAuth, updateCredentials } = useAuthStore();

  const {
    miCasaBusiness,
    updateBusinessConfig,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,
    getProductsByBusiness,
    getCategoriesByBusiness,
  } = useCatalogStore();

  const products = getProductsByBusiness('micasa');
  const categories = getCategoriesByBusiness('micasa');

  // Si no está logueado, mostrar pantalla de Login
  if (!isMiCasaLoggedIn) {
    return <AdminLoginCard business="micasa" onLogin={loginMiCasa} />;
  }

  // Estados de interfaz
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
    name: miCasaBusiness.name,
    slogan: miCasaBusiness.slogan,
    whatsappNumber: miCasaBusiness.whatsappNumber,
    nequiNumber: miCasaBusiness.nequiNumber,
    address: miCasaBusiness.address,
    schedule: miCasaBusiness.schedule,
    deliveryInfo: miCasaBusiness.deliveryInfo,
    instagram: miCasaBusiness.instagram || '',
  });

  // Formulario de Producto
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: categories[0] || '🥩 Asados al Carbón',
    description: '',
    badge: '',
    image: '',
  });

  // Formulario de Seguridad
  const [securityForm, setSecurityForm] = useState({
    user: miCasaAuth.username,
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig('micasa', bizForm);
    showToast('¡Datos de Mi Casa Restaurante actualizados con éxito!');
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      price: '',
      category: categories[0] || '🥩 Asados al Carbón',
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
        image:
          productForm.image ||
          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
        business: 'micasa',
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
    updateCredentials('micasa', securityForm.user, securityForm.newPassword);
    showToast('¡Credenciales de Mi Casa actualizadas con éxito!');
    setSecurityForm({ ...securityForm, newPassword: '', confirmPassword: '' });
  };

  // Filtrado de productos
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
    <div className="min-h-screen bg-[#FFF8EF] text-[#292929] font-poppins pb-24 selection:bg-[#C9141E] selection:text-white">
      {/* ════ TOAST NOTIFICATION ════ */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#C9141E] text-white px-6 py-3 rounded-2xl shadow-xl shadow-red-950/30 flex items-center gap-2 font-bold text-sm"
          >
            <Check size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ TOP NAVBAR DEL PANEL RÚSTICO ════ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#C9141E]/15 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#5C3A21] transition-colors"
              title="Cambiar de negocio"
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 flex items-center justify-center">
                <MiCasaLogo size={38} showText={false} />
              </div>
              <div>
                <h1 className="font-lora text-lg sm:text-xl font-bold text-[#C9141E] leading-none flex items-center gap-2">
                  <span>MI CASA RESTAURANTE</span>
                  <span className="text-[10px] bg-[#C9141E] text-white font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                    Admin
                  </span>
                </h1>
                <p className="text-[10px] text-[#356B42] font-semibold">Panel de Asados & Almuerzos</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/mi-casa"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C9141E]/30 text-[#C9141E] text-xs font-bold hover:bg-[#C9141E] hover:text-white transition-all shadow-sm"
            >
              <Eye size={14} />
              <span className="hidden sm:inline">Ver Menú en Vivo</span>
            </Link>

            <button
              onClick={logoutMiCasa}
              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-[#C9141E] border border-red-200 transition-colors"
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
          <div className="bg-white border border-[#C9141E]/15 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs text-gray-500 font-medium">Platos Disponibles</p>
              <p className="font-lora text-2xl sm:text-3xl font-extrabold text-[#C9141E] mt-0.5">
                {activeCount} / {products.length}
              </p>
            </div>
            <div className="p-3 bg-red-50 text-[#C9141E] rounded-xl">
              <TrendingUp size={22} />
            </div>
          </div>

          <div className="bg-white border border-[#C9141E]/15 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs text-gray-500 font-medium">Categorías</p>
              <p className="font-lora text-2xl sm:text-3xl font-extrabold text-[#356B42] mt-0.5">
                {categories.length}
              </p>
            </div>
            <div className="p-3 bg-emerald-50 text-[#356B42] rounded-xl">
              <Flame size={22} />
            </div>
          </div>

          <div className="bg-white border border-[#C9141E]/15 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs text-gray-500 font-medium">WhatsApp Pedidos</p>
              <p className="font-mono text-sm sm:text-base font-bold text-[#292929] truncate mt-0.5">
                {miCasaBusiness.whatsappNumber}
              </p>
            </div>
            <div className="p-3 bg-emerald-50 text-[#356B42] rounded-xl">
              <Phone size={22} />
            </div>
          </div>

          <div className="bg-white border border-[#C9141E]/15 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs text-gray-500 font-medium">Nequi Pagos</p>
              <p className="font-mono text-sm sm:text-base font-bold text-[#C9141E] truncate mt-0.5">
                {miCasaBusiness.nequiNumber}
              </p>
            </div>
            <div className="p-3 bg-red-50 text-[#C9141E] rounded-xl">
              <Store size={22} />
            </div>
          </div>
        </div>
      </section>

      {/* ════ TABS DE NAVEGACIÓN ════ */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex border-b border-[#C9141E]/15 gap-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 font-semibold text-sm transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'products'
                ? 'border-[#C9141E] text-[#C9141E] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <UtensilsCrossed size={16} />
            <span>Asados & Platos ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('business')}
            className={`pb-3 font-semibold text-sm transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'business'
                ? 'border-[#356B42] text-[#356B42] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Store size={16} />
            <span>Datos del Restaurante (WhatsApp & Domicilios)</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 font-semibold text-sm transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'security'
                ? 'border-[#292929] text-[#292929] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <KeyRound size={16} />
            <span>Seguridad & Contraseña</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 mt-6">
        {/* ════ PESTAÑA 1: ASADOS & PLATOS ════ */}
        {activeTab === 'products' && (
          <div>
            {/* Barra de Filtros y Búsqueda */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-[#C9141E]/15 shadow-sm">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar asado, plato criollo o bebida..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#292929] focus:border-[#C9141E] outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 focus:border-[#C9141E] outline-none font-medium"
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
                  className="bg-[#C9141E] hover:bg-[#970D16] text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-950/20 transition-all whitespace-nowrap"
                >
                  <Plus size={16} />
                  <span>Agregar</span>
                </button>
              </div>
            </div>

            {/* Grid de Productos */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-sm">No se encontraron platos con ese criterio de búsqueda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className={`bg-white border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                      prod.isAvailable
                        ? 'border-gray-200 hover:border-[#C9141E]/40 shadow-sm hover:shadow-md'
                        : 'border-red-200 opacity-60 bg-gray-50'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-xl bg-amber-50 border border-gray-200 overflow-hidden shrink-0">
                        {prod.image ? (
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">🥩</div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] uppercase font-bold text-[#356B42] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            {prod.category}
                          </span>
                          {prod.badge && (
                            <span className="text-[10px] uppercase font-bold text-[#C9141E] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                              {prod.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="font-lora font-bold text-[#292929] text-sm truncate">{prod.name}</h3>
                        <p className="font-bold text-base text-[#C9141E]">
                          ${prod.price.toLocaleString('es-CO')}
                        </p>
                      </div>
                    </div>

                    {prod.description && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{prod.description}</p>
                    )}

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
                      <button
                        onClick={() => toggleProductAvailability(prod.id)}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900"
                      >
                        {prod.isAvailable ? (
                          <>
                            <ToggleRight size={18} className="text-[#356B42]" />
                            <span className="text-[#356B42] font-bold">Disponible</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={18} className="text-red-500" />
                            <span className="text-red-500 font-bold">Agotado</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(prod)}
                          className="p-1.5 text-gray-500 hover:text-[#C9141E] rounded-lg hover:bg-gray-100 transition-colors"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
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

        {/* ════ PESTAÑA 2: NEGOCIO (WHATSAPP & DOMICILIOS) ════ */}
        {activeTab === 'business' && (
          <div className="max-w-2xl mx-auto bg-white border border-[#C9141E]/15 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="font-lora text-3xl font-bold text-[#C9141E] tracking-tight mb-2">
              Configuración de Mi Casa Restaurante
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-6">
              Actualiza el número de WhatsApp al que llegan los pedidos y los datos de domicilios y horarios.
            </p>

            <form onSubmit={handleSaveBusiness} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-[#292929] mb-1">Nombre del Restaurante</label>
                <input
                  type="text"
                  value={bizForm.name}
                  onChange={(e) => setBizForm({ ...bizForm, name: e.target.value })}
                  className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-4 py-2.5 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#292929] mb-1">Eslogan Principal</label>
                <input
                  type="text"
                  value={bizForm.slogan}
                  onChange={(e) => setBizForm({ ...bizForm, slogan: e.target.value })}
                  className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-4 py-2.5 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#C9141E] mb-1 flex items-center gap-1">
                    <Phone size={14} /> WhatsApp para Pedidos (Sin espacios)
                  </label>
                  <input
                    type="text"
                    value={bizForm.whatsappNumber}
                    onChange={(e) => setBizForm({ ...bizForm, whatsappNumber: e.target.value })}
                    className="w-full bg-[#FFF8EF]/50 border border-red-300 rounded-xl px-4 py-2.5 text-[#292929] font-mono font-bold focus:border-[#C9141E] outline-none"
                    placeholder="3183630494"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#356B42] mb-1">
                    Número Transferencias (Nequi/Daviplata)
                  </label>
                  <input
                    type="text"
                    value={bizForm.nequiNumber}
                    onChange={(e) => setBizForm({ ...bizForm, nequiNumber: e.target.value })}
                    className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-4 py-2.5 text-[#292929] font-mono font-bold focus:border-[#C9141E] outline-none"
                    placeholder="3183630494"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#292929] mb-1">Ubicación / Dirección</label>
                  <input
                    type="text"
                    value={bizForm.address}
                    onChange={(e) => setBizForm({ ...bizForm, address: e.target.value })}
                    className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-4 py-2.5 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#292929] mb-1 flex items-center gap-1">
                    <Clock size={14} /> Horario de Atención
                  </label>
                  <input
                    type="text"
                    value={bizForm.schedule}
                    onChange={(e) => setBizForm({ ...bizForm, schedule: e.target.value })}
                    className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-4 py-2.5 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#356B42] mb-1">Texto de Domicilios</label>
                <input
                  type="text"
                  value={bizForm.deliveryInfo}
                  onChange={(e) => setBizForm({ ...bizForm, deliveryInfo: e.target.value })}
                  className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-4 py-2.5 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                  placeholder="🏠 Domicilio GRATIS"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-4 rounded-xl bg-[#C9141E] hover:bg-[#970D16] text-white font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-red-950/20 transition-all"
              >
                <Save size={18} />
                <span>Guardar Cambios de Mi Casa</span>
              </button>
            </form>
          </div>
        )}

        {/* ════ PESTAÑA 3: SEGURIDAD (CONTRASEÑA) ════ */}
        {activeTab === 'security' && (
          <div className="max-w-md mx-auto bg-white border border-[#C9141E]/15 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="font-lora text-3xl font-bold text-[#C9141E] tracking-tight mb-2">
              Seguridad del Panel Mi Casa
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-6">
              Modifica las credenciales de usuario y contraseña para ingresar a este panel.
            </p>

            <form onSubmit={handleSaveSecurity} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-[#292929] mb-1">Usuario de Administrador</label>
                <input
                  type="text"
                  value={securityForm.user}
                  onChange={(e) => setSecurityForm({ ...securityForm, user: e.target.value })}
                  className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-4 py-2.5 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#292929] mb-1">Nueva Contraseña</label>
                <input
                  type="password"
                  value={securityForm.newPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                  className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-4 py-2.5 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#292929] mb-1">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  value={securityForm.confirmPassword}
                  onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                  className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-4 py-2.5 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-xl bg-[#C9141E] hover:bg-[#970D16] text-white font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-red-950/20 transition-all"
              >
                <Save size={18} />
                <span>Actualizar Contraseña</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ════ MODAL PARA AGREGAR / EDITAR PLATO CON PREVISUALIZACIÓN EN VIVO ════ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl my-8 text-left"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>

              <h3 className="font-lora text-2xl font-bold text-[#C9141E] mb-4">
                {editingProduct ? 'Editar Asado / Plato' : 'Nuevo Asado / Plato Campestre'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Formulario */}
                <form onSubmit={handleSaveProduct} className="md:col-span-7 space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-[#292929] mb-1">Nombre del Plato</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                      placeholder="Ej: Churrasco Mi Casa (350g)"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#292929] mb-1">Precio ($ COP)</label>
                      <input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-[#292929] font-mono focus:border-[#C9141E] outline-none"
                        placeholder="34000"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#292929] mb-1">Categoría</label>
                      <input
                        type="text"
                        list="micasa-categories"
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                        placeholder="🥩 Asados al Carbón"
                        required
                      />
                      <datalist id="micasa-categories">
                        <option value="🥩 Asados al Carbón" />
                        <option value="🍲 Platos Criollos" />
                        <option value="🌽 Entradas & Picadas" />
                        <option value="🍹 Bebidas & Jugos" />
                      </datalist>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#292929] mb-1">Descripción / Acompañamientos</label>
                    <textarea
                      rows={2}
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-3.5 py-2 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                      placeholder="Papa salada, patacón crocante, guacamole..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#292929] mb-1">Badge (Opcional)</label>
                      <input
                        type="text"
                        value={productForm.badge}
                        onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                        className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-3.5 py-2 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                        placeholder="Ej: Recomendado"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#292929] mb-1">URL de Foto</label>
                      <input
                        type="text"
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full bg-[#FFF8EF]/50 border border-gray-200 rounded-xl px-3.5 py-2 text-[#292929] focus:border-[#C9141E] outline-none font-medium"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#C9141E] hover:bg-[#970D16] text-white font-bold tracking-wider"
                    >
                      {editingProduct ? 'Actualizar' : 'Guardar Plato'}
                    </button>
                  </div>
                </form>

                {/* Previsualización en Vivo de la Tarjeta Gastronómica */}
                <div className="md:col-span-5 bg-[#FFF8EF] p-4 rounded-2xl border border-gray-200 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#356B42] mb-2 block text-center">
                      Vista en el Menú:
                    </span>
                    <div className="w-full h-32 rounded-xl bg-amber-100 overflow-hidden mb-3 shadow-inner">
                      <img
                        src={
                          productForm.image ||
                          'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
                        }
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#356B42] bg-white px-2 py-0.5 rounded shadow-sm inline-block mb-1">
                      {productForm.category || 'Categoría'}
                    </span>
                    <h4 className="font-lora font-bold text-base text-[#292929] leading-snug truncate">
                      {productForm.name || 'Nombre del Plato'}
                    </h4>
                    <p className="font-bold text-sm text-[#C9141E] mt-0.5">
                      ${Number(productForm.price || 0).toLocaleString('es-CO')}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                      {productForm.description || 'Descripción del asado con acompañamientos.'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-[10px] text-[#356B42] font-semibold flex items-center gap-1">
                      <Flame size={12} className="text-[#C9141E]" /> Al Carbón
                    </span>
                    <span className="bg-[#C9141E] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase">
                      + Agregar
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
