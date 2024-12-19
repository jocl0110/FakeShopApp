import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { useParams } from "react-router-dom";

const ProductDetails = ({ handleAddtoCart, Cart, updateQuantity }) => {
  const { id } = useParams();

  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProductDetails(data);
      console.log(data);
    };
    fetchProductDetails();
  }, [id]);

  return (
    <div>
      <div className="route"></div>
      <div>
        <img
          style={{ width: "auto" }}
          src={productDetails.thumbnail}
          alt={productDetails.title}
        />
        <p>
          <IoStar />
          {productDetails.rating}
        </p>
        <h3>{productDetails.title}</h3>
        <p>${productDetails.price}</p>
        {Cart.some((product) => product.id === productDetails.id) ? (
          <div>
            <button
              onClick={() =>
                updateQuantity(
                  productDetails.id,
                  (Cart.find((product) => product.id === productDetails.id)
                    ?.quantity || 1) - 1
                )
              }
            >
              <FaMinus />
            </button>
            <span>
              {Cart.find((product) => product.id === productDetails.id)
                ?.quantity || 1}
            </span>
            <button
              onClick={() =>
                updateQuantity(
                  productDetails.id,
                  (Cart.find((product) => product.id === productDetails.id)
                    ?.quantity || 1) + 1
                )
              }
            >
              <FaPlus />
            </button>
          </div>
        ) : (
          <button onClick={() => handleAddtoCart(productDetails)} type="button">
            Add to Cart
          </button>
        )}
        <div className="about">
          <div>
            About this Item
            <div>
              Specifications
              <div>
                <ul>
                  {productDetails.dimensions ? (
                    Object.entries(productDetails.dimensions).map(
                      ([key, value]) => (
                        <li key={key}>
                          <strong>{key}</strong>: {value} inches
                        </li>
                      )
                    )
                  ) : (
                    <p>No product details</p>
                  )}
                </ul>
              </div>
            </div>
            <div>
              Description
              <p>{productDetails.description}</p>
            </div>
            <div>
              Warranty Information
              <p>{productDetails.warrantyInformation}</p>
            </div>
            <div>
              Shiping and Return
              <p>{productDetails.shippingInformation}</p>
              <p>{productDetails.returnPolicy}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
