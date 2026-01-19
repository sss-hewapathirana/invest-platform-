import { BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { authAPI } from '../services/api';

const LoginPage = ({ onNavigate, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await authAPI.login(email, password);
            // response is already the ApiResponse object due to interceptor
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({ email: response.data.email, role: response.data.role }));
            onLogin();
            onNavigate('dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-4 mb-4 shadow-lg">
                        <BarChart3 className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to continue to Invezt</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="you@example.com"
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="••••••••"
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all disabled:opacity-50 shadow-lg"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>

                    <div className="text-center space-y-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium block w-full text-center">
                            Forgot Password?
                        </button>
                        <div className="text-sm text-gray-600">
                            Don't have an account? {' '}
                            <button
                                onClick={() => onNavigate('signup')}
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => onNavigate('home')}
                        className="text-gray-600 hover:text-gray-800 text-sm flex items-center justify-center mx-auto"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;