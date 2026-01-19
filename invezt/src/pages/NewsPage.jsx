import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { newsAPI } from '../services/api';

const NewsPage = ({ onNavigate }) => {
const [news, setNews] = useState([]);
const [notifications, setNotifications] = useState({
    priceAlertsPush: true,
    priceAlertsEmail: false,
    earningsReportsPush: true,
    quarterlyReportsEmail: true,
    marketNewsUpdates: true
});
const [loading, setLoading] = useState(true);

useEffect(() => {
    fetchNews();
}, []);

const fetchNews = async () => {
    try {
    const response = await newsAPI.getAll();
    setNews(response.data);
    } catch (error) {
    console.error('Error fetching news:', error);
    // Fallback to mock data
    setNews([
        { id: 1, title: 'John Keells Holdings Reports Strong Q3 Earnings', date: 'Nov 7, 2024', summary: 'JKH posts 25% growth in quarterly profits driven by robust performance in leisure and transportation sectors.' },
        { id: 2, title: 'Commercial Bank Expands Digital Banking Services', date: 'Nov 6, 2024', summary: 'COMB launches new mobile banking features targeting youth market, expects 30% digital transaction growth.' },
        { id: 3, title: 'Hatton National Bank Announces Dividend Increase', date: 'Nov 5, 2024', summary: 'HNB board approves 15% dividend hike citing strong capital adequacy and improved asset quality.' },
        { id: 4, title: 'ASPI Reaches 12,500 Points Amid Economic Recovery', date: 'Nov 4, 2024', summary: 'Colombo Stock Exchange main index climbs to 12-month high as foreign investors return to Sri Lankan markets.' },
    ]);
    } finally {
    setLoading(false);
    }
};

const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
};

const handleSaveSettings = () => {
    console.log('Saving settings:', notifications);
    // TODO: Call API to save settings
};

return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-3xl p-10 mb-10 shadow-2xl">
        <h1 className="text-4xl font-bold mb-4">Latest News & Notifications</h1>
        <p className="text-red-100">Stay updated with market news and configure your alerts</p>
    </div>

    {/* News Grid */}
    <div className="grid md:grid-cols-2 gap-8 mb-8">
        {news.map((item) => (
        <div key={item.id} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
            <div className="bg-gradient-to-r from-red-50 to-pink-50 px-4 py-2 rounded-lg mb-4 inline-block">
            <p className="text-sm font-semibold text-red-700">{item.date}</p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">{item.summary}</p>
            <button className="text-red-600 font-bold hover:text-red-800 transition-colors flex items-center">
            Read More <ChevronRight className="w-4 h-4 ml-1" />
            </button>
        </div>
        ))}
    </div>

    {/* Notification Settings */}
    <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Bell className="w-6 h-6 mr-2 text-red-600" />
        Notification Settings
        </h2>
        <div className="space-y-4">
        {[
            { key: 'priceAlertsPush', label: 'Price Alerts (Push)' },
            { key: 'priceAlertsEmail', label: 'Price Alerts (Email)' },
            { key: 'earningsReportsPush', label: 'Earnings Reports (Push)' },
            { key: 'quarterlyReportsEmail', label: 'Quarterly Reports (Email)' },
            { key: 'marketNewsUpdates', label: 'Market News Updates' }
        ].map((setting) => (
            <div key={setting.key} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
            <label className="font-semibold text-gray-800">{setting.label}</label>
            <button
                onClick={() => handleToggle(setting.key)}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                notifications[setting.key] ? 'bg-green-500' : 'bg-gray-300'
                }`}
            >
                <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[setting.key] ? 'translate-x-7' : 'translate-x-1'
                }`}
                />
            </button>
            </div>
        ))}
        </div>
        <button 
        onClick={handleSaveSettings}
        className="mt-6 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:from-red-700 hover:to-pink-700 transition-all shadow-lg"
        >
        Save Settings
        </button>
    </div>
    </div>
);
};

export default NewsPage;