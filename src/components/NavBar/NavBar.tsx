import { useEffect, useState } from "react";
import "./NavBar.css";

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

  return (
    <header>
      <nav>
        <ul>
          <li>
            <img
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
                        <li>{cat}</li>
                      </ul>
                    );
                  })}
              </div>
            </div>
          </li>
          <li>Wish List</li>
          <li>
            <img
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
