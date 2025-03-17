import { useEffect, useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const Doctors = ({ token }) => {
  const [doctors, setDoctors] = useState([]);

  const fetchUsers = async (role) => {
    try {
      const response = await api.get(`/auth/users?role=${role}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setDoctors(response.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers('doctor');
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Doctors</h2>
      <ul className="space-y-4">
        {doctors.map((doctor, index) => (
          <motion.li
            key={doctor._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3304/3304567.png" // Placeholder doctor icon
                  alt="Doctor"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{doctor.fullName}</h3>
                <p className="text-sm text-gray-600">ID: {doctor._id}</p>
              </div>
              <div className="text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Doctor
                </span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;