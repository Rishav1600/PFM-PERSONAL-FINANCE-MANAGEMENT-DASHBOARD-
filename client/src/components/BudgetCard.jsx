import React from 'react';

const BudgetCard = ({ 
    category = "Entertainment", 
    spent = 450, 
    limit = 600, 
    icon 
}) => {
    const percentage = Math.min((spent / limit) * 100, 100);
    const isOverBudget = spent > limit;

    // Determine color based on usage
    const getProgressColor = () => {
        if (percentage >= 90) return 'bg-rose-500';
        if (percentage >= 70) return 'bg-amber-500';
        return 'bg-indigo-600';
    };

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        {icon || (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <h3 className="text-gray-900 font-bold text-lg">{category}</h3>
                        <p className="text-gray-400 text-sm font-medium">Monthly Budget</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${isOverBudget ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'}`}>
                        {Math.round(percentage)}%
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-end">
                    <div>
                        <span className="text-2xl font-black text-gray-900">${spent}</span>
                        <span className="text-gray-400 font-medium ml-1">/ ${limit}</span>
                    </div>
                    <span className={`text-sm font-bold ${isOverBudget ? 'text-rose-600' : 'text-gray-400'}`}>
                        {isOverBudget ? 'Over Budget' : `$${limit - spent} left`}
                    </span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    {/* Progress Bar Fill */}
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor()}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BudgetCard;
