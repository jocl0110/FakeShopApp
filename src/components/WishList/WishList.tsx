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
            <li key={item.id}>
              <img
                src={item.thumbnail}
                onClick={() => handleProductDetails(item.id, item.category)}
                alt={item.title}
              />
              <p onClick={() => handleProductDetails(item.id, item.category)}>
                {item.title}
              </p>
              <p>${item.price}</p>
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
                    {cart.find((product) => product.id === item.id)?.quantity ||
                      1}
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

              <button onClick={() => handleWishList(item)}>
                {favoriteList.some((favItem) => favItem.id === item.id)
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
