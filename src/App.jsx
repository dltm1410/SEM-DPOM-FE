import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import ConfirmOrder from "./components/ConfirmOrder";
import OrderSummary from "./components/OrderSummary";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
