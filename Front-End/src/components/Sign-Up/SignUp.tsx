import Footer from "../Footer/Footer";

function SignUp() {
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
          <button type="submit">Or sign in</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
