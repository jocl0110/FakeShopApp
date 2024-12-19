import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./Cart.css";
import { RxCross1 } from "react-icons/rx";
import { TbPointFilled } from "react-icons/tb";

const Cart = ({
  prize,
  quantity,
  cart,
  setCart,
  handleProductDetails,
  handleWishList,
  favoriteList,
}) => {
  // Callback Functions

  const [showSummary, setShowSummary] = useState(false);

  const handleDecrement = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === itemId && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleIncrement = (itemId) => {
    setCart((prevState) =>
      prevState.map((item) => {
        return item._id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      })
    );
  };
  const handleCartRemove = (itemId) => {
    const newCart = cart.filter((item) => {
      return item._id !== itemId;
    });
    setCart(newCart);
  };

  const handleSummary = () => {
    setShowSummary((prevState) => !prevState);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length > 0 && (
        <h3>
          ${prize} <TbPointFilled /> {quantity} Item{quantity > 0 ? "s" : ""}
        </h3>
      )}

      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              <img
                onClick={() => handleProductDetails(item.id)}
                src={item.image}
                alt={item.name}
                style={{ width: "100px", height: "auto" }}
              />
              <p onClick={() => handleProductDetails(item._id)}>{item.name}</p>
              <p>${item.price}</p>

              <button onClick={() => handleCartRemove(item._id)}>
                <RxCross1 />
              </button>
              <button onClick={() => handleWishList(item)}>
                {favoriteList.some((favItem) => favItem._id === item._id)
                  ? "Remove from favorites"
                  : "Save for later"}
              </button>
              <button onClick={() => handleDecrement(item._id)}>
                <FaMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item._id)}>
                <FaPlus />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cart.length > 0 && (
        <div>
          <h3 onClick={handleSummary}>Order Summary</h3>
          <p>${prize} Total</p>
          <p>
            {quantity} item{quantity > 1 ? "s" : ""}
          </p>
          <div className={`summary ${showSummary ? "show" : "not-show"}`}>
            <table>
              <thead>
                <tr>
                  <th>
                    Subtotal({quantity} Item{quantity > 1 ? "s" : ""})
                  </th>
                  <td>${prize}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Pickup</th>
                  <td>FREE</td>
                </tr>
                <tr>
                  <th>Estimated Taxes</th>
                  <td>$0.00</td>
                </tr>
                <tr>
                  <th>Total: </th>
                  <td>${prize}</td>
                </tr>
              </tbody>
            </table>
            <hr />
          </div>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

// Need to implement a functionality that when someone adds something that it is already in the cart it add 1 to the quantity property
export default Cart;
