import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from  '../api';

const Register = () => {
  const [userData, setUserData] = useState({ fullName: '', username: '', password: '', role: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', userData);
      alert('User Registered');
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="p-2 border rounded-md w-full"
        type="text"
        placeholder="Full Name"
        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
      />
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
      <select
        className="p-2 border rounded-md w-full"
        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
      >
        <option value="">Select Role</option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
      <button
        className="p-2 bg-blue-500 text-white rounded-md w-full hover:bg-blue-600"
        onClick={handleRegister}
      >
        Register
      </button>
      <p className="mt-4">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Register;