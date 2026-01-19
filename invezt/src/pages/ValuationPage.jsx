import React from 'react';

const ValuationPage = ({ onNavigate }) => {
const models = [
    {
    title: 'CAPM (Capital Asset Pricing Model)',
    formula: 'ER = Rf + β(ERm - Rf)',
    description: 'Determines expected return on investment given its risk relative to market',
    components: ['Rf: Risk-free rate (Sri Lanka T-bills)', 'β: Beta (stock volatility vs CSE)', 'ERm: Expected CSE market return']
    },
    {
    title: 'DCF (Discounted Cash Flow)',
    formula: 'Value = Σ [CFt / (1 + r)^t]',
    description: 'Values company based on projected future cash flows discounted to present value',
    components: ['CFt: Cash flow in period t', 'r: Discount rate', 't: Time period']
    },
    {
    title: 'P/E Ratio (Price to Earnings)',
    formula: 'P/E = Stock Price / EPS',
    description: 'Measures how much investors pay per dollar of earnings',
    components: ['High P/E: Growth expectations', 'Low P/E: Value opportunity', 'Compare with industry peers']
    },
    {
    title: 'PEG Ratio (P/E to Growth)',
    formula: 'PEG = P/E Ratio / Earnings Growth Rate',
    description: 'Refines P/E by considering earnings growth expectations',
    components: ['PEG < 1: Potentially undervalued', 'PEG > 1: Potentially overvalued', 'PEG = 1: Fairly valued']
    },
    {
    title: 'ROE (Return on Equity)',
    formula: 'ROE = Net Income / Shareholders Equity',
    description: 'Measures how effectively company uses shareholders money to generate profits',
    components: ['>15%: Excellent', '8-15%: Good', '<8%: Poor']
    },
    {
    title: 'Dividend Discount Model',
    formula: 'Value = D1 / (r - g)',
    description: 'Values stock based on present value of future dividends',
    components: ['D1: Next dividend payment', 'r: Required rate of return', 'g: Dividend growth rate']
    }
];

return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-3xl p-10 mb-10 shadow-2xl">
        <h1 className="text-4xl font-bold mb-4">Valuation Models Reference</h1>
        <p className="text-orange-100">Learn about different stock valuation methods and financial ratios</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
        {models.map((model, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-orange-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{model.title}</h3>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl mb-4 border-l-4 border-orange-500">
            <code className="text-lg font-mono text-gray-800">{model.formula}</code>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">{model.description}</p>
            <div className="bg-blue-50 p-4 rounded-xl">
            <p className="font-bold text-gray-800 mb-2">Key Components:</p>
            <ul className="space-y-2">
                {model.components.map((comp, j) => (
                <li key={j} className="text-gray-700 text-sm">• {comp}</li>
                ))}
            </ul>
            </div>
            <button className="mt-6 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg w-full">
            Try Calculator
            </button>
        </div>
        ))}
    </div>
    </div>
);
};

export default ValuationPage;