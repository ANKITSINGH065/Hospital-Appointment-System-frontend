import { useEffect, useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const GetAllAppointment = ({ token }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setAppointments(response.data);
      } else {
        setError('Invalid data format received from the server.');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setError('Failed to fetch appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await api.delete(`/appointments/cancel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    } catch (error) {
      console.error('Cancel Error:', error);
      setError('Failed to cancel appointment. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
        <p>Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">All Appointments</h2>
      <ul className="space-y-4">
        {appointments.map((appointment, index) => (
          <motion.li
            key={appointment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Appointment with {appointment.patient?.username || 'Unknown Patient'}
                </h3>
                <p className="text-sm text-gray-600">
                  Date: {new Date(appointment.date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Status: {appointment.status}</p>
              </div>
              <div className="text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {appointment.status}
                </span>
              </div>
              {appointment.status !== 'cancelled' && (
                <button
                  className="ml-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => cancelAppointment(appointment._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllAppointment;