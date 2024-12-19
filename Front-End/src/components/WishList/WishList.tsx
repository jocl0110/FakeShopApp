import { FaMinus, FaPlus } from "react-icons/fa";

const WishList = ({
  setFavoriteList,
  favoriteList,
  handleWishList,
  handleProductDetails,
  handleAddtoCart,
  cart,
  updateQuantity,
  setCart,
}) => {
  return (
    <div>
      <div>
        <h1>Your List</h1>
        {favoriteList.length > 0 && (
          <p>
            {favoriteList.length} Item{favoriteList.length > 2 ? "s" : ""}
          </p>
        )}
      </div>
      <ul>
        {favoriteList.map((item) => {
          return (
            <li key={item._id}>
              <img
                src={item.image}
                onClick={() => handleProductDetails(item._id, item.category)}
                alt={item.title}
                style={{ width: "200px", height: "auto" }}
              />
              <p onClick={() => handleProductDetails(item._id, item.category)}>
                {item.name}
              </p>
              <p>${item.price}</p>
              {cart.some((product) => product._id === item._id) ? (
                <div>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
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
                        item.id,
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

              <button onClick={() => handleWishList(item)}>
                {favoriteList.some((favItem) => favItem._id === item._id)
                  ? "Remove from favorites"
                  : "Save for later"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WishList;
