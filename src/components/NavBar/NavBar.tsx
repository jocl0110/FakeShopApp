import { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);
  const handleShow = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleSearch = () => {
    navigate("/");
  };
  const handleWishList = () => {
    navigate("/wishlist");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <img
              onClick={handleHome}
              src="src/assets/store.png"
              alt="store-icon"
              style={{ width: "50px" }}
            />
          </li>
          <li>
            <div className="dept-dropdown">
              <div onClick={handleShow}>Departments</div>
              <div
                className={
                  showDropdown ? "show-dept-dropdown" : "hidden-dept-dropdown"
                }
              >
                {categories &&
                  categories.map((cat) => {
                    return (
                      <ul>
                        <li key={cat.id}>{cat}</li>
                      </ul>
                    );
                  })}
              </div>
            </div>
          </li>
          <li onClick={handleWishList}>Wish List</li>
          <li>
            <label>
              <input type="text" placeholder="What can we help you find" />{" "}
              <button type="submit" onClick={handleSearch}>
                Search
              </button>
            </label>
          </li>
          <li className="sign-in-btn">
            <FaRegUserCircle /> Sign in
          </li>
          <li>
            <img
              onClick={handleCart}
              style={{ width: "35px" }}
              src="src/assets/cart-shopping-solid.svg"
              alt="cart icon"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
