import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bell, Trash2 } from "lucide-react";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");
  const [unreadCount, setUnreadCount] = useState(0);

  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [targetId, setTargetId] = useState(null);

  const openConfirmModal = (type, id = null) => {
    setActionType(type);
    setTargetId(id);
    setShowConfirm(true);
  };

  const closeConfirmModal = () => {
    setShowConfirm(false);
    setActionType(null);
    setTargetId(null);
  };

  const confirmAction = async () => {
    try {
      if (actionType === "markAll") {
        await axios.patch(
          "https://backend-ps-tali.onrender.com/notifications/mark-all-read",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, isRead: true }))
        );
        setUnreadCount(0);
      } else if (actionType === "deleteAll") {
        await axios.delete("https://backend-ps-tali.onrender.com/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications([]);
        setUnreadCount(0);
      } else if (actionType === "deleteOne" && targetId) {
        await axios.delete(
          `https://backend-ps-tali.onrender.com/notifications/${targetId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotifications((prev) => prev.filter((n) => n.id !== targetId));
        const deletedNotif = notifications.find((n) => n.id === targetId);
        if (deletedNotif && !deletedNotif.isRead) {
          setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
        }
      }
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      closeConfirmModal();
    }
  };

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "https://backend-ps-tali.onrender.com/notifications/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotifications(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
      }
    };
    fetchNotifications();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get(
        "https://backend-ps-tali.onrender.com/notifications/unread-count",
        { headers: { Authorization: `Bearer ${token}` } }
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
    if (open) fetchUnreadCount();
  }, [open]);

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
                  onClick={() => openConfirmModal("markAll")}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={() => openConfirmModal("deleteAll")}
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
                        console.error("Error marking notification as read:", err);
                      }
                    }
                  }}
                >
                  <div className="font-medium">{n.title}</div>
                  <div className="text-gray-600">{n.message}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openConfirmModal("deleteOne", n.id);
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur flex items-center justify-center z-[9999]">
          <div className="bg-black text-white p-6 rounded shadow-lg max-w-sm w-full">
            <p className="text-sm mb-4">
              {actionType === "markAll" && "Are you sure you want to mark all notifications as read?"}
              {actionType === "deleteAll" && "Are you sure you want to delete all notifications?"}
              {actionType === "deleteOne" && "Are you sure you want to delete this notification?"}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeConfirmModal}
                className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
