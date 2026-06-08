import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/sidebar';
import Navbar from '../components/Navbar';
import TransactionCard from '../components/TransactionCard';
import BudgetCard from '../components/BudgetCard';
import PieChartBox from '../components/charts/piechart';
import BarChartBox from '../components/charts/barchart';
import { budgetService } from '../services/api';
import { getTransactions, addTransaction, deleteTransaction } from '../context/transactionSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { transactions, isLoading } = useSelector((state) => state.transactions);
  
  const [userName, setUserName] = useState('');
  const [budgetLimit, setBudgetLimit] = useState(2000);
  const [totalSpent, setTotalSpent] = useState(1240.50);
  const [greeting, setGreeting] = useState('Good Morning');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({ title: '', amount: '', type: 'expense', category: 'General' });

  const [budgets] = useState([
    { id: 1, category: 'Housing', spent: 1500, limit: 1500 },
    { id: 2, category: 'Food & Dining', spent: 450, limit: 600 },
    { id: 3, category: 'Transportation', spent: 120, limit: 300 },
  ]);

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
    
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    if (!localStorage.getItem('token')) {
      navigate('/login');
    }

    fetchFinancialData();
    dispatch(getTransactions());
  }, [navigate, dispatch]);

  const fetchFinancialData = async () => {
    try {
      const budgetData = await budgetService.getBudgets();
      if (budgetData && budgetData.length > 0) {
        setBudgetLimit(budgetData[0].amount);
      }
    } catch (err) {
      console.error("Error fetching financial data:", err);
    }
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const amount = parseFloat(newTx.amount);
    
    const transactionData = {
        title: newTx.title,
        amount: newTx.type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
        type: newTx.type,
        category: newTx.category,
        date: new Date().toISOString()
    };

    dispatch(addTransaction(transactionData));
    
    if (newTx.type === 'expense') {
        setTotalSpent(prev => prev + Math.abs(amount));
    }
    
    setIsModalOpen(false);
    setNewTx({ title: '', amount: '', type: 'expense', category: 'General' });
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
        dispatch(deleteTransaction(id));
    }
  };

  const remainingBudget = budgetLimit - totalSpent;
  const progressPercent = (totalSpent / budgetLimit) * 100;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans text-slate-900">
      {/* Sidebar - Desktop Only */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Subtle Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-violet-100/50 blur-[100px] rounded-full -z-10"></div>

        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10">
          {/* Hero Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest animate-bounce">Live Dashboard</span>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              </div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-tight">
                {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{userName}!</span>
              </h1>
              <p className="text-slate-400 font-bold max-w-md">
                Your financial universe is looking healthy today. You've saved <span className="text-emerald-600 font-black">$450.00</span> more than last month.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
                <button 
                  className="bg-white text-slate-900 px-6 py-4 rounded-2xl font-black shadow-xl shadow-slate-200/50 hover:shadow-indigo-200/40 hover:-translate-y-1 transition-all text-sm border border-slate-100 flex items-center gap-2"
                >
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Export Report
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-indigo-200 hover:shadow-indigo-500/40 hover:-translate-y-1 active:scale-95 transition-all text-sm flex items-center gap-2"
                >
                    <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                    </div>
                    New Transaction
                </button>
            </div>
          </div>

          {/* Premium Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Budget Card */}
            <div className="group relative">
                <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] translate-y-2 opacity-0 group-hover:opacity-10 transition-all blur-xl"></div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-500">
                       <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">vs Last Month</p>
                        <span className="text-emerald-500 font-black text-xs flex items-center justify-end gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            12.5%
                        </span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-5xl font-black text-slate-900 mb-2">${budgetLimit.toLocaleString()}</h2>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Total Monthly Budget</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex -space-x-2">
                          {[1,2,3].map(i => <div key={i} className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white"></div>)}
                      </div>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">3 Accounts Active</span>
                  </div>
                </div>
            </div>

            {/* Expenses Card */}
            <div className="group relative">
                <div className="absolute inset-0 bg-rose-600 rounded-[2.5rem] translate-y-2 opacity-0 group-hover:opacity-10 transition-all blur-xl"></div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform duration-500">
                       <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Efficiency</p>
                        <span className="text-rose-500 font-black text-xs flex items-center justify-end gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            8.2%
                        </span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-5xl font-black text-slate-900 mb-2">${totalSpent.toLocaleString()}</h2>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Current Month Expenses</p>
                  </div>
                  <div className="mt-8 space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <span>Usage</span>
                          <span>{progressPercent.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${progressPercent > 90 ? 'bg-rose-500' : 'bg-indigo-600'}`}
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                      </div>
                  </div>
                </div>
            </div>

            {/* Savings/Safe Card */}
            <div className="group relative">
                <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] translate-y-2 opacity-20 transition-all blur-2xl"></div>
                <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-300 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 text-white h-full flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none group-hover:scale-150 transition-transform duration-1000">
                        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center text-white">
                           <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <button className="px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest transition-colors">Details</button>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-5xl font-black mb-2">${remainingBudget.toLocaleString()}</h2>
                        <p className="text-indigo-100 font-bold uppercase text-[10px] tracking-[0.2em]">Available Safe Balance</p>
                    </div>
                    <div className="mt-8 relative z-10 flex gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-lg text-[9px] font-black uppercase tracking-widest">+ $2,400 Income</span>
                        <span className="px-3 py-1 bg-white/20 rounded-lg text-[9px] font-black uppercase tracking-widest">Goal 85%</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Quick Action Hub Section */}
          <section className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center justify-between mb-10">
                  <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">Quick Action Hub</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Smart shortcuts for your wallet</p>
                  </div>
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {[
                      { label: 'Link Bank', icon: 'M8 14v20c0 4.418 7.163 8 16 8 1.38 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14c0 4.418-7.163 8-16 8S8 28.418 8 24', color: 'bg-blue-50 text-blue-600' },
                      { label: 'Scan Receipt', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z', color: 'bg-emerald-50 text-emerald-600' },
                      { label: 'Set Alert', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', color: 'bg-amber-50 text-amber-600' },
                      { label: 'Bill Pay', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', color: 'bg-rose-50 text-rose-600' },
                      { label: 'Goals', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'bg-violet-50 text-violet-600' },
                  ].map((action, i) => (
                      <button key={i} className="flex flex-col items-center gap-3 group">
                          <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 shadow-sm group-hover:shadow-lg`}>
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={action.icon} /></svg>
                          </div>
                          <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{action.label}</span>
                      </button>
                  ))}
              </div>
          </section>

          {/* Charts Visualization Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:shadow-2xl">
                 <div className="flex items-center justify-between mb-8">
                     <h3 className="text-2xl font-black text-slate-900 tracking-tight">Financial Trends</h3>
                     <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none">
                         <option>Last 7 Days</option>
                         <option>Last 30 Days</option>
                     </select>
                 </div>
                 <BarChartBox />
             </div>
             <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:shadow-2xl">
                 <div className="flex items-center justify-between mb-8">
                     <h3 className="text-2xl font-black text-slate-900 tracking-tight">Spending Categories</h3>
                     <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest">More Analytics</button>
                 </div>
                 <PieChartBox />
             </div>
          </div>

          {/* Activity Ledger & Budget Management Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* Recent Activity Ledger */}
            <div className="xl:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Real-time ledger of your spendings</p>
                </div>
                <button onClick={() => navigate('/transactions')} className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-black text-indigo-600 hover:bg-slate-50 transition-all">Full History</button>
              </div>
              <div className="grid gap-4">
                {isLoading ? (
                  <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
                ) : transactions.length > 0 ? (
                  transactions.slice(0, 5).map(tx => (
                    <TransactionCard 
                      key={tx._id}
                      id={tx._id}
                      title={tx.title}
                      amount={tx.amount}
                      type={tx.type}
                      date={new Date(tx.date).toLocaleDateString()}
                      status={tx.status || 'Completed'}
                      onDelete={handleDeleteTransaction}
                    />
                  ))
                ) : (
                  <div className="bg-white p-10 rounded-2xl border border-dashed border-slate-200 text-center">
                    <p className="text-slate-400 font-bold">No transactions found. Add your first one!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Smart Budget Indicators */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Budgets</h3>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Progress towards targets</p>
                </div>
                <button onClick={() => navigate('/budgets')} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></button>
              </div>
              <div className="grid gap-6">
                {budgets.map(budget => (
                  <BudgetCard 
                    key={budget.id}
                    category={budget.category}
                    spent={budget.spent}
                    limit={budget.limit}
                  />
                ))}
                
                {/* Upgrade Promo Card */}
                <div className="bg-indigo-900 p-8 rounded-[2.5rem] relative overflow-hidden mt-4 shadow-2xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <h4 className="text-white font-black text-lg mb-2 relative z-10">Smart AI Advice</h4>
                    <p className="text-indigo-200 text-xs font-medium mb-6 relative z-10 leading-relaxed">Based on your patterns, you could save $200 more by optimizing your subscriptions.</p>
                    <button className="w-full py-3 bg-white text-indigo-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all relative z-10 shadow-lg">Get Insight</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modern Glassmorphic Modal for Add Transaction */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
            <div className="bg-white/95 backdrop-blur-2xl rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden p-10 animate-in zoom-in-95 duration-300 border border-white/50">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Record<br/><span className="text-indigo-600 text-lg uppercase tracking-widest font-black opacity-60">Entry</span></h3>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-3 bg-slate-50 rounded-2xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
                
                <form onSubmit={handleAddTransaction} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transaction Title</label>
                        <input 
                            type="text" 
                            placeholder="Where did it go?"
                            className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" 
                            required 
                            value={newTx.title}
                            onChange={(e) => setNewTx({...newTx, title: e.target.value})}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Value ($)</label>
                            <input 
                                type="number" 
                                placeholder="0.00"
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" 
                                required 
                                value={newTx.amount}
                                onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Flow</label>
                            <div className="relative">
                                <select 
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700 appearance-none"
                                    value={newTx.type}
                                    onChange={(e) => setNewTx({...newTx, type: e.target.value})}
                                >
                                    <option value="expense">Outflow</option>
                                    <option value="income">Inflow</option>
                                </select>
                                <svg className="w-4 h-4 absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                        <div className="relative">
                            <select 
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700 appearance-none"
                                value={newTx.category}
                                onChange={(e) => setNewTx({...newTx, category: e.target.value})}
                            >
                                <option value="General">General</option>
                                <option value="Food">Food & Dining</option>
                                <option value="Housing">Housing</option>
                                <option value="Transport">Transportation</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Entertainment">Entertainment</option>
                            </select>
                            <svg className="w-4 h-4 absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                    
                    <button type="submit" className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-300 hover:bg-indigo-700 hover:shadow-indigo-500/40 transition-all active:scale-[0.98] mt-4">
                        Confirm Transaction
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
