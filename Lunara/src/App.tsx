import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import AboutDoulaPage from './pages/AboutDoulaPage';

// Component to handle navigation logging
const NavigationLogger: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Navigated to: ${location.pathname}`);
  }, [location]);

  return null;
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
              {/* Only keeping the landing page route for now */}
              <Route path="/" element={
                <MainLayout>
                  <LandingPage />
                </MainLayout>
              } />

              {/* Blog post detail must come before list to avoid shadowing */}
              <Route path="/blog/:id" element={
                <MainLayout>
                  <BlogPostPage />
                </MainLayout>
              } />

              {/* Blog list page */}
              <Route path="/blog" element={
                <MainLayout>
                  <BlogPage />
                </MainLayout>
              } />

              {/* FAQ page */}
              <Route path="/faq" element={
                <MainLayout>
                  <FAQPage />
                </MainLayout>
              } />

              {/* About page */}
              <Route path="/about" element={
                <MainLayout>
                  <AboutPage />
                </MainLayout>
              } />

              {/* About Doula page */}
              <Route path="/about-doula" element={
                <MainLayout>
                  <AboutDoulaPage />
                </MainLayout>
              } />

              {/* Login page */}
              <Route path="/login" element={
                <MainLayout>
                  <LoginPage />
                </MainLayout>
              } />

              {/* Services page */}
              <Route path="/services" element={
                <MainLayout>
                  <ServicesPage />
                </MainLayout>
              } />

              {/* Contact page */}
              <Route path="/contact" element={
                <MainLayout>
                  <ContactPage />
                </MainLayout>
              } />

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
