import React from 'react';

const TransactionCard = ({ 
  id,
  title = "Grocery Shopping", 
  date = "May 2, 2026", 
  amount = -120.50, 
  type = "expense", // 'income' or 'expense'
  status = "Completed",
  onDelete
}) => {
  const isIncome = type === 'income' || amount > 0;
  
  // Format the amount as currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(amount));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between w-full group relative">
      
      {/* Icon and Details section */}
      <div className="flex items-center space-x-4">
        {/* Icon Container */}
        <div className={`p-4 rounded-xl flex-shrink-0 transition-transform group-hover:scale-110 ${
          isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {isIncome ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8l-8 8-8-8" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V4m0 0l8 8m-8-8l-8 8" />
            </svg>
          )}
        </div>

        {/* Transaction Text */}
        <div>
          <h4 className="text-gray-900 font-bold text-lg group-hover:text-indigo-600 transition-colors">{title}</h4>
          <p className="text-gray-400 text-sm font-medium mt-0.5">{date}</p>
        </div>
      </div>

      {/* Amount, Status and Actions section */}
      <div className="text-right flex items-center gap-6">
        <div className="flex flex-col items-end">
            <p className={`font-black text-xl tracking-tight ${
            isIncome ? 'text-emerald-600' : 'text-gray-900'
            }`}>
            {isIncome ? '+' : '-'}{formattedAmount}
            </p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-2 ${
            status.toLowerCase() === 'completed' ? 'bg-emerald-100 text-emerald-700' :
            status.toLowerCase() === 'pending' ? 'bg-amber-100 text-amber-700' :
            'bg-slate-100 text-slate-700'
            }`}>
            {status}
            </span>
        </div>

        {/* Delete Button - Visible on hover */}
        <button 
          onClick={() => onDelete && onDelete(id)}
          className="p-3 bg-rose-50 text-rose-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-600 hover:text-white transform translate-x-4 group-hover:translate-x-0"
          title="Delete Transaction"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
    </div>
  );
};

export default TransactionCard;
