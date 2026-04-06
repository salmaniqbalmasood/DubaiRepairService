
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

// Public Pages
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

// Service Landing Pages
import WashingMachineRepairPage from './pages/WashingMachineRepairPage.jsx';
import RefrigeratorRepairPage from './pages/RefrigeratorRepairPage.jsx';
import AirConditionerRepairPage from './pages/AirConditionerRepairPage.jsx';
import OvenRepairPage from './pages/OvenRepairPage.jsx';
import OvenCooktopRepairPage from './pages/OvenCooktopRepairPage.jsx';
import WasherDryerRepairPage from './pages/WasherDryerRepairPage.jsx';
import WaterHeaterRepairPage from './pages/WaterHeaterRepairPage.jsx';
import PaintRenovationPage from './pages/PaintRenovationPage.jsx';

// Admin
import { AdminAuthProvider } from './contexts/AdminAuthContext.jsx';
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import CompanySettingsPage from './pages/admin/CompanySettingsPage.jsx';
import TeamMembersPage from './pages/admin/TeamMembersPage.jsx';
import AdminServicesPage from './pages/admin/ServicesPage.jsx';
import TestimonialsPage from './pages/admin/TestimonialsPage.jsx';
import StatisticsPage from './pages/admin/StatisticsPage.jsx';
import CertificationsPage from './pages/admin/CertificationsPage.jsx';
import ContactInquiriesPage from './pages/admin/ContactInquiriesPage.jsx';

// New Admin Pages
import AdminImageManagementPage from './pages/admin/AdminImageManagementPage.jsx';
import AdminThemeSettingsPage from './pages/admin/AdminThemeSettingsPage.jsx';
import AdminLanguageTranslationsPage from './pages/admin/AdminLanguageTranslationsPage.jsx';
import AdminPagesManagementPage from './pages/admin/AdminPagesManagementPage.jsx';
import AdminSectionsManagementPage from './pages/admin/AdminSectionsManagementPage.jsx';
import AnnouncementSettingsPage from './pages/admin/AnnouncementSettingsPage.jsx';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <AdminAuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Service Landing Pages */}
              <Route path="/services/washing-machine-repair" element={<WashingMachineRepairPage />} />
              <Route path="/services/refrigerator-repair" element={<RefrigeratorRepairPage />} />
              <Route path="/services/air-conditioner-repair" element={<AirConditionerRepairPage />} />
              <Route path="/services/oven-repair" element={<OvenRepairPage />} />
              <Route path="/services/oven-cooktop-repair" element={<OvenCooktopRepairPage />} />
              <Route path="/services/washer-dryer-repair" element={<WasherDryerRepairPage />} />
              <Route path="/services/water-heater-repair" element={<WaterHeaterRepairPage />} />
              <Route path="/services/paint-renovation" element={<PaintRenovationPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              
              <Route path="/admin/*" element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="company-settings" element={<CompanySettingsPage />} />
                      <Route path="announcements" element={<AnnouncementSettingsPage />} />
                      <Route path="team-members" element={<TeamMembersPage />} />
                      <Route path="services" element={<AdminServicesPage />} />
                      <Route path="testimonials" element={<TestimonialsPage />} />
                      <Route path="statistics" element={<StatisticsPage />} />
                      <Route path="certifications" element={<CertificationsPage />} />
                      <Route path="contact-inquiries" element={<ContactInquiriesPage />} />
                      
                      {/* New Admin Routes */}
                      <Route path="images" element={<AdminImageManagementPage />} />
                      <Route path="theme" element={<AdminThemeSettingsPage />} />
                      <Route path="translations" element={<AdminLanguageTranslationsPage />} />
                      <Route path="pages" element={<AdminPagesManagementPage />} />
                      <Route path="sections" element={<AdminSectionsManagementPage />} />
                    </Routes>
                  </AdminLayout>
                </AdminProtectedRoute>
              } />
            </Routes>
          </AdminAuthProvider>
          <Toaster />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
