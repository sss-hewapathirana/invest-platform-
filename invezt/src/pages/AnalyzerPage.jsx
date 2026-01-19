import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { stockAPI, analysisAPI } from '../services/api';

const AnalyzerPage = ({ onNavigate }) => {
const [searchTerm, setSearchTerm] = useState('');
const [stocks, setStocks] = useState([]);
const [selectedStock, setSelectedStock] = useState(null);
const [loading, setLoading] = useState(false);
const [analysisData, setAnalysisData] = useState(null);

useEffect(() => {
    fetchStocks();
}, []);

const fetchStocks = async () => {
    try {
    const response = await stockAPI.getAll();
    setStocks(response.data);
    } catch (error) {
    console.error('Error fetching stocks:', error);
    }
};

const handleSearch = async () => {
    setLoading(true);
    try {
    const response = await stockAPI.search(searchTerm);
    if (response.data.length > 0) {
        setSelectedStock(response.data[0]);
        // Fetch analysis data
        const analysis = await analysisAPI.performValuation({ symbol: response.data[0].symbol });
        setAnalysisData(analysis.data);
    }
    } catch (error) {
    console.error('Error searching stock:', error);
    } finally {
    setLoading(false);
    }
};

const ratios = [
    { name: 'P/E Ratio', value: selectedStock?.peRatio || '18.3', status: 'good', description: 'Price to Earnings' },
    { name: 'PEG Ratio', value: selectedStock?.pegRatio || '1.1', status: 'good', description: 'PE to Growth' },
    { name: 'ROE', value: selectedStock?.roe ? `${selectedStock.roe}%` : '12.5%', status: 'excellent', description: 'Return on Equity' },
    { name: 'EPS', value: selectedStock?.epsRatio || 'LKR 8.45', status: 'good', description: 'Earnings Per Share' },
    { name: 'Debt/Equity', value: selectedStock?.debtToEquity || '0.45', status: 'good', description: 'Leverage Ratio' },
    { name: 'Current Ratio', value: selectedStock?.currentRatio || '1.8', status: 'good', description: 'Liquidity' },
];

return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    {/* Search Section */}
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-10 mb-10 shadow-2xl">
        <h1 className="text-4xl font-bold mb-4">Stock Analyzer</h1>
        <p className="text-blue-100 mb-6">Search and analyze any CSE-listed stock with AI-powered insights</p>
        
        <div className="flex gap-4">
        <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter company name or ticker (e.g., JKH.N0000)"
            className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 text-lg focus:ring-4 focus:ring-blue-300"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
        </div>
        <button 
            onClick={handleSearch} 
            disabled={loading}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg disabled:opacity-50"
        >
            {loading ? 'Searching...' : 'Analyze'}
        </button>
        </div>
    </div>

    {/* Stock Details */}
    {selectedStock ? (
        <div>
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
            <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">{selectedStock.companyName}</h2>
                <p className="text-gray-600 text-lg">{selectedStock.symbol}</p>
            </div>
            <div className="text-right">
                <p className="text-4xl font-bold text-gray-800">LKR {selectedStock.currentPrice}</p>
                <div className="flex items-center justify-end space-x-2 mt-2">
                {selectedStock.change > 0 ? 
                    <TrendingUp className="w-5 h-5 text-green-600" /> : 
                    <TrendingDown className="w-5 h-5 text-red-600" />
                }
                <p className={`font-bold text-lg ${selectedStock.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedStock.change > 0 ? '+' : ''}{selectedStock.change}%
                </p>
                </div>
            </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Sector</p>
                <p className="font-bold text-gray-800">{selectedStock.sector}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Market Cap</p>
                <p className="font-bold text-gray-800">LKR {selectedStock.marketCap}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Founded</p>
                <p className="font-bold text-gray-800">{selectedStock.foundedYear || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">CEO</p>
                <p className="font-bold text-gray-800">{selectedStock.ceo || 'N/A'}</p>
            </div>
            </div>
        </div>

        {/* Financial Ratios */}
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Financial Ratios</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
            {ratios.map((ratio, i) => (
            <div 
                key={i} 
                className={`p-6 rounded-2xl shadow-lg ${
                ratio.status === 'excellent' ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500' :
                ratio.status === 'good' ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500' :
                'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-500'
                }`}
            >
                <p className="text-sm text-gray-600 mb-1">{ratio.description}</p>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{ratio.name}</h4>
                <p className="text-3xl font-bold text-gray-900">{ratio.value}</p>
            </div>
            ))}
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 p-8 rounded-2xl text-center shadow-xl">
            <h3 className="text-2xl font-bold text-green-800 mb-2">Recommendation: BUY</h3>
            <p className="text-green-700">Based on fundamental analysis, this stock appears undervalued with strong growth potential.</p>
        </div>
        </div>
    ) : (
        <div className="bg-white p-16 rounded-2xl shadow-lg text-center">
        <BarChart3 className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Search for a Stock</h3>
        <p className="text-gray-600">Enter a company name or ticker symbol above to begin analysis</p>
        </div>
    )}
    </div>
);
};

export default AnalyzerPage;