import React, { useState, useEffect } from "react";
import { Search, Settings, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ClipboardCheck, Wrench, UserCircle } from "lucide-react";
import { MdOutlineContactPage } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineSettings } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import icon from "../assets/images/icon.png";
import icon2 from "../assets/images/Icon2.png";
import useLocationName from "../hooks/useLocationName";
import AdvancedSearchModal from "./AdvancedSearchModal";
import NotificationDropdown from "../components/NotificationDropdown";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("Assets");
  const [searchTerm, setSearchTerm] = useState("");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { getLocationName } = useLocationName();
  const [showModal, setShowModal] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [unreadApprovalCount, setUnreadApprovalCount] = useState(0);

  const navigate = useNavigate();

  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "https://backend-ps-tali.onrender.com/notifications/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNotifications(data);

      // Count pending approvals
      const pendingCount = data.filter(
        (notification) =>
          notification.type === "approval" && notification.status === "pending"
      ).length;
      setPendingApprovalsCount(pendingCount);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setNotificationsLoading(false);
    }
  };

  // Fetch notifications when component mounts and when dropdown is opened
  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (notificationDropdownOpen) {
      fetchNotifications();
    }
  }, [notificationDropdownOpen]);

  const dropdownRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setProfileLoading(false);
      setProfilePicture(null); // Or set to actual profile image URL
    }, 1000);
  }, []);

  const fetchUnreadApprovalCount = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "https://backend-ps-tali.onrender.com/notifications/unread-count",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Adjust this based on the response structure
      // For example: { unreadCount: 4 } or just a number
      const count = data.unreadCount || data.count || data || 0;
      setUnreadApprovalCount(count);
    } catch (err) {
      console.error("Error fetching unread approval count:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false); // or whichever dropdown this was for
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to fetch user profile picture
  const fetchProfilePicture = async () => {
    setProfileLoading(true);
    setProfileError(null);

    try {
      // Get user ID from localStorage, sessionStorage, or context
      const userId =
        localStorage.getItem("userId") || sessionStorage.getItem("userId");

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(
        `https://backend-ps-tali.onrender.com/user/profile/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add authorization header if you use tokens
            Authorization: `Bearer ${
              localStorage.getItem("token") || sessionStorage.getItem("token")
            }`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();

      // Extract profile picture URL from response
      // Adjust these property names based on your API response structure
      const profilePicUrl =
        userData.profilePicture ||
        userData.profile_picture ||
        userData.avatar ||
        userData.image ||
        userData.photo ||
        userData.user?.profilePicture ||
        userData.data?.profilePicture;

      setProfilePicture(profilePicUrl);
    } catch (err) {
      console.error("Error fetching profile picture:", err);
      setProfileError("Failed to load profile picture");
      // Set to null so default avatar shows
      setProfilePicture(null);
    } finally {
      setProfileLoading(false);
    }
  };

  // Function to fetch assets from your API
  const fetchAssets = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://backend-ps-tali.onrender.com/assets"
      ); // Replace with your actual endpoint

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Process the API response to keep full asset objects
      let processedAssets = [];

      if (Array.isArray(data)) {
        // Keep full objects or convert strings to objects
        processedAssets = data.map((item) => {
          if (typeof item === "string") {
            return { name: item, id: item.toLowerCase().replace(/\s+/g, "-") };
          }
          // Keep the full object and ensure it has required properties
          return {
            id:
              item.id ||
              item._id ||
              item.assetId ||
              item.name?.toLowerCase().replace(/\s+/g, "-"),
            name: item.name || item.title || item.assetName || "Unknown Asset",
            ...item, // Keep all other properties
          };
        });
      } else if (data && typeof data === "object") {
        // Process nested arrays while keeping full objects
        if (Array.isArray(data.assets)) {
          processedAssets = data.assets.map((item) => ({
            id:
              item.id ||
              item._id ||
              item.assetId ||
              item.name?.toLowerCase().replace(/\s+/g, "-"),
            name: item.name || item.title || item.assetName || "Unknown Asset",
            ...item,
          }));
        } else if (Array.isArray(data.data)) {
          processedAssets = data.data.map((item) => ({
            id:
              item.id ||
              item._id ||
              item.assetId ||
              item.name?.toLowerCase().replace(/\s+/g, "-"),
            name: item.name || item.title || item.assetName || "Unknown Asset",
            ...item,
          }));
        } else if (Array.isArray(data.results)) {
          processedAssets = data.results.map((item) => ({
            id:
              item.id ||
              item._id ||
              item.assetId ||
              item.name?.toLowerCase().replace(/\s+/g, "-"),
            name: item.name || item.title || item.assetName || "Unknown Asset",
            ...item,
          }));
        } else {
          // Convert object values to asset objects
          processedAssets = Object.values(data)
            .filter(
              (item) =>
                typeof item === "string" ||
                (typeof item === "object" && item !== null)
            )
            .map((item) => {
              if (typeof item === "string") {
                return {
                  name: item,
                  id: item.toLowerCase().replace(/\s+/g, "-"),
                };
              }
              return {
                id:
                  item.id ||
                  item._id ||
                  item.assetId ||
                  item.name?.toLowerCase().replace(/\s+/g, "-"),
                name:
                  item.name || item.title || item.assetName || "Unknown Asset",
                ...item,
              };
            });
        }
      }

      setAssets(processedAssets);
    } catch (err) {
      console.error("Error fetching assets:", err);
      setError("Failed to load assets");
      // Fallback to dummy data on error (optional)
      setAssets([
        {
          id: "laptop-dell-xps",
          name: "Laptop - Dell XPS",
          category: "Electronics",
          status: "Available",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch assets and profile picture when component mounts
  useEffect(() => {
    fetchAssets();
    fetchUserInfo();
    fetchUnreadApprovalCount(); // <--- Add this here
  }, []);

  // Filter assets based on search term (with safety check)
  const filteredAssets = Array.isArray(assets)
    ? assets.filter(
        (asset) =>
          asset &&
          asset.name &&
          asset.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const fetchUserInfo = async () => {
    setProfileLoading(true);
    setProfileError(null);

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(
        "https://backend-ps-tali.onrender.com/users/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserInfo(data);

      // If there's a profile picture, set it
      const profilePic = data.profilePicture || data.avatar || null;
      setProfilePicture(profilePic);
    } catch (err) {
      console.error("Error fetching user info:", err);
      setProfileError("Failed to load user info");
      setProfilePicture(null);
    } finally {
      setProfileLoading(false);
    }
  };

  // Function to handle asset selection and navigation
  const handleAssetClick = (asset) => {
    // Store the complete asset data in sessionStorage for the view page
    sessionStorage.setItem("selectedAsset", JSON.stringify(asset));

    // Navigate to view page with asset ID
    navigate(`/dashboard/assets/view-asset/${asset.id}`);
  };

  const profileRef = useRef();
  const bellRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      // If click is outside both profile and bell dropdowns
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        profileDropdownOpen
      ) {
        setProfileDropdownOpen(false);
      }

      if (
        bellRef.current &&
        !bellRef.current.contains(e.target) &&
        notificationDropdownOpen
      ) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileDropdownOpen, notificationDropdownOpen]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Assets") {
      navigate("/dashboard/assets");
    } else if (tab === "Advanced Search") {
      setShowModal(true); // Open modal
    }
  };

  const handleLogout = () => {
    // Clear localStorage and/or sessionStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    sessionStorage.clear(); // Optional: clears everything in sessionStorage

    // Navigate to home page
    navigate("/");
  };

  return (
    <div className="p-5 lg:px-8 xl:px-12 2xl:px-16 min-h-screen bg-[#051b34]">
      {/* Container for max width on very large screens */}
      <div className="mx-auto max-w-7xl">
        {/* User and Notification Icons */}
        <div className="fixed top-0 right-0 z-50 flex items-center gap-4 p-2 bg-[#051b34]">
          <div className="flex items-center gap-4">
            <div className="relative" ref={bellRef}>
              {/* <div
                className="flex items-center gap-2 mr-2 bg-white p-2 lg:p-3 rounded-full shadow-sm hover:shadow transition-shadow cursor-pointer"
                onClick={() => {
                  setNotificationDropdownOpen((prev) => !prev);
                  setProfileDropdownOpen(false); // close profile if open
                }}
              >
                <Bell className="text-gray-500" size={20} />
                {pendingApprovalsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {pendingApprovalsCount}
                  </span>
                )}
              </div> */}
              <NotificationDropdown />

              {/* {notificationDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 h-[40vh] w-[15vw]">
                  <p className="text-gray-800 font-semibold mb-2 border-b-[0.5px] border-gray-200">
                    Notifications
                  </p>
                  <ul className="text-md text-gray-700 space-y-2 ">
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded">
                      <img src={icon} alt="" />
                      <Link to="/dashboard/approvals" className="relative flex items-center gap-2 text-black">
                        Pending Approvals
                        {unreadApprovalCount > 0 && (
                          <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {unreadApprovalCount}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded">
                      <img src={icon} alt="" />
                      <span>Asset Update</span>
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded">
                      <img src={icon2} alt="" />
                      <span>Profile Update</span>
                    </li>
                  </ul>
                </div>
              )} */}
            </div>

            <div className="flex items-center gap-2 relative" ref={profileRef}>
              <div
                className="relative h-10 w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setProfileDropdownOpen((prev) => !prev);
                  setNotificationDropdownOpen(false);
                }}
              >
                {profileLoading ? (
                  <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                    ...
                  </div>
                ) : profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserCircle
                    size={32}
                    className="text-gray-500 mx-auto mt-[5px]"
                  />
                )}
              </div>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-76 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 h-[43vh] w-[15vw] space-y-1.5">
                  {userInfo ? (
                    <>
                      <div className=" text-gray-800 font-bold">
                        {userInfo.userName}
                      </div>
                      <div className="text-sm text-gray-600 border-b-[0.5px] border-gray-300">
                        {userInfo.role}
                      </div>

                      <p className="flex items-center gap-1 text-sm">
                        <MdOutlineEmail /> {userInfo.email}
                      </p>
                      <p className="flex items-center gap-1 text-sm">
                        <MdOutlineContactPage /> {userInfo.phone}
                      </p>
                      <p className="flex items-center gap-1 text-sm">
                        <MdOutlineLocationOn />{" "}
                        {getLocationName(userInfo.storeLocation)}
                      </p>

                      <p className="border-b-[0.5px] border-gray-300"></p>
                      <div className="flex text-sm gap-1">
                        <p className="mt-1">
                          <VscAccount />
                        </p>
                        <Link>Account</Link>
                      </div>
                      <div className="flex text-sm gap-1">
                        <p className="mt-1">
                          <MdOutlineSettings />
                        </p>
                        <Link to="/dashboard/settings">Settings</Link>
                      </div>
                      <p className="border-b-[0.5px] border-gray-300"></p>
                      <button
                        onClick={handleLogout}
                        className=" w-full text-red-500 hover:text-red-600  px-4 py-2 rounded-md text-sm transition-colors"
                      >
                        <LuLogIn className="inline-block mr-1" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">
                      User info not available
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logo - Responsive sizing */}
        <div className="">
          <div className="flex flex-row items-center justify-center mt-12 lg:mt-16 xl:mt-20 2xl:mt-24">
            <p className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold text-white">
              TALI
            </p>
            <p className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-[#01fe9d]">
              .
            </p>
          </div>

          {/* Search Bar - Better responsive behavior */}
          <div className="relative flex justify-center mb-8 lg:mb-12 mt-8 lg:mt-12">
            <div className="border-2 border-white w-full max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl h-12 lg:h-14 xl:h-16 rounded-4xl flex flex-row items-center px-4 lg:px-6 gap-2 lg:gap-3 focus-within:shadow-md transition-all bg-white relative z-10">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder={loading ? "Loading assets..." : "Search Assets"}
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm lg:text-base xl:text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Suggestions Box - Matching search bar width */}
            {searchTerm && filteredAssets.length > 0 && showSuggestions && (
              <div className="absolute top-full mt-2 w-full max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl bg-white rounded-lg shadow-lg z-100 p-2 ">
                <div className="flex justify-end mb-2">
                  <button
                    className="text-sm text-red-500 hover:text-red-600"
                    onClick={() => setShowSuggestions(false)}
                  >
                    Close ✕
                  </button>
                </div>
                {filteredAssets.slice(0, 8).map((asset, idx) => (
                  <div
                    key={asset.id || idx}
                    onClick={() => handleAssetClick(asset)}
                    className="p-2 lg:p-3 hover:bg-gray-100 rounded-md cursor-pointer text-gray-700 text-sm lg:text-base border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{asset.name}</span>
                      {asset.category && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {asset.category}
                        </span>
                      )}
                    </div>
                    {asset.status && (
                      <div className="text-xs text-gray-500 mt-1">
                        Status: {asset.status}
                      </div>
                    )}
                  </div>
                ))}
                {filteredAssets.length > 8 && (
                  <div className="p-2 lg:p-3 text-gray-500 text-xs lg:text-sm text-center border-t">
                    +{filteredAssets.length - 8} more results
                  </div>
                )}
              </div>
            )}

            {/* No results message */}
            {searchTerm && filteredAssets.length === 0 && !loading && (
              <div className="absolute top-full mt-2 w-full max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl bg-white rounded-lg shadow-lg z-20 p-4">
                <p className="text-gray-500 text-sm lg:text-base text-center">
                  No assets found
                </p>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="absolute top-full mt-2 w-full max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl bg-white rounded-lg shadow-lg z-20 p-4">
                <p className="text-red-500 text-sm lg:text-base text-center">
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* Tabs - Better spacing on larger screens */}
          <>
            {/* Tab Section */}
            <div className="flex justify-center mb-8 lg:mb-10">
              <div className="flex space-x-8 lg:space-x-16 xl:space-x-20">
                {["Assets", "Advanced Search"].map((tab) => (
                  <p
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`text-base lg:text-lg xl:text-xl font-medium cursor-pointer transition-colors hover:text-[#01fe9d] ${
                      activeTab === tab
                        ? "text-white pb-1 border-b-2 border-white"
                        : "text-white"
                    }`}
                  >
                    {tab}
                  </p>
                ))}
              </div>
            </div>

            {/* Modal */}
            {showModal && (
              <AdvancedSearchModal
                onClose={() => setShowModal(false)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
          </>
        </div>

        {/* Settings - Positioned better on larger screens */}
      </div>
    </div>
  );
};

export default SearchPage;
