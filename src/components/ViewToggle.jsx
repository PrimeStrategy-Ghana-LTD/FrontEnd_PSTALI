// components/ViewToggle.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ViewToggle = ({ listViewRoute = '/assets', cardViewRoute = '/card-view' }) => {
  const location = useLocation();
  
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex">
      {/* List View Button */}
      <Link 
        to={listViewRoute}
        className={`flex items-center gap-2 px-3 py-1 rounded-l-sm border border-gray-300 cursor-pointer transition-colors ${
          isActiveRoute(listViewRoute) || (listViewRoute === '/assets' && location.pathname === '/')
            ? 'bg-[#051b34] text-white border-[#051b34]' 
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <span>📋</span> {/* Replace with your actual icon component */}
        <span>List View</span>
      </Link>
      
      {/* Card View Button */}
      <Link 
        to={cardViewRoute}
        className={`flex items-center gap-2 px-3 py-1 rounded-r-sm border border-gray-300 cursor-pointer transition-colors ${
          isActiveRoute(cardViewRoute)
            ? 'bg-[#051b34] text-white border-[#051b34]' 
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <span>🔲</span> {/* Replace with your actual icon component */}
        <span>Card View</span>
      </Link>
    </div>
  );
};

export default ViewToggle;

// Then in your AllAssets.js and CardView.js components:
// Import the component
import ViewToggle from '../components/ViewToggle';

// Replace the button section with:
<div className="flex text-[13px]">
  <button
    className="px-2 py-1 rounded-sm bg-[#051b34] text-white border border-[#051b34] mr-5"
    onClick={() => setIsAddModalOpen(true)}
  >
    Add Asset
  </button>
  
  {/* Use the reusable component */}
  <ViewToggle />
</div>