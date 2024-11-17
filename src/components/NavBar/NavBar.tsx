import { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = ({ onSearch, setUrl }) => {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
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
    setSearchParam("");
    onSearch(searchParam);
  };

  const handleChange = (e) => {
    setSearchParam(e.target.value);
  };
  const handleWishList = () => {
    navigate("/wishlist");
  };
  const handleDepartments = (url, name) => {
    navigate(`products/departments/${name}`);
    setUrl(url);
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
                <ul>
                  {categories &&
                    categories.map((cat) => {
                      return (
                        <li
                          onClick={() => handleDepartments(cat.url, cat.slug)}
                          key={cat.name}
                        >
                          {cat.name}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </li>
          <li onClick={handleWishList}>Wish List</li>
          <li>
            <label>
              <input
                value={searchParam}
                type="text"
                placeholder="Search for an item"
                onChange={handleChange}
              />{" "}
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
