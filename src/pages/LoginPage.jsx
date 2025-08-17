import React, { useState } from 'react';
import logo from "../assets/images/tali-logo.png";
import { useNavigate } from 'react-router-dom';
import { apiSignin, getUserRole } from '../servicess/auth';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await apiSignin({ email, password });

      if (response.status === 200) {
        // Store the token first
        localStorage.setItem("token", response.data.accessToken);
        
        // Get user role from the token or response
        let userRole = null;
        
        // Try to get role from response first
        if (response.data.user && response.data.user.role) {
          userRole = response.data.user.role;
        } else if (response.data.role) {
          userRole = response.data.role;
        } else {
          // If not in response, try to decode from token
          userRole = getUserRole();
        }

        toast.success("Login successful!", { position: "top-right", autoClose: 2000 });
        
        // Role-based redirection
        if (userRole === 'administrator') {
          // Admin and Asset Manager go to dashboard
          navigate("/dashboard");
        } else {
          // Asset manager and users (viewer or any other role) go to search page
          navigate("/search");
        }
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 justify-center items-center px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl rounded-lg overflow-hidden bg-white">
        {/* Logo Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
          <img src={logo} alt="Company Logo" className="w-full max-w-xs lg:max-w-sm xl:max-w-md" />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 xl:px-16 2xl:px-24">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-8 hidden lg:flex ">
              <img src={logo} alt="Company Logo" className="h-16" />
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Log in to your account</h1>
            <p className="text-gray-600 mb-8 text-sm text-center">Welcome! Please enter your details</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="Enter your password"
                  required
                />
                <div
                  className="absolute top-9 right-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#051b34] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// Also update your App.jsx to include the unauthorized route:
/*
Add this route in your router configuration in App.jsx:

{
  path: "/unauthorized",
  element: <UnauthorizedPage />,
},

And update your ProtectedRoute component calls to properly check roles:

// For routes that should only be accessible to admins
{
  path: "users",
  element: (
    <ProtectedRoute allowedRoles={["administrator"]} userRole={getUserRole()}>
      <AllUsers />
    </ProtectedRoute>
  ),
},

// For routes that should be accessible to admins and asset managers
{
  path: "manage-location",
  element: (
    <ProtectedRoute allowedRoles={["administrator", "assetManager"]} userRole={getUserRole()}>
      <ManageStore />
    </ProtectedRoute>
  ),
},

// For routes accessible to all authenticated users
{
  path: "assets",
  element: (
    <ProtectedRoute>
      <AllAssets />
    </ProtectedRoute>
  )
},
*/