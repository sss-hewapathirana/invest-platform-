import React from 'react';
import { BarChart3 } from 'lucide-react';

const Header = ({ currentPage, onNavigate, isLoggedIn }) => {
return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-xl sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
        {/* Logo */}
        <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'home')}
        >
            <div className="bg-white rounded-full p-2 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-8 h-8 text-blue-900" />
            </div>
            <div>
            <h1 className="text-2xl font-bold">Invezt</h1>
            <p className="text-xs text-blue-200">Investing Made Simple</p>
            </div>
        </div>
        
        {/* Navigation */}
        {isLoggedIn ? (
            <nav className="hidden md:flex space-x-6">
            {['dashboard', 'analyzer', 'compare', 'portfolio', 'valuation', 'news'].map((page) => (
                <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`capitalize hover:text-blue-200 transition-all px-3 py-2 rounded-lg ${
                    currentPage === page ? 'bg-blue-600 text-white font-semibold' : 'text-blue-100'
                }`}
                >
                {page === 'valuation' ? 'Models' : page}
                </button>
            ))}
            <button 
                onClick={() => {
                localStorage.removeItem('token');
                onNavigate('home');
                }} 
                className="text-red-300 hover:text-red-100 transition-colors px-3 py-2"
            >
                Logout
            </button>
            </nav>
        ) : (
            <div className="flex space-x-4">
            <button 
                onClick={() => onNavigate('login')} 
                className="px-6 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-blue-900 transition-all"
            >
                Login
            </button>
            <button 
                onClick={() => onNavigate('login')} 
                className="px-6 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-all font-semibold shadow-lg"
            >
                Sign Up
            </button>
            </div>
        )}
        </div>
    </div>
    </header>
);
};

export default Header;