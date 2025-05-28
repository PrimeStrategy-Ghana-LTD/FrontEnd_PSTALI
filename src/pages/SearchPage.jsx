import React, { useState } from 'react';
import { Search, Settings, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('Assets');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [assets] = useState([
    'Laptop - Dell XPS',
    'Laptop - Dell',
    'Laptop - XPS',
    'Laptop - DellPS',
    'Monitor - Samsung 24"',
    'Keyboard - Logitech',
    'Mouse - Razer',
    'Chair - Ergonomic',
    'Desk - Wooden',
  ]);

  const filteredAssets = assets.filter(asset =>
    asset.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 min-h-screen bg-[#009ed8]">
      {/* User and Notification Icons */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2 bg-white p-2 rounded-full shadow-sm hover:shadow transition-shadow">
            <Bell className="text-gray-500" size={20} />
          </div>
          <div className="flex items-center gap-2">
            <div className="border-2 border-gray-300 h-10 w-10 rounded-full bg-gray-100 shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="flex flex-row items-center justify-center mt-20">
        <p className="text-[6rem] font-extrabold text-white">TALI</p>
        <p className="text-[6rem] font-bold text-[#01fe9d]">.</p>
      </div>

      {/* Search Bar */}
      <div className="relative flex justify-center mb-12">
        <div className="border-2 border-white w-full max-w-[55%] h-14 rounded-4xl flex flex-row items-center px-4 gap-2 focus-within:shadow-md transition-all bg-white relative z-10">
          <Search className="text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search Assets" 
            className="flex-1 bg-transparent border-none outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Suggestions Box */}
        {searchTerm && filteredAssets.length > 0 && (
          <div className="absolute top-full mt-2 w-full max-w-[55%] bg-white rounded-lg shadow-lg z-20 p-2">
            {filteredAssets.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(`/search-result?q=${encodeURIComponent(item)}`)}
                className="p-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-700 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex space-x-12">
          {['Assets', 'Assignments'].map(tab => (
            <p 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-medium cursor-pointer transition-colors ${
                activeTab === tab 
                  ? 'text-white pb-1' 
                  : 'text-white'
              }`}
            >
              {tab}
            </p>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="flex mt-32">
        <p className="flex items-center gap-2 text-white cursor-pointer transition-colors">
          <Settings size={18} />
          Settings
        </p>
      </div>
    </div>
  );
};

export default SearchPage;
