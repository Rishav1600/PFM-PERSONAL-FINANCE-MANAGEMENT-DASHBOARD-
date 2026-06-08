import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Default mock data
const defaultData = [
  { name: 'Housing', value: 400, color: '#4F46E5' }, // Indigo
  { name: 'Food', value: 300, color: '#10B981' },    // Emerald
  { name: 'Transport', value: 200, color: '#F59E0B' }, // Amber
  { name: 'Entertainment', value: 100, color: '#EF4444' } // Red
];

const PieChartBox = ({ data = defaultData, title = "Expenses by Category" }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 w-full h-full flex flex-col hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
      
      {/* Chart Container */}
      <div className="flex-1 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
              itemStyle={{ color: '#111827', fontWeight: 700 }}
            />
            <Pie
              data={data}
              innerRadius={"65%"}
              outerRadius={"90%"}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((item, index) => (
                <Cell key={`cell-${index}`} fill={item.color} className="hover:opacity-80 transition-opacity cursor-pointer" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text for Donut Chart */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">Total</span>
            <span className="text-3xl font-black text-gray-900">
                ${data.reduce((acc, item) => acc + item.value, 0)}
            </span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full shadow-sm" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-gray-600 font-medium text-sm">{item.name}</span>
            </div>
            <span className="font-bold text-gray-900 text-sm">${item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
