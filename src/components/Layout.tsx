import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Header />
      <main className="grow p-4 flex items-center justify-center text-white">
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default Layout;