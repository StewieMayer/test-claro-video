import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <h1 className="text-xl font-bold">Claro Video EPG</h1>
      </nav>
    </header>
  );
}
export default Header;