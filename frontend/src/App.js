import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Payment from "./Components/Payment";
import PaymentList from "./Components/PaymentList";
import PaymentEdit from "./Components/PaymentEdit";
import AdminPaymentReport from "./Components/AdminPaymentReport";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/PaymentList" element={<PaymentList />} />
        <Route path="/PaymentEdit" element={<PaymentEdit />} />
        <Route path="/AdminPaymentReport" element={<AdminPaymentReport />} />
      </Routes>
    </Router>
  );
}

export default App;
