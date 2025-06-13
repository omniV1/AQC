import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';

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

            {/* Blog page */}
            <Route path="/blog" element={
              <MainLayout>
                <BlogPage />
              </MainLayout>
            } />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
