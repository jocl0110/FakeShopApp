import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./Cart.css";
import { RxCross1 } from "react-icons/rx";
import { TbPointFilled } from "react-icons/tb";

const Cart = ({ prize, quantity, cart, setCart, handleProductDetails }) => {
  // Callback Functions

  const [showSummary, setShowSummary] = useState(false);

  const handleDecrement = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleIncrement = (itemId) => {
    setCart((prevState) =>
      prevState.map((item) => {
        return item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      })
    );
  };
  const handleCartRemove = (itemId) => {
    const newCart = cart.filter((item) => {
      return item.id !== itemId;
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
            <li key={item.id}>
              <img
                onClick={() => handleProductDetails(item.id)}
                src={item.thumbnail}
                alt={item.title}
                style={{ width: "100px", height: "auto" }}
              />
              <p onClick={() => handleProductDetails(item.id)}>{item.title}</p>
              <p>${item.price}</p>

              <button onClick={() => handleCartRemove(item.id)}>
                <RxCross1 />
              </button>
              <button>Save for later</button>
              <button onClick={() => handleDecrement(item.id)}>
                <FaMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item.id)}>
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
              <tr>
                <th>
                  Subtotal({quantity} Item{quantity > 1 ? "s" : ""})
                </th>
                <td>${prize}</td>
              </tr>
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
            </table>
            <hr />
          </div>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
