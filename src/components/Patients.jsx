import { useEffect, useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const Patients = ({ token }) => {
  const [patients, setPatients] = useState([]);

  const fetchUsers = async (role) => {
    try {
      const response = await api.get(`/auth/users?role=${role}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers('patient');
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Patients</h2>
      <ul className="space-y-4">
        {patients.map((patient, index) => (
          <motion.li
            key={patient._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Placeholder patient icon
                  alt="Patient"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{patient.fullName}</h3>
                <p className="text-sm text-gray-600">ID: {patient._id}</p>
              </div>
              <div className="text-sm text-gray-500">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Patient
                </span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;