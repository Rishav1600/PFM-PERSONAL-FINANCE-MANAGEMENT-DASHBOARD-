import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/sidebar';
import avatarImg from '../assets/avatar.png';

const Settings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('account');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    
    useEffect(() => {
        const name = localStorage.getItem('userName') || 'User';
        const email = localStorage.getItem('userEmail') || (name.toLowerCase().replace(' ', '') + '@example.com');
        setUserName(name);
        setUserEmail(email);
        
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const tabs = [
        { id: 'account', label: 'Account', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        )},
        { id: 'security', label: 'Security', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        )},
        { id: 'appearance', label: 'Appearance', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
        )},
        { id: 'notifications', label: 'Notifications', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        )}
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans text-slate-900">
            <div className="hidden md:block">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* Subtle Background Elements */}
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-50/50 blur-[120px] rounded-full -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-violet-50/50 blur-[100px] rounded-full -z-10"></div>

                <Navbar />

                <main className="flex-1 p-4 md:p-12 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <header className="mb-12">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <h1 className="text-5xl font-black text-slate-900 tracking-tight">Settings</h1>
                            </div>
                            <p className="text-slate-400 font-black uppercase tracking-widest text-xs ml-16">Personalize your financial command center</p>
                        </header>

                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Premium Tab Sidebar */}
                            <div className="w-full lg:w-80 flex-shrink-0">
                                <nav className="bg-white rounded-[3rem] p-4 shadow-2xl shadow-slate-200/40 border border-slate-100 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar sticky top-24 transition-all hover:shadow-indigo-100/50">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-4 px-8 py-5 rounded-[2rem] transition-all duration-500 font-black text-sm whitespace-nowrap lg:whitespace-normal group ${
                                                activeTab === tab.id
                                                    ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 -translate-y-1 lg:-translate-y-0 lg:translate-x-2'
                                                    : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50'
                                            }`}
                                        >
                                            <div className={`p-2 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-white'}`}>
                                                {tab.icon}
                                            </div>
                                            {tab.label}
                                            {activeTab === tab.id && (
                                                <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse hidden lg:block"></div>
                                            )}
                                        </button>
                                    ))}
                                    
                                    <div className="mt-10 pt-10 border-t border-slate-100 hidden lg:block">
                                        <div className="px-8 space-y-4">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Storage Used</p>
                                            <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                                <div className="h-full w-1/3 bg-indigo-600 rounded-full"></div>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500">2.4 GB of 10 GB</p>
                                        </div>
                                    </div>
                                </nav>
                            </div>

                            {/* Content Area with Glassmorphism */}
                            <div className="flex-1 bg-white/80 backdrop-blur-2xl rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white/50 overflow-hidden min-h-[600px] transition-all hover:shadow-indigo-100/50">
                                <div className="p-10 md:p-16">
                                    {activeTab === 'account' && (
                                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                            <section>
                                                <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Account Identity</h3>
                                                <div className="flex flex-col sm:flex-row items-center gap-10">
                                                    <div className="relative group">
                                                        <div className="h-40 w-40 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative transition-transform duration-500 group-hover:scale-105">
                                                            <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                            </div>
                                                        </div>
                                                        <button className="absolute -bottom-3 -right-3 w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-4 border-white">
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                                                        </button>
                                                    </div>
                                                    <div className="text-center sm:text-left space-y-2">
                                                        <h4 className="font-black text-slate-900 text-2xl">Public Avatar</h4>
                                                        <p className="text-slate-400 font-bold text-sm max-w-xs">Change your photo to personalize your dashboard and reports.</p>
                                                        <div className="flex gap-4 pt-4 justify-center sm:justify-start">
                                                            <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest">Upload New</button>
                                                            <button className="px-8 py-3 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs hover:bg-rose-100 transition-all uppercase tracking-widest">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <div className="h-px bg-slate-100"></div>

                                            <section>
                                                <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Basic Credentials</h3>
                                                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Identity</label>
                                                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Connection</label>
                                                        <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" />
                                                    </div>
                                                    <div className="md:col-span-2 pt-6">
                                                        <button type="submit" className="px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 active:scale-95">Synchronize Changes</button>
                                                    </div>
                                                </form>
                                            </section>
                                        </div>
                                    )}

                                    {activeTab === 'security' && (
                                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                            <section>
                                                <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Security Vault</h3>
                                                <form className="space-y-8 max-w-lg">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Current Password</label>
                                                        <input type="password" placeholder="••••••••" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" />
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                        <div className="space-y-3">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">New Password</label>
                                                            <input type="password" placeholder="••••••••" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" />
                                                        </div>
                                                        <div className="space-y-3">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Confirm Identity</label>
                                                            <input type="password" placeholder="••••••••" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" />
                                                        </div>
                                                    </div>
                                                    <div className="pt-6">
                                                        <button type="submit" className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200">Reset Password</button>
                                                    </div>
                                                </form>
                                            </section>
                                        </div>
                                    )}

                                    {activeTab === 'appearance' && (
                                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                            <section>
                                                <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Interface Theme</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                    <button className="p-10 rounded-[3.5rem] border-4 border-indigo-600 bg-white text-left group shadow-2xl shadow-indigo-100">
                                                        <div className="w-full h-32 bg-slate-50 rounded-3xl mb-6 border border-slate-100 overflow-hidden p-4 space-y-3">
                                                            <div className="w-1/3 h-4 bg-indigo-600 rounded-full"></div>
                                                            <div className="w-full h-4 bg-slate-200 rounded-full"></div>
                                                            <div className="w-2/3 h-4 bg-slate-200 rounded-full"></div>
                                                        </div>
                                                        <span className="font-black text-2xl text-slate-900">Pristine Light</span>
                                                        <p className="text-xs text-indigo-600 font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                                                            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
                                                            Active Theme
                                                        </p>
                                                    </button>
                                                    <button className="p-10 rounded-[3.5rem] border-4 border-transparent bg-slate-900 text-left hover:border-indigo-600 transition-all group overflow-hidden relative">
                                                        <div className="absolute top-0 right-0 p-4">
                                                            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest">Locked</span>
                                                        </div>
                                                        <div className="w-full h-32 bg-slate-800 rounded-3xl mb-6 border border-slate-700 overflow-hidden p-4 space-y-3 blur-[2px]">
                                                            <div className="w-1/3 h-4 bg-indigo-500 rounded-full"></div>
                                                            <div className="w-full h-4 bg-slate-700 rounded-full"></div>
                                                            <div className="w-2/3 h-4 bg-slate-700 rounded-full"></div>
                                                        </div>
                                                        <span className="font-black text-2xl text-white">Midnight Noir</span>
                                                        <p className="text-xs text-slate-500 font-black uppercase tracking-widest mt-2">Experimental Phase</p>
                                                    </button>
                                                </div>
                                            </section>
                                        </div>
                                    )}

                                    {activeTab === 'notifications' && (
                                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                            <section>
                                                <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Alert Preferences</h3>
                                                <div className="space-y-6">
                                                    {[
                                                        { title: 'Global Email Sync', desc: 'Summary of your activity delivered weekly', active: true, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                                        { title: 'Real-time Push', desc: 'Instant notifications for any transaction', active: true, icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
                                                        { title: 'Anomalous Spending', desc: 'Alert when unusual patterns are detected', active: false, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' }
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center justify-between p-8 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-transparent transition-all duration-300 group cursor-pointer">
                                                            <div className="flex items-center gap-6">
                                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${item.active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-slate-100 text-slate-400'}`}>
                                                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} /></svg>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                                                                    <p className="text-slate-400 text-sm font-bold">{item.desc}</p>
                                                                </div>
                                                            </div>
                                                            <div className={`w-16 h-9 rounded-full relative p-1.5 transition-all duration-500 cursor-pointer ${item.active ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'bg-slate-200'}`}>
                                                                <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-all duration-500 transform ${item.active ? 'translate-x-7' : 'translate-x-0'}`}></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
