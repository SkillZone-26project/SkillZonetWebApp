import React from 'react'

const Topbar = () => {
  return (
    <header className="h-[64px] bg-white border-b flex items-center justify-between px-6">
      
      <h3 className="font-semibold text-lg">Dashboard</h3>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Hello, Chidinma</span>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>

    </header>
  );
};

export default Topbar;
