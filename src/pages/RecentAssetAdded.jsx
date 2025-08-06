import React from 'react';

const RecentAssetAdded = () => {
  const assets = [
    { name: 'Toyota Hilux', type: 'vehicle' },
    { name: 'Ford Ranger', type: 'vehicle' },
    { name: 'Nissan Patrol', type: 'vehicle' },
    { name: 'Ford', type: 'vehicle' },
    { name: 'Ford', type: 'vehicle' }
  ];

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
      <h3 className="font-semibold text-gray-800 mb-4 text-lg">Recent Asset Added</h3>
      
      <div className="space-y-4">
        {assets.map((asset, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-cover bg-center" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236B7280'%3E%3Cpath d='M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z'/%3E%3C/svg%3E")`
              }}></div>
            </div>
            <span className="text-sm font-medium text-gray-800">{asset.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAssetAdded;