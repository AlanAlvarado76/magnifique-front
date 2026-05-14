import React from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layouts
import MainLayout from '../components/Layout/MainLayout';
import AdminLayout from '../components/Layout/AdminLayout';

// Pages
import HomePage from '../features/home/pages/HomePage';
import DressesCatalogPage from '../features/dresses/pages/DressesCatalogPage';
import DressDetailPage from '../features/dresses/pages/DressDetailPage';
import CategoriesPage from '../features/dresses/pages/CategoriesPage';
import PromotionsPage from '../features/promotions/pages/PromotionsPage';
import ContactPage from '../pages/ContactPage'; 
import AboutPage from '../pages/AboutPage'; 
import LoginPage from '../features/auth/pages/LoginPage';
import InventoryPage from '@/features/inventory/pages/InventoryPage';

// Admin Pages
import AddEditDressPage from '../features/inventory/pages/AddEditDressPage';
import AdminPromotionsPage from '../features/promotions/pages/AdminPromotionsPage';
import AddPromotionPage from '../features/promotions/pages/AddPromotionPage';
import ClientsPage from '@/features/clients/pages/ClientsPage';
import AddEditClientPage from '@/features/clients/pages/AddEditClientPage';
import AddRentalPage from '../features/rentals/pages/AddRentalPage';
import RentalsPage from '@/features/rentals/pages/RentalsPage';
import UsersPage from '../features/users/UsersPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';


const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      
      {/* Rutas Públicas */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<DressesCatalogPage />} />
        <Route path="/vestido/:id" element={<DressDetailPage />} />
        <Route path="/categoria" element={<CategoriesPage />} />
        <Route path="/promociones" element={<PromotionsPage />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboardPage />
        </ProtectedRoute>
      } />

      <Route element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin/inventario" element={<InventoryPage />} />
        <Route path="/admin/agregar-vestido" element={<AddEditDressPage />} />
        <Route path="/admin/editar-vestido/:id" element={<AddEditDressPage />} />
        <Route path="/admin/promociones" element={<AdminPromotionsPage />} />
        <Route path="/admin/promociones/nueva" element={<AddPromotionPage />} />
        <Route path="/admin/clientes" element={<ClientsPage />} />
        <Route path="/admin/clientes/nuevo" element={<AddEditClientPage />} />
        <Route path="/admin/clientes/editar/:id" element={<AddEditClientPage />} />
        <Route path="/admin/rentas/nueva" element={<AddRentalPage />} />
        <Route path="/admin/rentas/editar/:id" element={<AddRentalPage />} />
        <Route path='/admin/rentas' element={<RentalsPage/>}/>
        <Route path="/admin/usuarios" element={<UsersPage />} />

      </Route>

    </Routes>
  );
};

export default AppRoutes;