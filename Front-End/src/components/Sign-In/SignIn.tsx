import Footer from "../Footer/Footer";

const SignIn = ({ handleSignUp, handleHome }) => {
  return (
    <div>
      <div>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Sign In</button>
          <button type="submit" onClick={handleSignUp}>
            Create your Account
          </button>
        </form>
        <button onClick={handleHome}>Home</button>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
