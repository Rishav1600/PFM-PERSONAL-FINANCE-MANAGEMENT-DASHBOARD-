import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/sidebar';
import TransactionCard from '../components/TransactionCard';
import axios from 'axios';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, income, expense

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/transactions', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTransactions(response.data || []);
        } catch (error) {
            console.error("Error fetching transactions", error);
            // Fallback mock data if API fails or is empty
            setTransactions([
                { id: 1, title: 'Apple Store', amount: -999.00, type: 'expense', date: 'May 2, 2026', status: 'Completed' },
                { id: 2, title: 'Salary Deposit', amount: 4500.00, type: 'income', date: 'May 1, 2026', status: 'Completed' },
                { id: 3, title: 'Starbucks Coffee', amount: -12.50, type: 'expense', date: 'April 30, 2026', status: 'Completed' },
                { id: 4, title: 'Rent Payment', amount: -1500.00, type: 'expense', date: 'April 28, 2026', status: 'Pending' },
                { id: 5, title: 'Amazon.com', amount: -45.99, type: 'expense', date: 'April 27, 2026', status: 'Completed' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || tx.type === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            <div className="hidden md:block">
                <Sidebar />
            </div>
            
            <div className="flex-1 flex flex-col">
                <Navbar />
                
                <main className="p-4 md:p-8 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Transactions</h1>
                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Full history of your financial activity</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search Bar */}
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="Search transactions..."
                                    className="pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64 transition-all shadow-sm group-hover:shadow-md"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Filter Chips */}
                            <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
                                {['all', 'income', 'expense'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                            filter === f 
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                                                : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="bg-white h-24 rounded-2xl border border-slate-100"></div>
                            ))}
                        </div>
                    ) : filteredTransactions.length > 0 ? (
                        <div className="grid gap-4">
                            {filteredTransactions.map(tx => (
                                <TransactionCard 
                                    key={tx.id}
                                    title={tx.title}
                                    amount={tx.amount}
                                    type={tx.type}
                                    date={tx.date}
                                    status={tx.status}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-100">
                            <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">No Transactions Found</h2>
                            <p className="text-slate-400 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Transactions;
