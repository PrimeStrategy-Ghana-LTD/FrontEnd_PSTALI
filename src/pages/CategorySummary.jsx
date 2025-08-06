import React from 'react';

const CategorySummary = () => {
  const categories = [
    { name: 'Vehicle', count: 10, color: '#9333EA' },
    { name: 'Goods 1', count: 10, color: '#FACC15' },
    { name: 'Goods 2', count: 10, color: '#3B82F6' },
    { name: 'Goods 3', count: 8, color: '#6B7280' },
  ];

  const totalAssets = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
      <div className="text-center mb-6">
        <h3 className="font-semibold text-gray-800 mb-6 text-lg">Category</h3>
        <div className="relative w-36 h-36 mx-auto mb-6">
          {/* Donut Chart */}
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 144 144">
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#f3f4f6"
              strokeWidth="12"
              fill="transparent"
            />
            
            {/* Vehicle segment */}
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#9333EA"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={`${(10 / totalAssets) * 377} 377`}
              strokeDashoffset="0"
            />
            
            {/* Goods 1 segment */}
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#FACC15"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={`${(10 / totalAssets) * 377} 377`}
              strokeDashoffset={`-${(10 / totalAssets) * 377}`}
            />
            
            {/* Goods 2 segment */}
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#3B82F6"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={`${(10 / totalAssets) * 377} 377`}
              strokeDashoffset={`-${(20 / totalAssets) * 377}`}
            />
            
            {/* Goods 3 segment */}
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#6B7280"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={`${(8 / totalAssets) * 377} 377`}
              strokeDashoffset={`-${(30 / totalAssets) * 377}`}
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-800">{totalAssets}</div>
            <div className="text-sm text-gray-500">Total Asset</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-sm text-gray-700">{category.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">{category.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CategorySummary;