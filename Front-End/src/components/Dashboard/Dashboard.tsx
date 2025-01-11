import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = ({ handleHome, handleSettings, setIsAuthenticated }) => {
  const handleLogOut = async () => {
    axios
      .post("/api/products/logout", {}, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(false);
      })
      .catch((err) => {
        console.error("Logout failed", err);
      });
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/products/dashboard", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        setIsAuthenticated(false);
      }
    };
    fetchUserData();
  }, [setIsAuthenticated]);
  return (
    <div>
      <ul>
        <li>Hello {user.firstName}</li>
        <li onClick={handleSettings}>Settings</li>
      </ul>
      <div>
        <h2>Purchase History</h2>
      </div>
      <button onClick={handleHome}>Home</button>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export default Dashboard;
