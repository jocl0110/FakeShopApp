import { useState } from "react";
import Footer from "../Footer/Footer";
import axios from "axios";

function SignUp({ handleHome, handleSignIn }) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let message;
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/products/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      message = response.message;
    } catch (error) {
      console.error("Error during submission: ", error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            required
            name="email"
          />
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleChange}
            type="username"
            id="username"
            required
            name="username"
          />
          <label htmlFor="firstName">First Name:</label>
          <input
            onChange={handleChange}
            required
            type="text"
            id="firstName"
            name="firstName"
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            onChange={handleChange}
            required
            type="text"
            id="lastName"
            name="lastName"
          />
          <label htmlFor="password">Password:</label>
          <input
            onChange={handleChange}
            required
            type="password"
            id="password"
            name="password"
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            onChange={handleChange}
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <label htmlFor="admin-code">Optional: Admin Code</label>
          <input
            onChange={handleChange}
            type="text"
            id="admin-code"
            name="admin-code"
          />
          <button type="submit">Sign Up</button>
        </form>
        <button type="button" onClick={handleSignIn}>
          Or sign in
        </button>
        <button type="button" onClick={handleHome}>
          Home
        </button>
      </div>
      {message && (
        <div>
          <p>{message}</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default SignUp;
