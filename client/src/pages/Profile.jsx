import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/sidebar';
import avatarImg from '../assets/avatar.png';

const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  
  // Password Change State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
    setEditName(name);
    const storedEmail = localStorage.getItem('userEmail');
    const email = storedEmail || (name.toLowerCase().replace(' ', '') + '@example.com');
    setUserEmail(email);
    setEditEmail(email);
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setUserName(editName);
    setUserEmail(editEmail);
    localStorage.setItem('userName', editName);
    localStorage.setItem('userEmail', editEmail);
    setIsEditing(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match!");
      return;
    }
    setLoading(true);
    try {
      await authService.updatePassword({ currentPassword, newPassword });
      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setIsChangingPassword(false), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans text-slate-900">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Immersive Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 -z-10">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f8fafc] to-transparent"></div>
        </div>

        <Navbar />

        <main className="flex-1 p-4 md:p-12 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Premium Profile Hero Card */}
            <div className="bg-white/80 backdrop-blur-2xl rounded-[3.5rem] shadow-2xl shadow-indigo-200/40 overflow-hidden border border-white/50 mb-12 transition-all duration-500 hover:shadow-indigo-300/50">
              <div className="px-8 md:px-16 pb-16 pt-12">
                <div className="relative flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
                  <div className="relative group">
                    <div className="h-48 w-48 rounded-[3.5rem] bg-white p-4 shadow-2xl relative transition-transform duration-700 group-hover:scale-105">
                        <div className="h-full w-full rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-inner">
                            <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all border-4 border-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">{userName}</h2>
                          <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest inline-block w-fit mx-auto md:mx-0 shadow-sm border border-indigo-200">Premium Member</span>
                      </div>
                      <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center md:justify-start gap-2">
                          <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                          {userEmail}
                      </p>
                  </div>

                  <div className="flex gap-4">
                      <button 
                        onClick={() => setIsEditing(true)} 
                        className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-sm hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:-translate-y-1 active:scale-95"
                      >
                        Edit Profile
                      </button>
                  </div>
                </div>

                {/* Profile Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-slate-100/50">
                    {[
                        { label: 'Member Since', value: 'May 2024', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-blue-600 bg-blue-50' },
                        { label: 'Total Assets', value: '$24,500.00', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-emerald-600 bg-emerald-50' },
                        { label: 'Monthly Growth', value: '+14.2%', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'text-indigo-600 bg-indigo-50' }
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-5 p-6 rounded-[2.5rem] bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-xl hover:border-transparent transition-all duration-300 group">
                            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={stat.icon} /></svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-lg font-black text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Account Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Security & Privacy Section */}
              <section className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 h-full transition-all hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Security Hub</h3>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-0.5">Protect your financial identity</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                  <button 
                    onClick={() => setIsChangingPassword(true)}
                    className="w-full flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 hover:bg-indigo-600 hover:text-white transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-rose-500 group-hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                        </div>
                        <span className="font-black">Change Password</span>
                    </div>
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                  </button>

                  <button className="w-full flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 hover:bg-indigo-600 hover:text-white transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-blue-500 group-hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <span className="font-black">Two-Factor Auth</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-slate-200 group-hover:bg-white/20 px-3 py-1 rounded-md">Disabled</span>
                  </button>
                </div>
              </section>

              {/* Preferences Section */}
              <section className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 h-full transition-all hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">App Preferences</h3>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-0.5">Customize your experience</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'Language', value: 'English (US)', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.19 15.624 5 18' },
                        { label: 'Currency', value: 'USD ($)', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                    ].map((pref, i) => (
                        <div key={i} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-transparent transition-all group cursor-pointer">
                            <svg className="w-6 h-6 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={pref.icon} /></svg>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{pref.label}</p>
                            <p className="text-sm font-black text-slate-900">{pref.value}</p>
                        </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Modern Glassmorphic Modal for Edit Profile */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[3.5rem] shadow-2xl w-full max-w-md overflow-hidden p-12 animate-in zoom-in-95 duration-300 border border-white/50">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Edit Profile</h3>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-3 bg-slate-50 rounded-2xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <form onSubmit={handleUpdateProfile} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Display Name</label>
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)} 
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Connection</label>
                  <input 
                    type="email" 
                    value={editEmail} 
                    onChange={(e) => setEditEmail(e.target.value)} 
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" 
                    required 
                  />
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="submit" className="flex-1 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">Save Changes</button>
                </div>
              </form>
          </div>
        </div>
      )}

      {/* Modern Glassmorphic Modal for Change Password */}
      {isChangingPassword && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[3.5rem] shadow-2xl w-full max-w-md overflow-hidden p-12 animate-in zoom-in-95 duration-300 border border-white/50">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Security</h3>
                <button onClick={() => setIsChangingPassword(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-3 bg-slate-50 rounded-2xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              {error && <div className="mb-8 p-6 bg-rose-50 text-rose-700 rounded-3xl text-xs font-black border-l-8 border-rose-500 shadow-sm">{error}</div>}
              {success && <div className="mb-8 p-6 bg-emerald-50 text-emerald-700 rounded-3xl text-xs font-black border-l-8 border-emerald-500 shadow-sm">{success}</div>}
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Identity</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-700" required />
                </div>
                <div className="pt-6">
                  <button type="submit" disabled={loading} className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">{loading ? 'Processing...' : 'Update Password'}</button>
                </div>
              </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
