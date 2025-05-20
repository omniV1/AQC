import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import { ProviderLogin } from './components/auth/ProviderLogin';
import { ClientLogin } from './components/auth/ClientLogin';
import { RegisterClient } from './components/auth/RegisterClient';
import { ProviderRegistration } from './components/auth/ProviderRegistration';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import MainLayout from './components/layout/MainLayout';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';

// Component to handle navigation logging
const NavigationLogger: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Navigated to: ${location.pathname}`);
  }, [location]);

  return null; // This component does not render anything
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <NavigationLogger />
        <div className="min-h-screen flex flex-col bg-white">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          
          <main className="flex-grow">
            <Routes>
              {/* Routes using MainLayout (includes Header and Footer) */}
              <Route element={<MainLayout />}>
                {/* Landing Page Route now also uses MainLayout */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/provider/login" element={<ProviderLogin />} />
                <Route path="/provider/register" element={<ProviderRegistration />} />
                <Route path="/client/login" element={<ClientLogin />} />
                <Route path="/client/register" element={<RegisterClient />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Provider Routes */}
                <Route
                  path="/provider/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['PROVIDER', 'ADMIN']}>
                      <ProviderDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Client Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['CLIENT']}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
