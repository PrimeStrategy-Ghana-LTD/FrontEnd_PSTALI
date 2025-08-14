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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7">
      <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
        Recent Activity Log
      </h3>

      {/* Make table horizontally scrollable on small screens */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Table header */}
          <div className="flex justify-between font-semibold text-[11px] sm:text-[13px] text-gray-700 pb-1 border-b border-gray-200">
            <p className="w-1/5">Asset</p>
            <p className="w-1/5">Location</p>
            <p className="w-1/5">Date&Time</p>
            <p className="w-1/5">Approved By</p>
          </div>

          {/* Table rows */}
          {recentAssignments.length > 0 ? (
            recentAssignments.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-[10px] sm:text-[12px] text-gray-600 py-2 border-b border-gray-100"
              >
                {/* Asset name & image */}
                <div className="w-1/5 flex items-center min-w-[100px]">
                  <img
                    src={item.assetImage}
                    alt={item.assetName}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 object-cover"
                  />
                  <p className="truncate">{item.assetName || '—'}</p>
                </div>

                {/* VIN */}
                <p className="w-1/5 flex items-center min-w-[80px]">
                  {item.newLocation || '—'}
                </p>
                <p className="w-1/5 flex items-center min-w-[80px]">
                  {item.date || '—'}
                </p>

                {/* Current Location */}
                {/* <p className="w-1/5 flex items-center min-w-[120px]">
                  {getCurrentLocation(item)}
                </p> */}

                {/* Assigned By */}
                <div className="w-1/5 flex items-center min-w-[120px]">
                  {item.assignedBy ? (
                    <div className="flex items-center">
                      {item.assignedBy.profilePicture && (
                        <img
                          src={item.assignedBy.profilePicture}
                          alt={item.assignedBy.userName}
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full mr-1 object-cover"
                        />
                      )}
                      <span className="truncate">{item.approvedBy.userName}</span>
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
    </div>
  );
};

export default RecentActivityLog;
