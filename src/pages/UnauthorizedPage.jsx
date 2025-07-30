// src/pages/UnauthorizedPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/images/white-tali-logo.png"; // Using the white logo for dark background

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleSearchClick = () => {
    navigate('/search');
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
          {/* Logo in center (optional - you can remove this if you only want it in the corner) */}
          {/* <div className="mx-auto mb-8">
            <img 
              src={logo} 
              alt="TALI Logo" 
              className="h-20 w-auto mx-auto mb-4" 
            />
          </div> */}

          {/* Lock icon */}
          <div className="mx-auto mb-8 w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            ACCESS DENIED
          </h1>
          
          <p className="text-white text-lg mb-8 opacity-90">
            You don't have permission to view this section. Please contact your administrator if you believe this is an error.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleBackClick}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-full transition-colors duration-200 min-w-[120px]"
            >
              Go Back
            </button>
            <button
              onClick={handleDashboardClick}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 rounded-full transition-colors duration-200 min-w-[120px]"
            >
              Dashboard
            </button>
            <button
              onClick={handleSearchClick}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 min-w-[120px]"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Warning tape */}
      <div className="absolute bottom-0 left-0 right-0 transform rotate-[-2deg] translate-y-4 overflow-hidden">
        <div className="bg-red-500 text-white font-bold py-3 px-4 whitespace-nowrap">
          <div className="inline-block animate-scroll">
            UNAUTHORIZED ACCESS | UNAUTHORIZED ACCESS | UNAUTHORIZED ACCESS | UNAUTHORIZED ACCESS | UNAUTHORIZED ACCESS | UNAUTHORIZED ACCESS | UNAUTHORIZED ACCESS | UNAUTHORIZED ACCESS |
          </div>
        </div>
      </div>

      <style jsx>{`
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

export default UnauthorizedPage;