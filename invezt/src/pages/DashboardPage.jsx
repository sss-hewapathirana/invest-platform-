import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { stockAPI } from '../services/api';

const DashboardPage = ({ onNavigate }) => {
const [marketData, setMarketData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    fetchMarketData();
}, []);

const fetchMarketData = async () => {
    try {
    const response = await stockAPI.getAll();
    setMarketData(response.data);
    } catch (error) {
    console.error('Error fetching market data:', error);
    } finally {
    setLoading(false);
    }
};

const portfolioData = [
    { month: 'Jan', value: 25000 },
    { month: 'Feb', value: 26500 },
    { month: 'Mar', value: 27800 },
    { month: 'Apr', value: 29000 },
    { month: 'May', value: 31000 },
    { month: 'Jun', value: 33000 }
];

return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    {/* Welcome Banner */}
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white rounded-3xl p-10 mb-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-3">Welcome Back!</h1>
        <p className="text-blue-100 text-lg">Track, analyze, and manage your investments in Sri Lankan stocks</p>
        </div>
    </div>

    {/* Quick Actions */}
    <h2 className="text-3xl font-bold mb-8 text-gray-800">Quick Actions</h2>
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {[
        { title: 'Analyze Stock', desc: 'Search any Sri Lankan stock', page: 'analyzer', icon: '🔍', color: 'from-blue-500 to-blue-600' },
        { title: 'Compare Companies', desc: 'Compare up to 3 companies', page: 'compare', icon: '⚖️', color: 'from-purple-500 to-purple-600' },
        { title: 'Portfolio', desc: 'Manage your portfolio', page: 'portfolio', icon: '💼', color: 'from-green-500 to-green-600' },
        { title: 'Valuation Models', desc: 'Learn CAPM, DCF models', page: 'valuation', icon: '📚', color: 'from-orange-500 to-orange-600' },
        { title: 'Market News', desc: 'Latest market updates', page: 'news', icon: '📰', color: 'from-red-500 to-red-600' }
        ].map((action, i) => (
        <div
            key={i}
            onClick={() => onNavigate(action.page)}
            className={`bg-gradient-to-br ${action.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all cursor-pointer`}
        >
            <div className="text-4xl mb-4">{action.icon}</div>
            <h3 className="font-bold text-lg mb-2">{action.title}</h3>
            <p className="text-sm text-white opacity-90 mb-4">{action.desc}</p>
            <button className="text-white font-semibold hover:underline flex items-center">
            Go <ChevronRight className="w-4 h-4 ml-1" />
            </button>
        </div>
        ))}
    </div>

    {/* Market Highlights */}
    <h2 className="text-3xl font-bold mb-8 text-gray-800">Market Highlights</h2>
    <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
        { title: 'ASPI', value: '12,450.75', change: '+1.2%', positive: true },
        { title: 'S&P SL20', value: '3,845.20', change: '+0.8%', positive: true },
        { title: 'LKR/USD', value: '322.50', change: '-0.15', positive: false }
        ].map((stat, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-600">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">{stat.title}</h3>
            <p className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</p>
            <div className="flex items-center space-x-2">
            {stat.positive ? 
                <TrendingUp className="w-5 h-5 text-green-600" /> : 
                <TrendingDown className="w-5 h-5 text-red-600" />
            }
            <p className={`font-bold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
            </p>
            </div>
        </div>
        ))}
    </div>

    {/* Portfolio Growth Chart */}
    <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Portfolio Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={350}>
        <LineChart data={portfolioData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
            contentStyle={{ 
                backgroundColor: '#f9fafb', 
                border: 'none', 
                borderRadius: '8px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
            }} 
            />
            <Legend />
            <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#1e3a8a" 
            strokeWidth={4} 
            dot={{ fill: '#1e3a8a', r: 6 }} 
            />
        </LineChart>
        </ResponsiveContainer>
    </div>
    </div>
);
};

export default DashboardPage;