import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./admin/login";
import AdminDashboard from "./admin/dashboard";
import OperatorLogin from "./operator/login";
import OperatorDashboard from "./operator/dashboard";
import CommuterLogin from "./commuter/login";
import CommuterRegister from "./commuter/register";
import CommuterReservation from "./commuter/reservation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminLogin" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />

        <Route path="/operatorLogin" element={<OperatorLogin />} />
        <Route path="/operatorDashboard" element={<OperatorDashboard />} />
        <Route path="/commuterLogin" element={<CommuterLogin />} />
        <Route path="/commuterRegister" element={<CommuterRegister />} />
        <Route path="/commuterReservation" element={<CommuterReservation />} />
      </Routes>
    </Router>
  );
};

export default App;
