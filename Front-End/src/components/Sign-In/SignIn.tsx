import { useState } from "react";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({
  handleSignUp,
  handleHome,
  setMessage,
  message,
  setIsAuthenticated,
}) => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChangeOnSign = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("api/products/login", login, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setMessage("Signed in");
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSignIn}>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleChangeOnSign}
            type="username"
            id="username"
            name="username"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            onChange={handleChangeOnSign}
            type="password"
            id="password"
            name="password"
            required
          />
          <button type="submit">Sign In</button>
        </form>
        <div>
          <button type="button" onClick={handleSignUp}>
            Create your Account
          </button>
          <button onClick={handleHome}>Home</button>
        </div>
      </div>
      {message && (
        <div>
          <p>{message}</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SignIn;
