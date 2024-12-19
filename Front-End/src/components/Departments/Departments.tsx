import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import "./Departments.css";
import { useLocation } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

const Departments = ({
  url,
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
  console.log(location);

  const fetchDepartmentProducts = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setCatProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartmentProducts();
    setPathName(location);
  }, [url, pathName]);
  return (
    <div>
      <div>{pathName}</div>
      <div>
        <ul className="product-by-department-ul">
          {catProducts &&
            catProducts.length > 0 &&
            catProducts.map((item) => {
              return (
                <li key={item.id}>
                  <img
                    onClick={() => handleProductDetails(item.id)}
                    style={{ width: "200px", height: "auto" }}
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <p>
                    <IoStar />
                    {item.rating}
                  </p>
                  <p onClick={() => handleProductDetails(item.id)}>
                    {item.title}
                  </p>
                  <p>${item.price}</p>
                  <p>{item.availabilityStatus}</p>
                  {cart.some((product) => product.id === item.id) ? (
                    <div>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            (cart.find((product) => product.id === item.id)
                              ?.quantity || 1) - 1
                          )
                        }
                      >
                        <FaMinus />
                      </button>
                      <span>
                        {cart.find((product) => product.id === item.id)
                          ?.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            (cart.find((product) => product.id === item.id)
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
                    {favoriteList.some((favItem) => favItem.id === item.id)
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
