import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Default mock data
const defaultData = [
  { name: 'Mon', income: 4000, expense: 2400 },
  { name: 'Tue', income: 3000, expense: 1398 },
  { name: 'Wed', income: 5000, expense: 3800 },
  { name: 'Thu', income: 2780, expense: 3908 },
  { name: 'Fri', income: 6890, expense: 4800 },
  { name: 'Sat', income: 2390, expense: 3800 },
  { name: 'Sun', income: 3490, expense: 4300 },
];

const BarChartBox = ({ 
  data = defaultData, 
  title = "Cash Flow Overview" 
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 w-full h-full flex flex-col hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
          Weekly View
        </span>
      </div>
      
      {/* Chart Container */}
      <div className="flex-1 min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              cursor={{ fill: '#F8FAFC', radius: 8 }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
              itemStyle={{ fontWeight: 700 }}
            />
            <Legend 
              iconType="circle"
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '30px', fontWeight: 600, color: '#64748B' }}
            />
            <Bar 
              dataKey="income" 
              name="Income" 
              fill="#4F46E5" 
              radius={[6, 6, 0, 0]} 
              barSize={12}
            />
            <Bar 
              dataKey="expense" 
              name="Expense" 
              fill="#FCA5A5" 
              radius={[6, 6, 0, 0]} 
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
