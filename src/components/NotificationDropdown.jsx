import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bell } from "lucide-react";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to detect outside clicks
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("https://backend-ps-tali.onrender.com/notifications/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Notification response:", res.data);

        const notifs = Array.isArray(res.data?.data) ? res.data.data : [];
        setNotifications(notifs);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  // 🔒 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-2 mr-2 bg-white p-2 lg:p-3 rounded-full shadow-sm hover:shadow transition-shadow"
      >
        <Bell />
        {notifications.some((n) => !n.isRead) && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded z-50">
          <div className="p-4 font-semibold border-b">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No notifications</div>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <li key={n.id} className="px-4 py-2 border-b hover:bg-gray-100 text-sm">
                  <div className="font-medium">{n.title}</div>
                  <div className="text-gray-600">{n.message}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
