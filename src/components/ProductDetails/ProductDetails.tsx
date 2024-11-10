import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
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
        <button>Add to Cart</button>
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
