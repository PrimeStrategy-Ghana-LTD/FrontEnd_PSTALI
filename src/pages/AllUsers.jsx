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
      return matchRole && matchLocation;
    });

    setFilteredUsers(filtered);
  }, [selectedRole, selectedLocation, users]);

  const uniqueRoles = [...new Set(users.map((u) => u.role))];
  const uniqueLocations = [...new Set(users.map((u) => u.storeLocation))];

  return (
    <div className='flex'>
      <Sidebar1 />
      <div className='flex-1'>
        <Searchbar />
        <div className='bg-[#f0f1f3] min-h-[90%] space-y-5 py-6 px-4'>
          <div className='bg-white p-4 rounded-md shadow-sm w-full border border-white'>
            <div className='flex justify-between items-center mb-4'>
              <p className='font-semibold'>Users</p>
              <div className='flex gap-3 text-[13px]'>
                <button
                  onClick={() => setIsAddUserOpen(true)}
                  className='px-2 py-1 rounded-sm bg-[#1366d9] text-white border border-[#1366d9]'
                >
                  Add User
                </button>

                <button
                  className='flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer'
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filter
                </button>
                <button className='px-2 py-1 rounded-sm border border-gray-300 text-gray-600'>Download All</button>
              </div>
            </div>

            {showFilters && (
              <div className='mb-6 flex gap-4 text-[14px]'>
                <div>
                  <label>Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className='border border-gray-300 p-1 rounded ml-2'
                  >
                    <option value=''>All</option>
                    {uniqueRoles.map((role, idx) => (
                      <option key={idx} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className='border border-gray-300 p-1 rounded ml-2'
                  >
                    <option value=''>All</option>
                    {uniqueLocations.map((loc, idx) => (
                      <option key={idx} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className='flex justify-between font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200 mt-10'>
              <p className='w-[25%]'>User Name</p>
              <p className='w-[25%]'>Role</p>
              <p className='w-[25%]'>Contact</p>
              <p className='w-[25%]'>Location</p>
            </div>

            {filteredUsers.map((user) => (
              <div
                key={user._id || user.id}
                className='flex justify-between text-[13px] text-gray-600 py-3 border-b border-gray-200'
              >
                <p className='w-[25%]'>{user.userName}</p>
                <p className='w-[25%]'>{user.role}</p>
                <p className='w-[25%]'>{user.phone}</p>
                <p className='w-[25%]'>{user.storeLocation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Show AddUser Modal if isAddUserOpen is true */}
        {isAddUserOpen && <AddUser isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} />}
      </div>
    </div>
  );
};

export default AllUsers;
