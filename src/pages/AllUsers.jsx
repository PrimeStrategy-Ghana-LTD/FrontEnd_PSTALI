import React, { useEffect, useState } from 'react';
import Sidebar1 from '../components/Sidebar1';
import Searchbar from '../components/Searchbar';
import AddUser from './AddUser';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://backend-ps-tali.onrender.com/users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchRole = selectedRole ? user.role === selectedRole : true;
      const matchLocation = selectedLocation ? user.storeLocation === selectedLocation : true;
      const matchSearch = searchTerm ? 
        user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return matchRole && matchLocation && matchSearch;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [selectedRole, selectedLocation, users, searchTerm]);

  const uniqueRoles = [...new Set(users.map((u) => u.role))];
  const uniqueLocations = [...new Set(users.map((u) => u.storeLocation))];

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const getUserInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRandomColor = () => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500', 'bg-indigo-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar1 />
      <div className='flex-1 flex flex-col'>
        <Searchbar />
        <div className='flex-1 p-4 lg:p-6'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col'>
            {/* Header */}
            <div className='p-4 lg:p-6 border-b border-gray-200'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                  <h1 className='text-xl font-semibold text-gray-900'>Users</h1>
                  <p className='text-sm text-gray-600 mt-1'>View and manage users</p>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                  <button
                    onClick={() => setIsAddUserOpen(true)}
                    className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors'
                  >
                    Add User
                  </button>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className='px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2'
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter
                  </button>
                  <button className='px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors'>
                    Sort
                  </button>
                </div>
              </div>

              {/* Search and User Count */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121L17 20zM9 12a4 4 0 100-8 4 4 0 000 8zM15 20a3 3 0 01-6 0v-1a7 7 0 00-7-7v-1a5 5 0 015-5h4a5 5 0 015 5v9z" />
                  </svg>
                  <span>Total Users: {filteredUsers.length}</span>
                </div>
                <div className='relative'>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64'
                  />
                  <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Role</label>
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        <option value=''>All Roles</option>
                        {uniqueRoles.map((role, idx) => (
                          <option key={idx} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                      >
                        <option value=''>All Locations</option>
                        {uniqueLocations.map((loc, idx) => (
                          <option key={idx} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Table */}
            <div className='flex-1 overflow-hidden flex flex-col'>
              {/* Desktop Table */}
              <div className='hidden lg:block flex-1 overflow-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50 border-b border-gray-200'>
                    <tr>
                      <th className='text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact</th>
                      <th className='text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider'>Phone</th>
                      <th className='text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider'>Location</th>
                      <th className='text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
                      <th className='text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {currentUsers.map((user, index) => (
                      <tr key={user._id || user.id || index} className='hover:bg-gray-50'>
                        <td className='py-4 px-6'>
                          <div className='flex items-center'>
                            <div className={`w-10 h-10 rounded-full ${getRandomColor()} flex items-center justify-center text-white font-medium text-sm mr-3`}>
                              {getUserInitials(user.userName)}
                            </div>
                            <div>
                              <div className='text-sm font-medium text-gray-900'>{user.userName}</div>
                              <div className='text-sm text-gray-500'>{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className='py-4 px-6 text-sm text-gray-900'>{user.phone}</td>
                        <td className='py-4 px-6 text-sm text-gray-900'>{user.storeLocation}</td>
                        <td className='py-4 px-6'>
                          <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800'>
                            {user.role}
                          </span>
                        </td>
                        <td className='py-4 px-6'>
                          <button className='px-3 py-1 text-xs font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 transition-colors'>
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className='lg:hidden flex-1 overflow-auto p-4 space-y-4'>
                {currentUsers.map((user, index) => (
                  <div key={user._id || user.id || index} className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-center'>
                        <div className={`w-12 h-12 rounded-full ${getRandomColor()} flex items-center justify-center text-white font-medium mr-3`}>
                          {getUserInitials(user.userName)}
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900'>{user.userName}</h3>
                          <p className='text-sm text-gray-500'>{user.email || user.phone}</p>
                        </div>
                      </div>
                      <button className='px-3 py-1 text-xs font-medium text-white bg-gray-800 rounded-md'>
                        Manage
                      </button>
                    </div>
                    <div className='mt-3 grid grid-cols-2 gap-4 text-sm'>
                      <div>
                        <span className='text-gray-500'>Phone:</span>
                        <span className='ml-1 text-gray-900'>{user.phone}</span>
                      </div>
                      <div>
                        <span className='text-gray-500'>Location:</span>
                        <span className='ml-1 text-gray-900'>{user.storeLocation}</span>
                      </div>
                      <div className='col-span-2'>
                        <span className='text-gray-500'>Role:</span>
                        <span className='ml-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800'>
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className='p-4 lg:p-6 border-t border-gray-200 bg-white'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div className='text-sm text-gray-700'>
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} results
                </div>
                
                <div className='flex items-center gap-2'>
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Back
                  </button>
                  
                  <div className='flex items-center gap-1'>
                    {getPageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className='px-3 py-2 text-sm text-gray-500'>...</span>
                        ) : (
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className='px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add User Modal */}
        {isAddUserOpen && (
          <AddUser 
            isOpen={isAddUserOpen} 
            onClose={() => setIsAddUserOpen(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;