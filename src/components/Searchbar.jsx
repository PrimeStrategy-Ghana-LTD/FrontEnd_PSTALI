import React, { useEffect, useState } from 'react';
import { Menu, Bell, User } from 'lucide-react';
import axios from 'axios';

const Searchbar = ({ setSidebarOpen }) => {
  const [user, setUser] = useState(null);

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

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Mobile menu button */}
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setSidebarOpen && setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Right side - Notifications and user menu */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {/* User menu */}
            <div className="relative">
              <button className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
