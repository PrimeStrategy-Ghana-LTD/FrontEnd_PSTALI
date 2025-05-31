import React from 'react'
import logo from "../assets/images/logo.png"
import { PiHouse } from "react-icons/pi";



function Sidebar() {
  return (
    <div className="flex">
      <div className='border-2 border-white pl-3 w-[18vw] pt-6 fixed bg-white h-[960px]'>
        <img src={logo} alt="" className='w-[60%]'/>
        <div className='space-y-3 text-[14px] mt-10'>
          <div className='flex items-center gap-2 pb-2'>
           <span><PiHouse /></span>
            <span className='ml-2'>Dashboard</span>
          </div>
          <div className='flex items-center gap-2 pb-2'>
            <span><PiHouse /></span>
            <span className='ml-2'>Assets</span>
          </div>
          
          <div className='flex items-center gap-2 pb-2'>
            <span><PiHouse /></span>
            <span className='ml-2'>Reports</span>
          </div>
          <div className='flex items-center gap-2 pb-2'>
            <span><PiHouse /></span>
            <span className='ml-2'>User</span>
          </div>
          <div className='flex items-center gap-2 pb-2'>
            <span><PiHouse /></span>
            <span className='ml-2'>Asset Assignment</span>
          </div>
          <div className='flex items-center gap-2 pb-2'>
            <span><PiHouse /></span>
            <span className='ml-2'>Manage Asset Location</span>
          </div>
          <div className='flex items-center gap-2 pt-40'>
            <span><PiHouse /></span>
            <span className='ml-2'>Settings</span>
          </div>
          <div className='flex items-center gap-2'>
            <span><PiHouse /></span>
            <span className='ml-2'>Log Out</span>
          </div>
        </div>
      </div>
      
      {/* Search bar with notification and profile */}
      
    </div>
  )
}

export default Sidebar