import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../assets/images/logo.png";
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
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Assets", icon: Assets, path: "/assets" },
  { label: "Reports", icon: Report, path: "/reports" },
  { label: "Users", icon: Users, path: "/add-user" },
  { label: "Assign", icon: Order, path: "/assign" },
  { label: "Manage Asset Location", icon: Manage, path: "/manage-location" },
  { label: "Search", icon: Search, path: "/search" },
];

const bottomItems = [
  { label: "Settings", icon: Settings, path: "/settings" },
  { label: "Log Out", icon: Log, path: "/logout" },
];

const Sidebar1 = () => {
  return (
    <div className='flex flex-col border-2 border-white w-[19vw] h-[900px] items-center justify-between py-6'>
      <div className="flex flex-col items-center w-full">
        <Link to="/dashboard"><img src={logo} alt="Logo" className='w-[60%]' /></Link>
        <div className='space-y-5 text-[14px] mt-12 text-gray-600 font-semibold w-full px-4'>
          {topItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 pb-2 ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`
              }
            >
              <img
                src={item.icon}
                alt={item.label}
                className='w-5 h-5'
                style={{
                  filter:
                    window.location.pathname === item.path
                      ? 'brightness(0) saturate(100%) invert(22%) sepia(91%) saturate(1581%) hue-rotate(201deg) brightness(90%) contrast(92%)'
                      : 'none',
                }}
              />
              <span className='ml-2'>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className='space-y-5 text-[14px] text-gray-600 font-semibold w-full px-4'>
        {bottomItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 pb-2 ${
                isActive ? 'text-blue-600' : 'text-gray-600'
              }`
            }
          >
            <img
              src={item.icon}
              alt={item.label}
              className='w-5 h-5'
              style={{
                filter:
                  window.location.pathname === item.path
                    ? 'brightness(0) saturate(100%) invert(22%) sepia(91%) saturate(1581%) hue-rotate(201deg) brightness(90%) contrast(92%)'
                    : 'none',
              }}
            />
            <span className='ml-2'>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar1;
