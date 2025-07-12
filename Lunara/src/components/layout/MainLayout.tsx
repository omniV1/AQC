import React from "react";
import Header from "./Header";
import { Footer } from "./Footer";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-[#FAF7F2] overflow-x-hidden relative">
    <div className="relative z-50">
      <Header />
    </div>
    <main className="relative">
      {children}
    </main>
    <Footer />
  </div>
); 