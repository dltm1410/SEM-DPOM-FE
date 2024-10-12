import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import ConfirmOrder from "./components/ConfirmOrder";
import OrderSummary from "./components/OrderSummary";

function App() {
  return (
    <div>
      <Navbar />
      <OrderSummary />
      <Footer />
    </div>
  );
}

export default App;
