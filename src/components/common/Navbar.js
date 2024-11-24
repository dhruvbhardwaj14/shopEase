import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../specific/CartContext";
import { useUser } from "../specific/UserContext";

const Navbar = () => {
  const { cid, setCid } = useUser();
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((sum, item) => sum + item.cqty, 0);

  const logout = () => {
    localStorage.removeItem("jwt_token");

    setCid(null);

    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">E-Shop</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-400">
            Products
          </Link>
          <Link to="/cart" className="hover:text-gray-400">
            Cart ({cartCount})
          </Link>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
