
import React from 'react';
import AssetSummaryChart from './AssetSummaryChart';
import CategorySummary from './CategorySummary';
import RecentActivityLog from './RecentActivityLog';
import RecentAssetAdded from './RecentAssetAdded';


const AssetOverview = () => {
  return (
    <div className=" bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-1">
          <div className="flex items-center gap-2 text-sm text-gray-600 uppercase tracking-wider font-medium">
            <span>DASHBOARD</span>
          </div>
        </div>

        {/* Main Grid Layout - Responsive */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Top Row */}
          <div className="xl:col-span-8">
            <AssetSummaryChart />
          </div>
          
          <div className="xl:col-span-4">
            <CategorySummary />
          </div>

          {/* Bottom Row */}
          <div className="xl:col-span-8">
            <RecentActivityLog />
          </div>
          
          <div className="xl:col-span-4">
            <RecentAssetAdded />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetOverview;
