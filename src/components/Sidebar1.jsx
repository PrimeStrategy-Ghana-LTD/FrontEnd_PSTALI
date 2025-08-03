import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import logo from "../assets/images/white-tali-logo.png";
import Home from "../assets/images/Home.png";
import Assets from "../assets/images/Assets.png";
import Report from "../assets/images/Report.png";
import Log from "../assets/images/Log.png";
import Settings from "../assets/images/Settings.png";
import Manage from "../assets/images/Manage.png";
import Users from "../assets/images/Users.png";
import Order from "../assets/images/Order.png";
import Search from "../assets/images/Search.png";

const topItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard", exact: true },
  { label: "Assets", icon: Assets, path: "/dashboard/assets" },
  { label: "Reports", icon: Report, path: "/dashboard/reports" },
  { label: "Users", icon: Users, path: "/dashboard/users" },
  { label: "Asset Assignment", icon: Order, path: "/dashboard/assigned" },
  { label: "Approvals", icon: Order, path: "/dashboard/approvals" },
  { label: "Locations", icon: Manage, path: "/dashboard/manage-location" },
  { label: "Search", icon: Search, path: "/search" },
];

const Sidebar1 = ({ setSidebarOpen }) => {
  const handleNavClick = () => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    // Clear auth token and user info
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to login
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col h-full w-64 bg-[#051b34] border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 lg:justify-center">
        <Link to="/search" onClick={handleNavClick}>
          <img src={logo} alt="Logo" className="h-14 w-auto" />
        </Link>

        {/* Close button for mobile */}
        <button
          className="lg:hidden p-2 rounded-md text-white hover:bg-gray-700"
          onClick={() => setSidebarOpen && setSidebarOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-between px-4 pb-4">
        {/* Top navigation items */}
        <div className="space-y-2 mt-8">
          {topItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.exact}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`
              }
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-5 h-5 mr-3 flex-shrink-0"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(100%)',
                }}
              />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Bottom navigation items */}
        <div className="space-y-2">
          {/* Settings link */}
          <NavLink
            to="/dashboard/settings"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`
            }
          >
            <img
              src={Settings}
              alt="Settings"
              className="w-5 h-5 mr-3 flex-shrink-0"
              style={{
                filter: 'brightness(0) saturate(100%) invert(100%)',
              }}
            />
            <span className="truncate">Settings</span>
          </NavLink>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-3 text-sm font-medium text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <img
              src={Log}
              alt="Log Out"
              className="w-5 h-5 mr-3 flex-shrink-0"
              style={{
                filter: 'brightness(0) saturate(100%) invert(100%)',
              }}
            />
            <span className="truncate">Log Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar1;
