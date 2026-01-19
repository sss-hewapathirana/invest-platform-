import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
baseURL: API_BASE_URL,
headers: {
    'Content-Type': 'application/json',
},
});

// Request interceptor to add token
api.interceptors.request.use(
(config) => {
    const token = localStorage.getItem('token');
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

// Response interceptor for error handling
api.interceptors.response.use(
(response) => response,
(error) => {
    if (error.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    }
    return Promise.reject(error);
}
);

// Auth APIs
export const authAPI = {
login: (email, password) => 
    api.post('/auth/login', { email, password }),

register: (data) => 
    api.post('/auth/register', data),

refreshToken: (token) => 
    api.post('/auth/refresh', { token }),
};

// Stock APIs
export const stockAPI = {
getAll: () => 
    api.get('/stocks'),

getBySymbol: (symbol) => 
    api.get(`/stocks/${symbol}`),

search: (query) => 
    api.get(`/stocks/search?query=${query}`),

getBySector: (sector) => 
    api.get(`/stocks/sector/${sector}`),

refreshData: (symbol) => 
    api.post(`/stocks/refresh/${symbol}`),
};

// Portfolio APIs
export const portfolioAPI = {
getAll: () => 
    api.get('/portfolio'),

create: (data) => 
    api.post('/portfolio', data),

update: (id, data) => 
    api.put(`/portfolio/${id}`, data),

delete: (id) => 
    api.delete(`/portfolio/${id}`),

addItem: (portfolioId, data) => 
    api.post(`/portfolio/${portfolioId}/items`, data),

removeItem: (portfolioId, itemId) => 
    api.delete(`/portfolio/${portfolioId}/items/${itemId}`),
};

// Analysis APIs
export const analysisAPI = {
performValuation: (data) => 
    api.post('/analysis/valuation', data),

compareStocks: (symbols) => 
    api.get('/analysis/compare', { params: { symbols: symbols.join(',') } }),

mlPredict: (symbol) => 
    api.post('/analysis/ml-predict', { symbol }),
};

// Watchlist APIs
export const watchlistAPI = {
getAll: () => 
    api.get('/watchlist'),

add: (stockId) => 
    api.post('/watchlist', { stockId }),

remove: (id) => 
    api.delete(`/watchlist/${id}`),
};

// News APIs
export const newsAPI = {
getAll: () => 
    api.get('/news'),

getByStock: (symbol) => 
    api.get(`/news/stock/${symbol}`),
};

export default api;