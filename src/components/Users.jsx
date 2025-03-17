// filepath: /home/hyy/Desktop/hospital-appointment-system/hospital-appointment-frontend/src/components/Users.jsx
import { useEffect, useState } from 'react';
import api from '../api';

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="p-2 border rounded-md">
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;