// components/NotificationDropdown.jsx
import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={bellRef}>
      <div
        className="flex items-center gap-2 mr-2 bg-white p-2 lg:p-3 rounded-full shadow-sm hover:shadow transition-shadow cursor-pointer"
        onClick={toggleDropdown}
      >
        <Bell className="text-gray-600 w-5 h-5" />
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50">
          <div className="px-4 py-3 border-b font-semibold text-gray-700">
            Notifications
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {/* Example notification items */}
            <li className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-600">
              New asset assigned to you
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-600">
              Maintenance request updated
            </li>
            {/* Add dynamic notifications here */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
