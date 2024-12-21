import { useEffect, useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

const NavBar = ({ onSearch }) => {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
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
          <li className="departments">
            <div className="dept-dropdown">
              <div className="dropdown-div-btn" onClick={handleShow}>
                Departments
              </div>
              <div
                className={
                  showDropdown ? "show-dept-dropdown" : "hidden-dept-dropdown"
                }
              >
                <ul className="dept-list">
                  {categories &&
                    categories.map((cat) => {
                      return (
                        <li onClick={() => handleDepartments(cat)} key={cat}>
                          {cat}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </li>
          <li onClick={handleWishList} className="wishlist">
            Wish List
          </li>
          <li className="sign-in">
            <FaUser />
            Sign In
          </li>
          <li>
            <CiShoppingCart
              onClick={handleCart}
              style={{ width: "35px", fontSize: "2.5rem" }}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
