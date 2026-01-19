import React, { useState } from 'react';
import { analysisAPI } from '../services/api';

const ComparePage = ({ onNavigate }) => {
const [companies, setCompanies] = useState(['JKH.N0000', 'COMB.N0000', 'HNB.N0000']);
const [comparisonData, setComparisonData] = useState([
    { metric: 'P/E Ratio', jkh: '18.3', comb: '6.7', hnb: '5.2' },
    { metric: 'PEG Ratio', jkh: '1.1', comb: '0.8', hnb: '0.6' },
    { metric: 'ROE', jkh: '12.5%', comb: '15.8%', hnb: '18.2%' },
    { metric: 'EPS (LKR)', jkh: '8.45', comb: '25.30', hnb: '32.15' },
    { metric: 'Dividend Yield', jkh: '2.1%', comb: '4.5%', hnb: '5.2%' },
]);
const [loading, setLoading] = useState(false);

const handleCompare = async () => {
    setLoading(true);
    try {
    const response = await analysisAPI.compareStocks(companies);
    setComparisonData(response.data);
    } catch (error) {
    console.error('Error comparing stocks:', error);
    } finally {
    setLoading(false);
    }
};

return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-10 mb-10 shadow-2xl">
        <h1 className="text-4xl font-bold mb-4">Company Comparison</h1>
        <p className="text-purple-100">Compare up to 3 CSE-listed companies side by side</p>
    </div>

    {/* Company Selection */}
    <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Companies</h2>
        <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
            <div key={i}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company {i}</label>
            <input
                type="text"
                value={companies[i-1]}
                onChange={(e) => {
                const newCompanies = [...companies];
                newCompanies[i-1] = e.target.value;
                setCompanies(newCompanies);
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., JKH.N0000"
            />
            </div>
        ))}
        </div>
        <button 
        onClick={handleCompare}
        disabled={loading}
        className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg disabled:opacity-50"
        >
        {loading ? 'Comparing...' : 'Compare Companies'}
        </button>
    </div>

    {/* Comparison Table */}
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
                <th className="px-6 py-4 text-left font-bold">Financial Metric</th>
                <th className="px-6 py-4 text-left font-bold">JKH</th>
                <th className="px-6 py-4 text-left font-bold">COMB</th>
                <th className="px-6 py-4 text-left font-bold">HNB</th>
            </tr>
            </thead>
            <tbody>
            {comparisonData.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 font-semibold text-gray-800">{row.metric}</td>
                <td className="px-6 py-4 text-gray-700">{row.jkh}</td>
                <td className="px-6 py-4 text-gray-700">{row.comb}</td>
                <td className="px-6 py-4 text-gray-700">{row.hnb}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>

    {/* Recommendations */}
    <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 p-8 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-green-800 mb-3">Best for Value Investing</h3>
        <p className="text-2xl font-bold text-green-900 mb-2">HNB (Hatton National Bank)</p>
        <p className="text-green-700">Lowest P/E and P/B ratios with highest ROE and dividend yield</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 p-8 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-blue-800 mb-3">Best for Growth Investing</h3>
        <p className="text-2xl font-bold text-blue-900 mb-2">JKH (John Keells Holdings)</p>
        <p className="text-blue-700">Diversified business model with consistent growth across sectors</p>
        </div>
    </div>
    </div>
);
};

export default ComparePage;