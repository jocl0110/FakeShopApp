import { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

const NavBar = ({ onSearch, handleSignIn, handleDashboard, handleHome }) => {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState({
    departments: false,
    signIn: false,
  });
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("api/products/categories");
        const data = await res.json();

        setCategories(data.data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);
  const toggleDropdown = (type) => {
    setShowDropdown((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const navigate = useNavigate();

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
  const handleDepartments = (name) => {
    navigate(`products/departments/${name.toLowerCase().replace(/\s+/g, "-")}`);
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
              className="store-icon"
            />
          </li>
          <li className="search">
            <input
              className="search-input"
              value={searchParam}
              type="text"
              placeholder="Search for an item"
              onChange={handleChange}
            />{" "}
            <MdOutlineSearch id="search-btn" onClick={handleSearch} />
          </li>
          <div className="right-items">
            <li className="departments">
              <div className="dept-dropdown">
                <div
                  className="dropdown-div-btn"
                  onClick={() => toggleDropdown("departments")}
                >
                  Departments
                </div>
                <div
                  className={
                    showDropdown.departments
                      ? "show-dept-dropdown"
                      : "hidden-dept-dropdown"
                  }
                >
                  <div className="dept-list">
                    {categories &&
                      categories.map((cat) => {
                        return (
                          <p onClick={() => handleDepartments(cat)} key={cat}>
                            {cat}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </div>
            </li>
            <li onClick={handleWishList} className="wishlist">
              Wish List
            </li>
            <li className="sign-in" onClick={() => toggleDropdown("signIn")}>
              <FaUser />
              <p>Sign In</p>
              <div
                className={
                  showDropdown.signIn
                    ? "sign-in-dropdown"
                    : "sign-in-dropdown-hidden"
                }
              >
                <ul>
                  <li onClick={handleSignIn}>Sign in or Create an account</li>
                  <li onClick={handleDashboard}>Account</li>
                </ul>
              </div>
            </li>
            <li>
              <CiShoppingCart
                className="cart-icon"
                onClick={handleCart}
                style={{ width: "35px", fontSize: "2.5rem" }}
              />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
