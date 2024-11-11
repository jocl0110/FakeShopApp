import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoStar } from "react-icons/io5";
import "./Departments.css";

const Departments = ({ url }) => {
  const [catProducts, setCatProducts] = useState([]);

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
  }, [url]);
  return (
    <div>
      <div>Departments</div>
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
                  <button type="button">Add to Cart</button>
                  <button type="button">
                    Save it for later
                    <CiHeart />
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
