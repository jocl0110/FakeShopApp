import Footer from "../Footer/Footer";

const SignIn = ({ handleSignUp }) => {
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
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
