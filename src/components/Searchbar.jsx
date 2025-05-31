import React from 'react'
import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";

const Searchbar = () => {
  return (
    <div >
        <div className='w-[79vw] ml-[1px]'>
        <div className='flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 '>
          <div className='flex items-center bg-gray-100 rounded-lg px-4 py-2 w-[400px]'>
            <IoSearchOutline className='text-gray-500 mr-3' size={20} />
            <input 
              type="text" 
              placeholder="Search..." 
              className='bg-transparent outline-none w-full text-gray-700'
            />
          </div>
          
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <IoNotificationsOutline className='text-gray-600 cursor-pointer' size={24} />
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>3</span>
            </div>
            <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer'>
              <span className='text-gray-600 text-sm font-medium'>JP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Searchbar;