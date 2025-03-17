import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Login = ({ setToken }) => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', userData);
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="p-2 border rounded-md w-full"
        type="text"
        placeholder="Username"
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <input
        className="p-2 border rounded-md w-full"
        type="password"
        placeholder="Password"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-md w-full hover:bg-blue-600"
        onClick={handleLogin}
      >
        Login
      </button>
      <p className="mt-4">
        Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
      </p>
    </div>
  );
};

export default Login;