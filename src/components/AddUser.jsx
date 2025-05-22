import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiAddUser } from "../Services/auth";

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    storeLocation: "",
    role: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [profileImage, setProfileImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { ...formData };
      const response = await apiAddUser(payload);
      console.log(response.data);

      toast.success("User Added Successful");
      navigate("/login");
    } catch (error) {
      toast.error("Adding Up Failed, Please try again");
      console.log(error);
    } finally {
      setLoading(false);
    }

    console.log("Form submitted:", formData);
    // Add form submit logic here
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-8 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">New User</h2>

        <div className="flex flex-row items-center justify-center mb-4">
          <div className="w-20 h-20 border-3 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-500 text-4xl">
          {profileImage? (<img
            src={URL.createObjectURL(profileImage)}
            alt="Prpfile Preview"
            className="w-full h-full object-cover border-1 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-500 text-4xl"
          />) :(<span>👤</span>)}
          
          </div>
          <div className="text-sm mt-2 ml-3">
            Drag image here <br />{" "}
            <span>
              <p className="flex items-center justify-center">or</p>
            </span>
            <label className="text-blue-500 cursor-pointer">Browse image <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])} className="hidden"/></label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center mb-3">
            <label className="w-60 text-lg font-semibold">User Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter supplier name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="flex items-center mb-3">
  <label className="w-60 text-lg font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="flex items-center mb-3">
  <label className="w-60 text-lg font-semibold">Store Location</label>
            <select
              name="storeLocation"
              value={formData.storeLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">Select Location</option>
              <option value="Accra">Accra</option>
              <option value="Kumasi">Kumasi</option>
              <option value="Tamale">Tamale</option>
            </select>
          </div>
<div className="flex items-center mb-3">
  <label className="w-60 text-lg font-semibold ">User Role</label>
            <select
              name="role"
              value={formData.userRole}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">Choose user role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Asset Manager</option>
              <option value="Staff">Viewer</option>
            </select>
          </div>
<div className="flex items-center mb-3">
  <label className="w-60 text-lg font-semibold">Email</label>
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

          <div className="flex justify-end space-x-2 mt-40">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-400"
              onClick={() =>
                setFormData({
                  fullName: "",
                  password: "",
                  storeLocation: "",
                  role: "",
                  email: "",
                })
              }
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white px-4 py-2 rounded-lg${
                loading ? "bg-gray-400" : "bg-blue-950 hover:bg-blue-600"
              } text-white text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out`}
            >
              {loading ? "Loading..." : "Add User"}
              {/* Add User */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
