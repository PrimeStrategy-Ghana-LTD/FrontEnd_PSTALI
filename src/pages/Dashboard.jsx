import React from 'react'
import Sidebar from '../components/Sidebar'
import AssetOverview from './AssetOverview'

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="ml- w-full">
        <AssetOverview />
      </div>
    </div>
  )
}

export default Dashboard
