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

        {/* Main Layout */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-5">
            <AssetSummaryChart className="flex-1" />
            <CategorySummary className="flex-1" />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <RecentActivityLog className="flex-1" />
            <RecentAssetAdded className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetOverview;
