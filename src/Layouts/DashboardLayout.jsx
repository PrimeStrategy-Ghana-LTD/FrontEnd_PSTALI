import React, { useState } from 'react';

import Searchbar from '../components/Searchbar';
import { Outlet } from 'react-router-dom';
import Sidebar1 from '../components/Sidebar1';


const DashboardLayout = () => {

  return (
    <div className='flex'>
      <Sidebar1 />
      <div className='bg-[#f0f1f3]'>
        <Searchbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
