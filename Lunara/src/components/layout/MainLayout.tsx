import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
); 