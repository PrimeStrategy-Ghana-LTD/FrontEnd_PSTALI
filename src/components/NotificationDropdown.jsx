import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bell, Trash2 } from "lucide-react";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "https://backend-ps-tali.onrender.com/notifications/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const notifs = Array.isArray(res.data?.data) ? res.data.data : [];
        setNotifications(notifs);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get(
        "https://backend-ps-tali.onrender.com/notifications/unread-count",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUnreadCount(res.data?.count || 0);
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  useEffect(() => {
    if (open) {
      fetchUnreadCount();
    }
  }, [open]);

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await axios.patch(
        "https://backend-ps-tali.onrender.com/notifications/mark-all-read",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(
        `https://backend-ps-tali.onrender.com/notifications/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove from UI
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));

      // Adjust unread count if needed
      const deletedNotif = notifications.find((n) => n.id === id);
      if (deletedNotif && !deletedNotif.isRead) {
        setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
      }
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const handleDeleteAllNotifications = async () => {
    try {
      await axios.delete("https://backend-ps-tali.onrender.com/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear local notifications and unread count
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to delete all notifications:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-2 mr-2 bg-white p-2 lg:p-3 rounded-full shadow-sm hover:shadow transition-shadow"
      >
        <Bell />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded z-50">
          <div className="flex items-center justify-between p-4 font-semibold border-b">
            <span>Notifications</span>
            <div className="flex flex-col items-end space-y-1">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={handleDeleteAllNotifications}
                  className="text-xs text-red-600 hover:underline"
                >
                  Delete all
                </button>
              )}
            </div>
          </div>
          {notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No notifications</div>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`group relative px-4 py-2 border-b hover:bg-gray-100 text-sm cursor-pointer ${
                    !n.isRead ? "bg-gray-50 font-semibold" : ""
                  }`}
                  onClick={async () => {
                    if (!n.isRead) {
                      try {
                        await axios.patch(
                          `https://backend-ps-tali.onrender.com/notifications/${n.id}/read`,
                          {},
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        setNotifications((prev) =>
                          prev.map((notif) =>
                            notif.id === n.id
                              ? { ...notif, isRead: true }
                              : notif
                          )
                        );
                        setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
                      } catch (err) {
                        console.error(
                          "Error marking notification as read:",
                          err
                        );
                      }
                    }
                  }}
                >
                  <div className="font-medium">{n.title}</div>
                  <div className="text-gray-600">{n.message}</div>

                  {/* 🗑️ Delete icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering read
                      handleDeleteNotification(n.id);
                    }}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600"
                    title="Delete notification"
                  >
                    <Trash2 size={16} />
                  </button>
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
