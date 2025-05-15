import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import { ProviderLogin } from './components/auth/ProviderLogin';
import { ClientLogin } from './components/auth/ClientLogin';
import { RegisterClient } from './components/auth/RegisterClient';
import { ProviderRegistration } from './components/auth/ProviderRegistration';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import Hero from './components/sections/Hero';
import Letter from './components/sections/Letter';
import lunaraLogo from './Assets/lunara logo.png';

const Navigation: React.FC = () => (
  <nav className="absolute top-0 left-0 right-0 z-50 py-4">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-center items-center">
        <img src={lunaraLogo} alt="Lunara" className="w-24 h-auto" />
      </div>
      <div className="flex justify-center space-x-12 mt-4">
        <a href="/about" className="text-[#2C3639] hover:text-[#A27B5C] transition-colors">About</a>
        <a href="/faq" className="text-[#2C3639] hover:text-[#A27B5C] transition-colors">FAQ</a>
        <a href="/blog" className="text-[#2C3639] hover:text-[#A27B5C] transition-colors">Blog</a>
        <a href="/login" className="text-[#2C3639] hover:text-[#A27B5C] transition-colors">Login</a>
      </div>
    </div>
  </nav>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
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
          
          {/* Show Header on all pages except home */}
          {window.location.pathname !== "/" && <Header />}
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Hero />
                  <Letter />
                </>
              } />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
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

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer shown on all pages */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
