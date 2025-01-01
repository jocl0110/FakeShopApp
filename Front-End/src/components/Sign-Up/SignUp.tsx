import Footer from "../Footer/Footer";

function SignUp({ handleHome, handleSignIn }) {
  return (
    <div>
      <div>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="first-name">First Name:</label>
          <input type="text" id="first-name" name="first-name" />
          <label htmlFor="last-name">Last Name:</label>
          <input type="text" id="last-name" name="last-name" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <label htmlFor="password">Confirm Password:</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Sign Up</button>
          <button type="submit" onClick={handleSignIn}>
            Or sign in
          </button>
        </form>
        <button onClick={handleHome}>Home</button>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
