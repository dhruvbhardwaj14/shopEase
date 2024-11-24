import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../specific/UserContext";

const Footer = () => {
  const { cid, setCid } = useUser();
  const logout = () => {
    localStorage.removeItem("jwt_token");

    setCid(null);

    window.location.href = "/login";
  };
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">ShopEase</h2>
            <p className="text-gray-400">
              Your one-stop shop for the best products at unbeatable prices. Experience shopping like never before!
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-blue-400">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-400">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-blue-400">
                  Orders
                </Link>
              </li>
              <li>
              {cid ? (
              <>
                <button onClick={logout}>LOGOUT</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-400">
                  Login
                </Link>
                <Link to="/register" className="hover:text-gray-400">
                  Register
                </Link>
              </>
          )}
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-blue-400">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-blue-400">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 border-t border-gray-600 pt-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
