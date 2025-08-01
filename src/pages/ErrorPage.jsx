// src/pages/ErrorPage.jsx
import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import logo from "../assets/images/white-tali-logo.png";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError(); // This hook gets error info from React Router

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  // Determine error message based on error type
  const getErrorMessage = () => {
    if (error?.status === 404) {
      return "The page you're looking for doesn't exist.";
    }
    if (error?.message) {
      return "Something went wrong. Please try again.";
    }
    return "Please return to the search page or the Dashboard";
  };

  const getErrorTitle = () => {
    if (error?.status === 404) {
      return "PAGE NOT FOUND";
    }
    return "PAGE UNDER CONSTRUCTION...";
  };

  return (
    <div className="min-h-screen bg-[#051b34] relative overflow-hidden">
      {/* Stars/dots pattern */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Logo in top right */}
      <div className="absolute top-8 right-8">
        <img 
          src={logo} 
          alt="TALI Logo" 
          className="h-20 w-auto" 
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            {getErrorTitle()}
          </h1>
          
          <p className="text-white text-lg mb-12 opacity-90">
            {getErrorMessage()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleHomeClick}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-full transition-colors duration-200 min-w-[120px]"
            >
              Home
            </button>
            <button
              onClick={handleSearchClick}
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold px-8 py-3 rounded-full transition-colors duration-200 min-w-[120px]"
            >
              Search
            </button>
            <button
              onClick={handleDashboardClick}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 rounded-full transition-colors duration-200 min-w-[120px]"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Construction tape with smooth looping animation */}
      <div className="absolute bottom-0 left-0 right-0 transform rotate-[-2deg] translate-y-4 overflow-hidden">
        <div className="bg-yellow-400 text-black font-bold py-3 px-4 whitespace-nowrap">
          <div className="inline-block animate-scroll">
            UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION | UNDER CONSTRUCTION |
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;