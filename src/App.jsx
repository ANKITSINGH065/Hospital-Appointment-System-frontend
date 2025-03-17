import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Appointment from "./components/Appointment";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";
import GetAllAppointment from "./components/GetAllAppointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar token={token} setToken={setToken} />
        <div className="flex-grow max-w-4xl mx-auto p-6 w-full">
          <Routes>
            <Route
              path="/"
              element={
                !token ? <Navigate to="/login" /> : <Navigate to="/dashboard" />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route
              path="/dashboard"
              element={
                token ? <Dashboard token={token} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/book-appointment"
              element={
                token ? <Appointment token={token} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/patients"
              element={
                token ? <Patients token={token} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/doctors"
              element={
                token ? <Doctors token={token} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/get-all-appointment"
              element={
                token ? <GetAllAppointment token={token} /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;