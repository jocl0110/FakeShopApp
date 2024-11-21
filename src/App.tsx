import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import { IoStar } from "react-icons/io5";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { CiHeart } from "react-icons/ci";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Departments from "./components/Departments/Departments";
import { FaMinus, FaPlus } from "react-icons/fa";
import WishList from "./components/WishList/WishList";

// Types
interface ProductType {
  id: string;
  category: string;
  thumbnail: string;
  title: string;
  price: number;
  rating: number;
  availabilityStatus: string;
  quantity?: number;
}

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<ProductType[]>([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [url, setUrl] = useState("");

  //Getting total quantity of items in the cart and total price
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice: string = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const realTotalPrice: number = parseFloat(totalPrice);

  const getData = async (searchParam = "", limit = 100) => {
    try {
      const url = searchParam
        ? `https://dummyjson.com/products/search?q=${searchParam}&limit=${limit}`
        : `https://dummyjson.com/products?limit=${limit}`;
      const res = await fetch(url);
      const data = await res.json();
      setData(data.products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleProductDetails = (
    getCurrentId: string,
    getCurrentCategory: string
  ) => {
    console.log(getCurrentId);
    navigate(`/products/departments/${getCurrentCategory}/${getCurrentId}`);
  };
  const handleAddtoCart = (getItem: ProductType) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((product) => product.id === getItem.id);
      if (itemInCart) {
        return prevCart.map((product) => {
          product.id === getItem.id
            ? { ...product, quantity: (product.quantity || 1) + 1 }
            : product;
        });
      }
      return [...prevCart, { ...getItem, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((product) => product.id !== id);
      }
      return prevCart.map((product) =>
        product.id === id ? { ...product, quantity } : product
      );
    });
  };

  const handleWishList = (getCurrentItem) => {
    console.log(getCurrentItem);

    let favoriteListCopy = [...favoriteList];
    const index = favoriteListCopy.findIndex((item) => {
      return item.id === getCurrentItem.id;
    });
    if (index === -1) {
      favoriteListCopy.push(getCurrentItem);
    } else {
      favoriteListCopy.splice(index, 1);
    }
    setFavoriteList(favoriteListCopy);
  };

  // Slider Funcionality
  const itemsPerPage = 20;
  const totalSlides = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentSlide * itemsPerPage;
  const currentProducts = data.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (startIndex + itemsPerPage < data.length) {
      setCurrentSlide((prevState) => prevState + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prevState) => prevState - 1);
    }
  };

  return (
    <>
      <NavBar setUrl={setUrl} onSearch={getData} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <main>
                <div></div>
                <div>
                  <ul className="products-grid">
                    {currentProducts && currentProducts.length > 0 ? (
                      currentProducts.map((item) => {
                        return (
                          <li key={item.id}>
                            <img
                              onClick={() =>
                                handleProductDetails(item.id, item.category)
                              }
                              style={{ width: "200px", height: "auto" }}
                              src={item.thumbnail}
                              alt={item.title}
                            />
                            <p>
                              <IoStar />
                              {item.rating}
                            </p>
                            <p
                              onClick={() =>
                                handleProductDetails(item.id, item.category)
                              }
                            >
                              {item.title}
                            </p>
                            <p>${item.price}</p>
                            <p>{item.availabilityStatus}</p>
                            {cart.some((product) => product.id === item.id) ? (
                              <div>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      (cart.find(
                                        (product) => product.id === item.id
                                      )?.quantity || 1) - 1
                                    )
                                  }
                                >
                                  <FaMinus />
                                </button>
                                <span>
                                  {cart.find(
                                    (product) => product.id === item.id
                                  )?.quantity || 1}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      (cart.find(
                                        (product) => product.id === item.id
                                      )?.quantity || 1) + 1
                                    )
                                  }
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleAddtoCart(item)}
                                type="button"
                              >
                                Add to Cart
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleWishList(item)}
                            >
                              Save for later
                              <CiHeart />
                            </button>
                          </li>
                        );
                      })
                    ) : (
                      <p>No product found</p>
                    )}
                  </ul>
                </div>
                <div
                  className={
                    data.length >= 20 ? "show-slides" : "not-show-slides"
                  }
                >
                  <button
                    onClick={handlePrevious}
                    disabled={currentSlide === 0}
                  >
                    <GrFormPrevious />
                  </button>
                  <span>
                    Slide {currentSlide + 1} of {totalSlides}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentSlide + 1 === totalSlides}
                  >
                    <MdNavigateNext />
                  </button>
                </div>
              </main>
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/wishlist"
          element={
            <WishList favoriteList={favoriteList} quantity={totalQuantity} />
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <Cart
              handleProductDetails={handleProductDetails}
              prize={realTotalPrice}
              quantity={totalQuantity}
              cart={cart}
              setCart={setCart}
            />
          }
        ></Route>
        <Route
          path="/products/departments/:category/:id"
          element={
            <ProductDetails
              Cart={cart}
              handleAddtoCart={handleAddtoCart}
              updateQuantity={updateQuantity}
            />
          }
        ></Route>
        <Route
          path="products/departments/:name"
          element={<Departments url={url} />}
        >
          {" "}
        </Route>
      </Routes>
    </>
  );
}

export default App;
