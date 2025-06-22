import React from 'react';

const AssetManagementTable = () => {
  const data = [
    { name: "Car SI", quantity: "1 Unit", location: "Tema", assigned: "—" },
    { name: "Boat WD", quantity: "1 Unit", location: "Takoradi", assigned: "Kafuiwaa A. K." },
    { name: "CAR TF", quantity: "1 Unit", location: "Location 2", assigned: "Repin L. V." },
    { name: "House IK", quantity: "1 Unit", location: "Location 2", assigned: "Korkor A. K." },
    { name: "House SD", quantity: "1 Unit", location: "Location 1", assigned: "Tuflavam N. R." },
  ];

  return (
    <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm">
      <div className="flex flex-row justify-between mb-2">
        <p className="font-semibold">Recently Added</p>
        <p className="border-[0.05px] border-gray-400 py-1 px-5 rounded-sm text-[14px] text-gray-600">Latest</p>
      </div>

      {/* Table with fixed height similar to the chart height */}
      <div className="h-48 w-full overflow-y-auto">
        <table className="min-w-full text-sm text-left border-t border-gray-200">
          <thead className="text-gray-600">
            <tr>
              <th className="py-1 pr-4">Asset Name</th>
              <th className="py-1 pr-4">Quantity</th>
              <th className="py-1 pr-4">Location</th>
              <th className="py-1">Asset ID/VM</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {data.map((item, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="py-1 pr-4">{item.name}</td>
                <td className="py-1 pr-4">{item.quantity}</td>
                <td className="py-1 pr-4">{item.location}</td>
                <td className="py-1">{item.assigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional custom legend-like footer (can be removed if not needed) */}
      <div className="flex gap-6 mt-3 px-4">
        <span className="text-sm text-gray-500">Table shows 5 most recent assets</span>
      </div>
    </div>
  );
};

export default AssetManagementTable;
