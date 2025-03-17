import { useState } from 'react';
import api from '../api';

const Appointment = ({ token }) => {
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');

  const bookAppointment = async () => {
    try {
      await api.post('/appointments/book', { doctorId, date }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Appointment Booked Successfully');
    } catch (error) {
      console.error('Booking Error:', error);
      alert('Failed to book appointment');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
      <input
        type="text"
        placeholder="Doctor ID"
        className="p-2 border rounded-md w-full"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
      />
      <input
        type="datetime-local"
        className="p-2 border rounded-md w-full"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-md w-full hover:bg-blue-600"
        onClick={bookAppointment}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default Appointment;