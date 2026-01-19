import { ChevronRight, TrendingDown, TrendingUp } from 'lucide-react';

const HomePage = ({ onNavigate }) => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-6xl font-bold mb-6">Smart Stock Valuation for Sri Lankan Investors</h1>
                    <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
                        Analyze, compare, and track CSE-listed stocks using advanced valuation models and AI-powered insights
                    </p>
                    <button
                        onClick={() => onNavigate('signup')}
                        className="bg-white text-blue-900 px-10 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transform hover:scale-110 transition-all shadow-2xl inline-flex items-center space-x-2"
                    >
                        <span>Get Started with CSE Analysis</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Powerful Features for Smart Investing</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            title: 'Stock Analysis',
                            desc: 'Deep dive into CSE company financials with AI-powered insights',
                            icon: '📊',
                            color: 'from-blue-500 to-blue-700'
                        },
                        {
                            title: 'Company Comparison',
                            desc: 'Compare up to 3 CSE-listed companies side by side',
                            icon: '⚖️',
                            color: 'from-purple-500 to-purple-700'
                        },
                        {
                            title: 'Portfolio Management',
                            desc: 'Build, track and optimize your investment portfolio',
                            icon: '💼',
                            color: 'from-green-500 to-green-700'
                        },
                        {
                            title: 'Smart Watchlist',
                            desc: 'Monitor your favorite CSE stocks with real-time alerts',
                            icon: '👁️',
                            color: 'from-orange-500 to-orange-700'
                        }
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className={`bg-gradient-to-br ${feature.color} text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all cursor-pointer`}
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-blue-50">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Companies Section */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Featured CSE Companies</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'John Keells Holdings', symbol: 'JKH', price: 'LKR 148.50', change: '+2.1%', positive: true },
                            { name: 'Commercial Bank', symbol: 'COMB', price: 'LKR 85.75', change: '+1.5%', positive: true },
                            { name: 'Hatton National Bank', symbol: 'HNB', price: 'LKR 165.20', change: '+1.8%', positive: true },
                            { name: 'LOLC Holdings', symbol: 'LOLC', price: 'LKR 425.60', change: '+3.2%', positive: true },
                            { name: 'Sampath Bank', symbol: 'SAMP', price: 'LKR 68.90', change: '+0.9%', positive: true },
                            { name: 'Hemas Holdings', symbol: 'HHL', price: 'LKR 72.40', change: '-1.2%', positive: false }
                        ].map((company, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-l-4 border-blue-600 transform hover:-translate-y-2"
                            >
                                <h4 className="font-bold text-xl text-gray-800">{company.name}</h4>
                                <p className="text-gray-500 text-sm mb-3">{company.symbol}</p>
                                <p className="text-3xl font-bold text-gray-800 mb-2">{company.price}</p>
                                <div className="flex items-center space-x-2">
                                    {company.positive ?
                                        <TrendingUp className="w-5 h-5 text-green-600" /> :
                                        <TrendingDown className="w-5 h-5 text-red-600" />
                                    }
                                    <p className={`font-bold ${company.positive ? 'text-green-600' : 'text-red-600'}`}>
                                        {company.change}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;