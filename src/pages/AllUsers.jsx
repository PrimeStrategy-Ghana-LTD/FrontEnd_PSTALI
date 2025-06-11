import React from 'react'
import Sidebar1 from '../components/Sidebar1';
import Searchbar from '../components/Searchbar';

const AllUsers = () => {
    return (
        <div className='flex'>
            <Sidebar1 />
            <div>
                <Searchbar />
                <div className='bg-[#f0f1f3] min-h-[90%] space-y-5 py-6 px-4'>
                    <div className='bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white'>
                        <div className='flex justify-between items-center mb-4'>
                            <p className='font-semibold'>Users</p>
                            <div className='flex gap-3 text-[13px]'>
                                <button className='px-2 py-1 rounded-sm bg-[#1366d9] text-white border border-[#1366d9]'>Add User</button>
                                <button className='flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer'>Filter</button>
                                <button className='px-2 py-1 rounded-sm border border-gray-300 text-gray-600'>Download All</button>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200 mt-10'>
                                <p className='w-[%]'>User Name</p>
                                <p className='w-[%]'>Role</p>
                                <p className='w-[%]'>Contact</p>
                                <p className='w-[%]'>Location</p>
                                
                            </div>
                            <div className='flex justify-between text-[13px] text-gray-600 py-3 border-b border-gray-200'>
                             <p className='w-[%]'>Gideon Odoom</p>
                             <p className='w-[%]'>Asset Manager</p>
                             <p className='w-[%]'>038372923637</p>
                             <p className='w-[%]'>Accra</p>
                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllUsers;