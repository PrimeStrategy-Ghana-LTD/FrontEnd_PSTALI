import React, { useState } from 'react';
import logo from "../assets/images/tali-logo.png";
import { useNavigate } from 'react-router-dom';
import { apiSignin } from '../servicess/auth';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // added

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // set loading to true when submitting

    try {
      const response = await apiSignin({ email, password });
      console.log(response.data);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/search");
        }, 0);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Incorrect email or password.");
    } finally {
      setLoading(false); // reset loading whether success or fail
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <img src={logo} alt="Company Logo" className="max-w-xs md:max-w-md w-full" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Company Logo" className="h-16" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Log in to your account</h1>
          <p className="text-gray-600 mb-8 text-[13px] text-center">Welcome! Please enter your details</p>

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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="Enter your password"
                required
              />
              {/* Password visibility toggle removed as in original */}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </a>
              </div>
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
  );
};

export default LoginPage;
