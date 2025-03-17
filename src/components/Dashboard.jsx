import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import api from '../api';
import Patients from './Patients';
import Doctors from './Doctors';
import Appointment from './Appointment';
import { motion } from 'framer-motion';

const Dashboard = ({ token }) => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setAppointments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <Link
              to="/Patients"
              className="flex items-center p-2 hover:bg-blue-700 rounded-md transition duration-300"
            >
              <span className="ml-2">Get Patients</span>
            </Link>
          </li>
          <li>
            <Link
              to="/doctors"
              className="flex items-center p-2 hover:bg-blue-700 rounded-md transition duration-300"
            >
              <span className="ml-2">View All Doctors</span>
            </Link>
          </li>
          <li>
            <Link
              to="/book-appointment"
              className="flex items-center p-2 hover:bg-blue-700 rounded-md transition duration-300"
            >
              <span className="ml-2">Book Appointment</span>
            </Link>
          </li>
          <li>
            <Link
              to="/get-all-appointment"
              className="flex items-center p-2 hover:bg-blue-700 rounded-md transition duration-300"
            >
              <span className="ml-2">Get Appointments</span>
            </Link>
          </li>
        </ul>
        <div className="mt-6">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}
            className="w-full p-2 bg-red-500 hover:bg-red-600 rounded-md text-white transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-grow p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <Routes>
            <Route path="patients" element={<Patients token={token} />} />
            <Route path="doctors" element={<Doctors token={token} />} />
            <Route path="book-appointment" element={<Appointment token={token} />} />
            <Route
              path="/"
              element={
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Welcome to Hospital Management</h2>
                  <p className="text-gray-600 mb-6">
                    Manage patients, doctors, and appointments with ease.
                  </p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="inline-block"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2967/2967741.png"
                      alt="Hospital Illustration"
                      className="w-48 h-48"
                    />
                  </motion.div>
                </div>
              }
            />
          </Routes>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;