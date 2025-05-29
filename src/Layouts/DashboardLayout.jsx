import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Searchbar from '../components/Searchbar';
import { Outlet } from 'react-router-dom';


const DashboardLayout = () => {

  return (
    <div className=''>
      <Sidebar />
      <div>
        <Searchbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
