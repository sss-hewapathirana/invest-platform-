import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { authAPI } from '../services/api';

const SignupPage = ({ onNavigate, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!email || !password || !fullName) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await authAPI.signup({ email, password, fullName });
            // AuthResponseDTO is in response.data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({ email: response.data.email, role: response.data.role }));
            onLogin();
            onNavigate('dashboard');
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-br from-green-600 to-green-800 rounded-full p-4 mb-4 shadow-lg">
                        <UserPlus className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-600 mt-2">Join Invezt today and start analyzing</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="you@example.com"
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
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-900 transform hover:scale-105 transition-all disabled:opacity-50 shadow-lg mt-4"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="text-center pt-2">
                        <span className="text-sm text-gray-600">Already have an account? </span>
                        <button
                            onClick={() => onNavigate('login')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Sign In
                        </button>
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

export default SignupPage;
