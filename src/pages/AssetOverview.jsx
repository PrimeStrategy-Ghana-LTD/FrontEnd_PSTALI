import React from 'react';
import AssetSummaryChart from './AssetSummaryChart';
import CategorySummary from './CategorySummary';
import RecentActivityLog from './RecentActivityLog';
import RecentAssetAdded from './RecentAssetAdded';

const AssetOverview = () => {
  return (
    <div className="bg-gray-50 p-4 lg:p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-1">
          <div className="flex items-center gap-2 text-sm text-gray-600 uppercase tracking-wider font-medium">
            <span>DASHBOARD</span>
          </div>
        </div>

        {/* Main Grid Layout - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AssetSummaryChart />
          <CategorySummary />
          <RecentActivityLog />
          <RecentAssetAdded />
        </div>
      </div>
    </div>
  );
};

export default AssetOverview;
