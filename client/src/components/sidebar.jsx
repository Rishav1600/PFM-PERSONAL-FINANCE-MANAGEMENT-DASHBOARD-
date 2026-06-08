import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-indigo-800 text-white w-full md:w-64 flex-shrink-0 flex flex-col min-h-screen md:min-h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-2">
                <span className="text-indigo-800 font-black text-sm">P</span>
            </div>
            PFM Tool
        </h2>
      </div>
      
      <nav className="mt-4 flex-1">
        <ul className="space-y-1">
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive('/dashboard') 
                  ? 'bg-indigo-900 text-white border-l-4 border-indigo-400' 
                  : 'text-indigo-100 hover:bg-indigo-700 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={`flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive('/profile') 
                  ? 'bg-indigo-900 text-white border-l-4 border-indigo-400' 
                  : 'text-indigo-100 hover:bg-indigo-700 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span className="font-medium">Profile</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className={`flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive('/settings') 
                  ? 'bg-indigo-900 text-white border-l-4 border-indigo-400' 
                  : 'text-indigo-100 hover:bg-indigo-700 hover:text-white border-l-4 border-transparent'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="font-medium">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-6 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-indigo-700 hover:bg-indigo-600 text-white py-2.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/20 active:scale-95"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
