import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { portfolioAPI, stockAPI } from '../services/api';

const PortfolioPage = ({ onNavigate }) => {
const [portfolioItems, setPortfolioItems] = useState([]);
const [newItem, setNewItem] = useState({
    symbol: '',
    shares: '',
    avgCost: '',
    currentPrice: ''
});
const [loading, setLoading] = useState(false);

useEffect(() => {
    fetchPortfolio();
}, []);

const fetchPortfolio = async () => {
    try {
    const response = await portfolioAPI.getAll();
    setPortfolioItems(response.data);
    } catch (error) {
    console.error('Error fetching portfolio:', error);
    }
};

const handleAddItem = async () => {
    setLoading(true);
    try {
    await portfolioAPI.addItem(1, newItem); // Portfolio ID = 1
    await fetchPortfolio();
    setNewItem({ symbol: '', shares: '', avgCost: '', currentPrice: '' });
    } catch (error) {
    console.error('Error adding portfolio item:', error);
    } finally {
    setLoading(false);
    }
};

const handleRemoveItem = async (itemId) => {
    try {
    await portfolioAPI.removeItem(1, itemId);
    await fetchPortfolio();
    } catch (error) {
    console.error('Error removing portfolio item:', error);
    }
};

const calculateGainLoss = (avgCost, currentPrice, shares) => {
    const total = (currentPrice - avgCost) * shares;
    const pct = ((currentPrice - avgCost) / avgCost) * 100;
    return { total, pct };
};

const portfolioData = [
    { month: 'Jan', value: 25000 }, { month: 'Feb', value: 26500 }, { month: 'Mar', value: 27800 },
    { month: 'Apr', value: 29000 }, { month: 'May', value: 31000 }, { month: 'Jun', value: 33000 }
];

return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-3xl p-10 mb-10 shadow-2xl">
        <h1 className="text-4xl font-bold mb-4">Portfolio & Watchlist</h1>
        <p className="text-green-100">View, track, and manage your selected stocks</p>
    </div>

    {/* Add to Portfolio */}
    <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add to Portfolio</h2>
        <div className="grid md:grid-cols-4 gap-4 mb-4">
        <input 
            type="text" 
            placeholder="Company/Ticker" 
            value={newItem.symbol}
            onChange={(e) => setNewItem({...newItem, symbol: e.target.value})}
            className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500" 
        />
        <input 
            type="number" 
            placeholder="Shares" 
            value={newItem.shares}
            onChange={(e) => setNewItem({...newItem, shares: e.target.value})}
            className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500" 
        />
        <input 
            type="number" 
            placeholder="Purchase Price" 
            value={newItem.avgCost}
            onChange={(e) => setNewItem({...newItem, avgCost: e.target.value})}
            className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500" 
        />
        <input 
            type="number" 
            placeholder="Current Price" 
            value={newItem.currentPrice}
            onChange={(e) => setNewItem({...newItem, currentPrice: e.target.value})}
            className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500" 
        />
        </div>
        <button 
        onClick={handleAddItem}
        disabled={loading}
        className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-50"
        >
        {loading ? 'Adding...' : 'Add to Portfolio'}
        </button>
    </div>

    {/* Portfolio Table */}
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="p-6 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <h2 className="text-2xl font-bold">My Portfolio</h2>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full">
            <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Company</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Shares</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Avg Cost</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Current</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Value</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Gain/Loss</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Action</th>
            </tr>
            </thead>
            <tbody>
            {portfolioItems.map((item, i) => {
                const { total, pct } = calculateGainLoss(item.avgCost, item.currentPrice, item.shares);
                return (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-gray-800">{item.symbol}</td>
                    <td className="px-6 py-4 text-gray-700">{item.shares}</td>
                    <td className="px-6 py-4 text-gray-700">LKR {item.avgCost}</td>
                    <td className="px-6 py-4 text-gray-700">LKR {item.currentPrice}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">LKR {(item.currentPrice * item.shares).toLocaleString()}</td>
                    <td className={`px-6 py-4 font-bold ${pct > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {pct > 0 ? '+' : ''}{pct.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4">
                    <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                    >
                        Remove
                    </button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    </div>

    {/* Portfolio Growth Chart */}
    <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Portfolio Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={portfolioData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>
    </div>
    </div>
);
};

export default PortfolioPage;