import { useState } from "react";

const WishList = ({ quantity, favoriteList }) => {
  return (
    <div>
      <h1>Your List</h1>
      <p>N Item(s)</p>
      <ul>
        {favoriteList.map((item) => {
          return (
            <li key={item.id}>
              <img src={item.thumbnail} alt="" />
              <p>{item.title}</p>
              <p>${item.price}</p>
              <button>Add to Cart</button>
              <button>Save for later</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WishList;
