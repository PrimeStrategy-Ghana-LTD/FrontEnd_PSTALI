import React, { useEffect, useRef, useState } from 'react';
import { Menu, Bell, User, LogOut, Settings } from 'lucide-react';
import axios from 'axios';
import icon from "../assets/images/icon.png";
import icon2 from "../assets/images/Icon2.png";
import { Link } from 'react-router-dom';

const Searchbar = ({ setSidebarOpen }) => {
  const [user, setUser] = useState(null);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const bellRef = useRef(null);
  const profileRef = useRef(null);

  // Fetch user
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          'https://backend-ps-tali.onrender.com/users/me',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUsername();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setSidebarOpen && setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Notifications */}
            <div className="relative" ref={bellRef}>
              <div
                className="flex items-center gap-2 mr-2 bg-white p-2 lg:p-3 rounded-full shadow-sm hover:shadow transition-shadow cursor-pointer"
                onClick={() => setNotificationDropdownOpen((prev) => !prev)}
              >
                <Bell className="text-gray-500" size={20} />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </div>

              {notificationDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 h-[40vh] w-[15vw]">
                  <p className="text-gray-800 font-semibold mb-2 border-b-[0.5px] border-gray-200">
                    Notifications
                  </p>
                  <ul className="text-md text-gray-700 space-y-2">
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded">
                      <img src={icon} alt="icon" className="w-8 h-8" />
                      <Link to='/dashboard/approvals'>Pending Approvals</Link>
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded">
                      <img src={icon} alt="icon" className="w-8 h-8" />
                      <span>Asset Update</span>
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded">
                      <img src={icon2} alt="icon2" className="w-8 h-8" />
                      <span>Profile Update</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
              >
                <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                  {user && user.profilePicture ? (
                    <img
                      src={
                        user.profilePicture.startsWith('http')
                          ? user.profilePicture
                          : `https://backend-ps-tali.onrender.com${user.profilePicture}`
                      }
                      alt="User Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                <span className="hidden md:block text-gray-700 font-medium">
                  {user ? user.fullName || user.userName : 'Loading...'}
                </span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="py-1 text-sm text-gray-700">
                    <li>
                      <a
                        href="/dashboard/settings"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                      >
                        <User  className="h-4 w-4 mr-2 text-gray-500" />
                        Account
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
