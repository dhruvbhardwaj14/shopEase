import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3306/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cemail: email,
          cpwd: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage or cookies
        localStorage.setItem("jwt_token", data.token);
        // Navigate to a protected route or home page
        navigate("/");
        window.location.reload();
      } else {
        // Display error message from the server
        setErrorMessage(data.message || "An error occurred");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">
          Welcome Back
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold text-lg hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
