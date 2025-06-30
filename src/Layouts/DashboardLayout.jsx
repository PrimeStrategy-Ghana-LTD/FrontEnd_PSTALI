// DashboardLayout.jsx
import React, { useState } from 'react';
import Searchbar from '../components/Searchbar';
import { Outlet } from 'react-router-dom';
import Sidebar1 from '../components/Sidebar1';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar1 setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Header */}
        <div className="fixed top-0 right-0 left-0 lg:left-64 z-30 bg-white shadow-sm">
          <Searchbar setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Main content - scrollable */}
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-20">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;