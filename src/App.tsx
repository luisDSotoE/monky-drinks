import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import LandingPage from './pages/LandingPage';
import MonkyDrinksPage from './pages/MonkyDrinksPage';
import MiCasaRestaurantePage from './pages/MiCasaRestaurantePage';
import AdminPortal from './pages/admin/AdminPortal';
import MonkyAdminPage from './pages/admin/MonkyAdminPage';
import MiCasaAdminPage from './pages/admin/MiCasaAdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* VISTAS PÚBLICAS DE CLIENTES (Con Navbar y Carrito Flotante) */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="monky-drinks" element={<MonkyDrinksPage />} />
          <Route path="mi-casa" element={<MiCasaRestaurantePage />} />
        </Route>

        {/* PANELES DE ADMINISTRACIÓN WEB INTEGRADOS EN EL CÓDIGO */}
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/admin/monky" element={<MonkyAdminPage />} />
        <Route path="/admin/micasa" element={<MiCasaAdminPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
