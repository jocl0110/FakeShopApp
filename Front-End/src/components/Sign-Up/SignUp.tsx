import { useState } from "react";
import Footer from "../Footer/Footer";
import axios from "axios";

function SignUp({
  handleHome,
  handleSignIn,
  handleChange,
  setMessage,
  message,
  formData,
  setFormData,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/products/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        setMessage(response.data.message || "Sign-up successfully");
        setFormData({
          email: "",
          username: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          adminCode: "",
        });
      } else {
        setMessage(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during submission: ", error);

      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            value={formData.email}
            onChange={handleChange}
            type="email"
            id="email"
            required
            name="email"
          />
          <label htmlFor="username">Username:</label>
          <input
            value={formData.username}
            onChange={handleChange}
            type="username"
            id="username"
            required
            name="username"
          />
          <label htmlFor="firstName">First Name:</label>
          <input
            value={formData.firstName}
            onChange={handleChange}
            required
            type="text"
            id="firstName"
            name="firstName"
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            value={formData.lastName}
            onChange={handleChange}
            required
            type="text"
            id="lastName"
            name="lastName"
          />
          <label htmlFor="password">Password:</label>
          <input
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
            id="password"
            name="password"
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <label htmlFor="adminCode">Optional: Admin Code</label>
          <input
            value={formData.adminCode}
            onChange={handleChange}
            type="text"
            id="adminCode"
            name="adminCode"
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

      <Footer />
    </div>
  );
}

export default SignUp;
