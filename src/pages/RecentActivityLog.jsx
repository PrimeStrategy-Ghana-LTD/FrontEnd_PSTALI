import React from 'react';

const RecentActivityLog = () => {
  const activities = [
    {
      name: 'Jane Cooper',
      email: 'jane.cooper@gmail.com',
      assignedTo: 'Volkswagen Passat', // ADDED: asset name
      date: 'Aug 4, 10:15 AM',
      approver: 'Esther Howard',
      approverEmail: 'estherhoward@gmail.com'
    },
    // ... more entries
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-[123%] h-full flex flex-col p-4 lg:p-6">
      <h3 className="font-semibold text-gray-800 mb-4 text-lg">Recent Activity Log</h3>

      {/* Scrollable Table */}
      <div className="overflow-y-auto max-h-[300px] border-b-2 border-gray-200">
        <table className="w-full text-sm min-w-full table-auto">
          <thead>
            <tr className="text-left text-gray-600 text-xs uppercase tracking-wider border-b-2 border-gray-200">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Assigned To</th>
              <th className="pb-3 font-medium">Date & Time</th>
              <th className="pb-3 font-medium">Approved By</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className={index > 0 ? "border-t border-gray-100" : ""}>
                {/* Name */}
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-700">
                        {getInitials(activity.name)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 text-sm">{activity.name}</div>
                      <div className="text-xs text-gray-500 truncate">{activity.email}</div>
                    </div>
                  </div>
                </td>

                {/* Assigned To */}
                <td className="py-4 text-gray-900 text-sm font-medium">
                  {activity.assignedTo || '—'}
                </td>

                {/* Date & Time */}
                <td className="py-4 text-gray-600 text-sm">
                  {activity.date}
                </td>

                {/* Approved By */}
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-400 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 text-sm">{activity.approver}</div>
                      <div className="text-xs text-gray-500 truncate">{activity.approverEmail}</div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityLog;
