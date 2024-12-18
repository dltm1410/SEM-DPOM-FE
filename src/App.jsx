import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { StaffRoute, CustomerRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import ConfirmOrder from "./components/ConfirmOrder";
import OrderSummary from "./components/OrderSummary";
import ProductDetail from "./components/ProductDetail";
import OrderTracking from "./components/OrderTracking";
import Staff from "./components/Staff";
import Account from "./components/Account";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Staff routes */}
          <Route
            path="/staff/*"
            element={
              <StaffRoute>
                <Staff />
              </StaffRoute>
            }
          />

          {/* Customer routes with shared layout */}
          <Route
            element={
              <>
                <Navbar />
                <CustomerRoute />
                <Footer />
              </>
            }
          >
            <Route path="/" element={<Body />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/confirm-order/:orderId" element={<ConfirmOrder />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route
              path="/order-tracking/:orderId"
              element={<OrderTracking />}
            />
            <Route path="/account" element={<Account />} />
          </Route>

          {/* Global 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
