import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { useParams } from "react-router-dom";

const ProductDetails = ({ handleAddtoCart, Cart, updateQuantity }) => {
  const { id, category } = useParams();

  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(
        `/api/products/categories/${category}/${id}`
      );
      const data = await response.json();
      setProductDetails(data.data);
    };
    fetchProductDetails();
  }, [id]);

  return (
    <div>
      <div className="route"></div>
      <div>
        <img
          style={{ width: "200px", height: "auto" }}
          src={productDetails.image}
          alt={productDetails.name}
        />
        <p>
          <IoStar />
          {productDetails.rating}
        </p>
        <h3>{productDetails.name}</h3>
        <p>${productDetails.price}</p>
        {Cart.some((product) => product._id === productDetails.id) ? (
          <div>
            <button
              onClick={() =>
                updateQuantity(
                  productDetails._id,
                  (Cart.find((product) => product._id === productDetails._id)
                    ?.quantity || 1) - 1
                )
              }
            >
              <FaMinus />
            </button>
            <span>
              {Cart.find((product) => product._id === productDetails._id)
                ?.quantity || 1}
            </span>
            <button
              onClick={() =>
                updateQuantity(
                  productDetails._id,
                  (Cart.find((product) => product._id === productDetails._id)
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
            <div>{productDetails.stock} items in Stock</div>
            <div>
              Description
              <p>{productDetails.description}</p>
            </div>
            <div>
              Weight
              <p>{productDetails.weight} kg</p>
            </div>
            <div>
              Shiping and Return
              <p>{productDetails.shippingInformation}</p>
              <p>{productDetails.returnPolicy}</p>
            </div>
            <div>
              Reviews
              <p>
                {productDetails.reviews &&
                  productDetails.reviews.map((review) => {
                    return (
                      <div>
                        <p>{review.reviewerName}</p>
                        <p>{review.comment}</p>
                        <p>{review.rating}</p>
                      </div>
                    );
                  })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
