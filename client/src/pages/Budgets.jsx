import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/sidebar';
import BudgetCard from '../components/BudgetCard';
import { budgetService } from '../services/api';

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newBudget, setNewBudget] = useState({ category: '', amount: '' });

    const fetchBudgets = async () => {
        try {
            const data = await budgetService.getBudgets();
            setBudgets(data || []);
        } catch (error) {
            console.error("Error fetching budgets", error);
            // Fallback mock data
            setBudgets([
                { id: 1, category: 'Housing', spent: 1500, limit: 1500 },
                { id: 2, category: 'Food & Dining', spent: 450, limit: 600 },
                { id: 3, category: 'Transportation', spent: 120, limit: 300 },
                { id: 4, category: 'Entertainment', spent: 280, limit: 200 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleCreateBudget = async (e) => {
        e.preventDefault();
        try {
            await budgetService.setBudget({
                category: newBudget.category,
                amount: parseFloat(newBudget.amount)
            });
            setShowModal(false);
            setNewBudget({ category: '', amount: '' });
            fetchBudgets();
        } catch (error) {
            console.error("Error creating budget", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            <div className="hidden md:block">
                <Sidebar />
            </div>
            
            <div className="flex-1 flex flex-col">
                <Navbar />
                
                <main className="p-4 md:p-8 space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Budgets</h1>
                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Control your spending by category</p>
                        </div>
                        <button 
                            onClick={() => setShowModal(true)}
                            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:shadow-indigo-400/40 hover:-translate-y-1 active:translate-y-0 transition-all"
                        >
                            + Create Budget
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-white h-56 rounded-[2rem] border border-slate-100"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {budgets.map((budget) => (
                                <BudgetCard 
                                    key={budget.id || budget._id}
                                    category={budget.category}
                                    spent={budget.spent || 0}
                                    limit={budget.amount || budget.limit}
                                />
                            ))}
                        </div>
                    )}

                    {/* Simple Modal for Creating Budget */}
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                            <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                                <h2 className="text-2xl font-black text-slate-900 mb-6">Create New Budget</h2>
                                <form onSubmit={handleCreateBudget} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-slate-700 ml-1">Category Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                                            placeholder="e.g. Groceries"
                                            value={newBudget.category}
                                            onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-slate-700 ml-1">Monthly Limit ($)</label>
                                        <input 
                                            type="number" 
                                            required
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                                            placeholder="e.g. 500"
                                            value={newBudget.amount}
                                            onChange={(e) => setNewBudget({...newBudget, amount: e.target.value})}
                                        />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit"
                                            className="flex-1 bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-400/40 transition-all"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Budgets;
