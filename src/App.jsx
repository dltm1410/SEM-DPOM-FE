import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import ConfirmOrder from "./components/ConfirmOrder";
import OrderSummary from "./components/OrderSummary";
import ProductDetail from "./components/ProductDetail";
import ManageProduct from "./components/ManageProduct";
import OrderTracking from "./components/OrderTracking";
import Staff from "./components/Staff";
import Account from "./components/Account";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/manage-product" element={<ManageProduct />} />
        <Route path="/" element={<Body />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/confirm-order/:orderId" element={<ConfirmOrder />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
        <Route path="/account" element={<Account />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
    // <Router>
    //   <Routes>
    //     <Route path="/staff" element={<Staff />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/signin" element={<Signin />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
