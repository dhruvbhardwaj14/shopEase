import React, { createContext, useState, useEffect } from "react";
import { getCidFromToken } from "../utils/authUtils"; // Import the utility function

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cid, setCid] = useState(null);

  useEffect(() => {
    const userCid = getCidFromToken(); // Get the CID from the token
    // console.log("Decoded CID from Token: ", userCid); // Log to check if cid is correct/
    if (userCid) {
      setCid(userCid); // Set the CID in state if available
    }
  }, []);

  return (
    <UserContext.Provider value={{ cid, setCid }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext); // Custom hook to use user context
