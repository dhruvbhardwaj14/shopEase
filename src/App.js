// App.js
import "./App.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HomePage from "./components/specific/HomePage";
import ProductPage from "./components/specific/ProductPage";
import ProductDetailsPage from "./components/specific/ProductDetailsPage";
import CartPage from "./components/specific/CartPage";
import CheckoutPage from "./components/specific/CheckoutPage";
import OrdersPage from "./components/specific/OrdersPage";
import OrderDetails from "./components/specific/OrderDetails";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Use BrowserRouter instead
import { UserProvider } from "./components/specific/UserContext";
function App() {
  return (
    <>
      <Router>
        {" "}
        {/* This should wrap the entire app */}
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/products" element={<ProductPage />}></Route>
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
