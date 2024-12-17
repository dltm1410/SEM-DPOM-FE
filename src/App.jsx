import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { StaffRoute, CustomerRoute } from './components/ProtectedRoute';
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
          <Route path="/staff/*" element={<StaffRoute><Staff /></StaffRoute>} />

          {/* Customer routes - all wrapped with Navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <CustomerRoute>
                        <Body />
                      </CustomerRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <CustomerRoute>
                        <Cart />
                      </CustomerRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <CustomerRoute>
                        <Orders />
                      </CustomerRoute>
                    }
                  />
                  <Route
                    path="/confirm-order/:orderId"
                    element={
                      <CustomerRoute>
                        <ConfirmOrder />
                      </CustomerRoute>
                    }
                  />
                  <Route
                    path="/order-summary"
                    element={
                      <CustomerRoute>
                        <OrderSummary />
                      </CustomerRoute>
                    }
                  />
                  <Route
                    path="/product-detail/:id"
                    element={
                      <CustomerRoute>
                        <ProductDetail />
                      </CustomerRoute>
                    }
                  />
                  <Route
                    path="/order-tracking/:orderId"
                    element={
                      <CustomerRoute>
                        <OrderTracking />
                      </CustomerRoute>
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <CustomerRoute>
                        <Account />
                      </CustomerRoute>
                    }
                  />
                  {/* 404 for customer routes - will show with Navbar and Footer */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            }
          />

          {/* Global 404 - will show without Navbar and Footer */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
