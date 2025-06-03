import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiAddUser } from "../servicess/auth";



const AddUser = () => {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        storeLocation: "",
        role: "",
        email: "",
        phone: "",
        profile_picture: "",

    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [profile_picture, setProfile_picture] = useState(null)

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

            const response = await apiAddUser(formDataToSend);
            console.log(response.data);
            console.log(formDataToSend)

            toast.success("User Added Successfully");
            navigate("/");
        } catch (error) {
            console.log("Error:", error);
            if (error.response)
                console.log("Backend resonse:", error.response.data)
            toast.error(error.response.data.message || "Adding user failed.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">New User</h2>

                <div className="flex flex-row items-center justify-center mb-4">
                    <div className="w-20 h-20 border-3 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-500 text-4xl">
                        {profile_picture ? (<img
                            src={URL.createObjectURL(profile_picture)}
                            alt="Prpfile Preview"
                            className="w-full h-full object-cover border-1 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-500 text-4xl"
                        />) : (<span>👤</span>)}

                    </div>
                    <div className="text-sm mt-2 ml-3">
                        Drag image here <br />{" "}
                        <span>
                            <p className="flex items-center justify-center">or</p>
                        </span>
                        <label className="text-blue-500 cursor-pointer">Browse image <input
                            type="file"
                            name="profile_picture"
                            accept="image/*"
                            onChange={(e) => setProfile_picture(e.target.files[0])} className="hidden" /></label>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex items-center mb-3">
                        <label className="w-60 text-lg font-semibold">User Name</label>
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
                        <label className="w-60 text-lg font-semibold">Password</label>
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
                        <label className="w-60 text-lg font-semibold">Store Location</label>
                        <select
                            type="text"
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
                            type="text"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        >
                            <option value="">Choose user role</option>
                            <option value="adminstrator">Admin</option>
                            <option value="asset manager">Asset Manager</option>
                            {/* <option value="Staff">Viewer</option> */}
                        </select>
                    </div>
                    <div className="flex items-center mb-3">
                        <label className="w-60 text-lg font-semibold">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter user email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        />
                    </div>
                    <div className="flex items-center mb-3">
                        <label className="w-60 text-lg font-semibold">Contact Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter user email"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-2 mt-40">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg border border-gray-400"
                            onClick={() => {
                                setFormData({
                                    userName: "",
                                    password: "",
                                    storeLocation: "",
                                    role: "",
                                    email: "",
                                    phone: "",
                                    profile_picture: "",
                                })
                                setProfile_picture(null);

                            }}
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-950 hover:bg-blue-600"
                                }`}
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
