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
            <div className="dept-dropdown">
              <button onClick={handleShow}>Departments</button>
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
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
