import React, { useEffect, useState } from 'react';
import { apiGetLocationAssignments } from '../servicess/tali';

const RecentActivityLog = () => {
  const [recentAssignments, setRecentAssignments] = useState([]);

  useEffect(() => {
    const fetchRecentAssignments = async () => {
      try {
        const data = await apiGetLocationAssignments();
        const assets = data.assets || data || [];
        
        const sorted = assets.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentAssignments(sorted.slice(0, 5));
      } catch (error) {
        console.error('Error fetching recent assignments:', error);
      }
    };

    fetchRecentAssignments();
  }, []);

  const getPreviousLocation = (item) => {
    if (item.newLocation && item.assignedBy) {
      return item.assetLocation?.assetLocation || '—';
    }
    return '—';
  };

  const getCurrentLocation = (item) => {
    if (item.newLocation && item.assignedBy) {
      return item.newLocation || '—';
    }
    return item.assetLocation?.assetLocation || '—';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-[123%] h-full flex flex-col p-4 lg:p-5">
      <h3 className="font-semibold text-gray-800 mb-3 text-base">
        Recent Activity Log
      </h3>

      <div>
        <div className="flex justify-between font-semibold text-[13px] text-gray-700 pb-1 border-b border-gray-200">
          <p className="w-1/5">Asset</p>
          <p className="w-1/5">VIN</p>
          <p className="w-1/5">Previous Location</p>
          <p className="w-1/5">New Location</p>
          <p className="w-1/5">Assigned By</p>
        </div>

        {recentAssignments.length > 0 ? (
          recentAssignments.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-[12px] text-gray-600 py-2 border-b border-gray-100"
            >
              <div className="w-1/5 flex items-center">
                <img
                  src={item.assetImage}
                  alt={item.assetName}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <p className="truncate">{item.assetName || '—'}</p>
              </div>
              <p className="w-1/5 flex items-center">{item.assetId || '—'}</p>
              <p className="w-1/5 flex items-center">{getPreviousLocation(item)}</p>
              <p className="w-1/5 flex items-center">{getCurrentLocation(item)}</p>
              <div className="w-1/5 flex items-center">
                {item.assignedBy ? (
                  <div className="flex items-center">
                    {item.assignedBy.profilePicture && (
                      <img
                        src={item.assignedBy.profilePicture}
                        alt={item.assignedBy.userName}
                        className="w-5 h-5 rounded-full mr-1 object-cover"
                      />
                    )}
                    <span className="truncate">{item.assignedBy.userName}</span>
                  </div>
                ) : (
                  '—'
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-xs text-gray-400 py-4">
            No recent activity found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityLog;
