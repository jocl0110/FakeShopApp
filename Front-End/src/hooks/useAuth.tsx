import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/products/dashboard", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed: ", error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);
  return { isAuthenticated, setIsAuthenticated };
};

export default useAuth;
