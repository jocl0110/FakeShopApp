const Cart = ({ cart, setCart, onClick }) => {
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
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
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
