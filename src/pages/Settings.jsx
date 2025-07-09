import React, { useEffect, useState } from "react";
import axios from "axios";
import useLocationName from "../hooks/useLocationName";

const Settings = () => {
  const [user, setUser] = useState(null);
  const { getLocationName } = useLocationName();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://backend-ps-tali.onrender.com/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <div className="flex justify-end gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600" />
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
        </label>
        <span className="text-sm font-semibold">Dark Mode</span>
      </div>
      {/* Profile & Password */}
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Profile Card */}
        <div className="bg-white rounded-sm shadow-sm p-6 w-[35%]">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
              {user && user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-xl">👤</span>
              )}
            </div>
            <p className="font-medium">
              {user ? user.userName || "No Name" : "Loading..."}
            </p>
          </div>
          <div className="text-sm space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span className="font-semibold">Role:</span>
              <span>{user ? user.role || "N/A" : "Loading..."}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Store Location:</span>
              <span>{getLocationName(user ? user.storeLocation || "N/A" : "Loading...")}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phone Number:</span>
              <span>{user ? user.phone || "N/A" : "Loading..."}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{user ? user.email || "N/A" : "Loading..."}</span>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-sm shadow-sm p-6 w-[45%]">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-40 text-sm">Password</label>
              <input
                type="password"
                className="flex-1 border border-gray-400 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter old password"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-40 text-sm">New Password</label>
              <input
                type="password"
                className="flex-1 border border-gray-400 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter new password"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-40 text-sm">Confirm Password</label>
              <input
                type="password"
                className="flex-1 border border-gray-400 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Confirm password"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Card */}
      <div className="w-full flex justify-center">
        <div className="bg-white rounded-sm shadow-sm p-6 w-full md:w-[55%]">
          <div className=" items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Security</h2>
            <div className="flex items-center gap-12 mt-3">
              <span className="text-sm">Two Factor Authentication</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600" />
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            {/* Phone Number */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="w-40 text-sm">Phone Number</label>
              <input
                type="text"
                className="border border-gray-400 px-4 py-2 rounded-md w-[223px]"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Email with Send */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="w-40 text-sm">Email</label>
              <div className="flex w-[300px] gap-2">
                <input
                  type="text"
                  className="border border-gray-400 px-4 py-2 rounded-md flex-1 w-[]"
                  placeholder="Enter your email"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Send
                </button>
              </div>
            </div>

            {/* Email with Submit */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="w-40 text-sm">Email</label>
              <div className="flex w-full md:w-[300px] gap-2">
                <input
                  type="text"
                  className="border border-gray-400 px-4 py-2 rounded-md flex-1"
                  placeholder="Enter your email"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
