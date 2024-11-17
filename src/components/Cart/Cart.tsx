import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = ({ cart, setCart }) => {
  //Getting total quantity of items in the cart and total price
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log(totalQuantity);
  console.log(totalPrice);

  // Callback Functions

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

  return (
    <div>
      <h2>My Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: "100px", height: "auto" }}
              />
              <p>{item.title}</p>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleDecrement(item.id)}>
                <FaMinus />
              </button>
              <button onClick={() => handleIncrement(item.id)}>
                <FaPlus />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
