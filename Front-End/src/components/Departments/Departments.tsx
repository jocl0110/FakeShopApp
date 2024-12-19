import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import "./Departments.css";
import { useLocation } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

const Departments = ({
  handleProductDetails,
  favoriteList,
  handleWishList,
  cart,
  handleAddtoCart,
  updateQuantity,
}) => {
  const [catProducts, setCatProducts] = useState([]);
  const [pathName, setPathName] = useState("");

  const location = useLocation().pathname;
  const category = location.split("/")[3] || "accessories";
  const url = `/api/products/categories/${category}`;
  const fetchDepartmentProducts = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setCatProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartmentProducts();
    setPathName(location);
  }, [pathName, url]);
  return (
    <div>
      <div>{pathName.toLowerCase()}</div>
      <div>
        <ul className="product-by-department-ul">
          {catProducts &&
            catProducts.length > 0 &&
            catProducts.map((item) => {
              return (
                <li key={item._id}>
                  <img
                    onClick={() => handleProductDetails(item.id)}
                    style={{ width: "200px", height: "auto" }}
                    src={item.image}
                    alt={item.name}
                  />
                  <p>
                    <IoStar />
                    {item.rating}
                  </p>
                  <p onClick={() => handleProductDetails(item.id)}>
                    {item.name}
                  </p>
                  <p>${item.price}</p>
                  {cart.some((product) => product._id === item._id) ? (
                    <div>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            (cart.find((product) => product._id === item._id)
                              ?.quantity || 1) - 1
                          )
                        }
                      >
                        <FaMinus />
                      </button>
                      <span>
                        {cart.find((product) => product._id === item._id)
                          ?.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            (cart.find((product) => product._id === item._id)
                              ?.quantity || 1) + 1
                          )
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleAddtoCart(item)} type="button">
                      Add to Cart
                    </button>
                  )}
                  <button type="button" onClick={() => handleWishList(item)}>
                    {favoriteList.some((favItem) => favItem.id === item._id)
                      ? "Remove from favorites"
                      : "Save for later"}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Departments;
