import React, { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Navbar from '../components/Navbar';
import Sidebar from '../components/sidebar';
import axios from 'axios';

const Accounts = () => {
    const [linkToken, setLinkToken] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch link token from backend
    const getLinkToken = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/plaid/create_link_token', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLinkToken(response.data.link_token);
        } catch (error) {
            console.error("Error fetching link token", error);
        }
    };

    // Fetch connected accounts
    const fetchAccounts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/plaid/accounts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAccounts(response.data.accounts || []);
        } catch (error) {
            console.error("Error fetching accounts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLinkToken();
        fetchAccounts();
    }, []);

    const onSuccess = useCallback(async (public_token, metadata) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/plaid/exchange_public_token', 
                { public_token, metadata },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchAccounts(); // Refresh list after linking
        } catch (error) {
            console.error("Error exchanging token", error);
        }
    }, []);

    const config = {
        token: linkToken,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            <div className="hidden md:block">
                <Sidebar />
            </div>
            
            <div className="flex-1 flex flex-col">
                <Navbar />
                
                <main className="p-8 space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Linked Accounts</h1>
                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Manage your connected bank accounts</p>
                        </div>
                        <button 
                            onClick={() => open()} 
                            disabled={!ready}
                            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:shadow-indigo-400/40 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                        >
                            + Link New Bank
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white h-48 rounded-[2rem] border border-slate-100"></div>
                            ))}
                        </div>
                    ) : accounts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {accounts.map((account) => (
                                <div key={account.account_id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold">
                                            {account.subtype.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{account.subtype}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-1">{account.name}</h3>
                                    <p className="text-slate-400 font-bold text-sm mb-6">•••• {account.mask}</p>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
                                            <p className="text-3xl font-black text-slate-900">${account.balances.available || account.balances.current}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-100">
                            <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">No Accounts Linked</h2>
                            <p className="text-slate-400 font-medium mb-8 max-w-sm mx-auto">Link your bank account via Plaid to securely import and track your transactions automatically.</p>
                            <button 
                                onClick={() => open()} 
                                disabled={!ready}
                                className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:shadow-indigo-400/40 transition-all"
                            >
                                Link Your First Bank
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Accounts;
