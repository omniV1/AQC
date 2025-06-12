import React from "react";
import Header from "./Header";
import { Footer } from "./Footer";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-white overflow-x-hidden relative">
    <div className="relative z-50">
      <Header />
    </div>
    <main className="flex-grow relative">
      {children}
    </main>
    <Footer />
  </div>
); 