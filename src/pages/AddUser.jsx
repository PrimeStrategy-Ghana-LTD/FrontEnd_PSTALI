import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiAddUser } from "../servicess/auth";
import axios from "axios";

const AddUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    storeLocation: "",
    role: "",
    email: "",
    phone: "",
  });

  const [profile_picture, setProfile_picture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("https://backend-ps-tali.onrender.com/locations");
        // Make sure res.data is an array - if API sends {locations: [...]}, adjust accordingly
        if (Array.isArray(res.data)) {
          setLocations(res.data);
        } else if (Array.isArray(res.data.locations)) {
          setLocations(res.data.locations);
        } else {
          console.error("Locations data format unexpected:", res.data);
          setLocations([]);
        }
      } catch (err) {
        console.error("Failed to fetch locations", err);
        toast.error("Failed to load locations");
        setLocations([]);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userName", formData.userName);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("storeLocation", formData.storeLocation);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);

      if (profile_picture) {
        formDataToSend.append("profile_picture", profile_picture);
      }

      // Debug: log entries
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await apiAddUser(formDataToSend);
      console.log(response.data);

      toast.success("User Added Successfully");
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
      if (error.response) console.log("Backend response:", error.response.data);
      toast.error(error.response?.data?.message || "Adding user failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">New User</h2>

        <div className="flex flex-row items-center justify-center mb-4">
          <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-500 text-4xl">
            {profile_picture ? (
              <img
                src={URL.createObjectURL(profile_picture)}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span>👤</span>
            )}
          </div>
          <div className="text-sm mt-2 ml-3">
            Drag image here <br />
            <p className="text-center">or</p>
            <label className="text-blue-500 cursor-pointer">
              Browse image
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                onChange={(e) => setProfile_picture(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center mb-3">
            <label className="w-60 block text-md font-medium text-gray-700">User Name</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter supplier name"
              value={formData.userName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="flex items-center mb-3">
            <label className="w-60 block text-md font-medium text-gray-700">Password</label>
            <input
              type="text"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="flex items-center mb-3">
            <label className="w-60 block text-md font-medium text-gray-700">Store Location</label>
            <select
              name="storeLocation"
              value={formData.storeLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-500"
              required
              disabled={loadingLocations}
            >
              {loadingLocations ? (
                <option>Loading locations...</option>
              ) : (
                <>
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location._id || location.id} value={location._id || location.id}>
                      {location.name || location.location || location.title || "Unnamed Location"}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div className="flex items-center mb-3">
            <label className="w-60 block text-md font-medium text-gray-700">User Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-500"
              required
            >
              <option value="">Choose user role</option>
              <option value="administrator">Administrator</option>
              <option value="asset manager">Asset Manager</option>
            </select>
          </div>

          <div className="flex items-center mb-3">
            <label className="w-60 block text-md font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter user email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="flex items-center mb-3">
            <label className="w-60 block text-md font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              className="px-4 py-1 rounded-sm border border-gray-400"
              onClick={() => {
                setFormData({
                  userName: "",
                  password: "",
                  storeLocation: "",
                  role: "",
                  email: "",
                  phone: "",
                });
                setProfile_picture(null);
              }}
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 text-white text-md rounded-sm shadow-md transition duration-300 ease-in-out ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-600"
              }`}
            >
              {loading ? "Loading..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
