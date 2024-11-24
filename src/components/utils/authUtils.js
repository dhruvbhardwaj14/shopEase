// src/utils/authUtils.js
import { jwtDecode } from "jwt-decode"; // Use named import instead of default import

// Utility function to get the customer ID (cid) from the token
export const getCidFromToken = () => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      console.log(decodedToken.id);
      return decodedToken.cid; // Return the customer ID (cid)
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
  return null;
};
