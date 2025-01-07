import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import { IoStar } from "react-icons/io5";
import ProductDetails from "./components/ProductDetails/ProductDetails";

import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Departments from "./components/Departments/Departments";
import { FaMinus, FaPlus } from "react-icons/fa";
import WishList from "./components/WishList/WishList";
import SignIn from "./components/Sign-In/SignIn";
import SignUp from "./components/Sign-Up/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Settings/Settings";

// Types
interface ProductType {
  _id: string;
  category: string;
  image: string;
  name: string;
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

  //Getting total quantity of items in the cart and total price
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice: string = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const realTotalPrice: number = parseFloat(totalPrice);

  const getData = async (searchParam = "") => {
    try {
      const url = searchParam
        ? "api/products?search=" + searchParam
        : "api/products";
      const res = await fetch(url);
      const data = await res.json();
      setData(data.data);
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
    navigate(`/products/departments/${getCurrentCategory}/${getCurrentId}`);
  };
  const handleAddtoCart = (getItem: ProductType) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find(
        (product) => product._id === getItem._id
      );
      if (itemInCart) {
        return prevCart.map((product) => {
          product._id === getItem._id
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
        return prevCart.filter((product) => product._id !== id);
      }
      return prevCart.map((product) =>
        product._id === id ? { ...product, quantity } : product
      );
    });
  };

  const handleWishList = (getCurrentItem) => {
    console.log(getCurrentItem);

    let favoriteListCopy = [...favoriteList];
    const index = favoriteListCopy.findIndex((item) => {
      return item._id === getCurrentItem._id;
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
  const handleSignIn = () => {
    navigate("/signin");
  };
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleSettings = () => {
    navigate("/settings");
  };
  const location = useLocation();

  const noNavBar = ["/signin", "/signup"];

  return (
    <>
      {!noNavBar.includes(location.pathname) && (
        <NavBar
          handleHome={handleHome}
          handleDashboard={handleDashboard}
          handleSignIn={handleSignIn}
          onSearch={getData}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <main>
                <div>
                  <ul className="products-grid">
                    {currentProducts && currentProducts.length > 0 ? (
                      currentProducts.map((item) => {
                        return (
                          <li className="product-card" key={item._id}>
                            <img
                              className="product-image"
                              onClick={() =>
                                handleProductDetails(item._id, item.category)
                              }
                              style={{ width: "200px", height: "auto" }}
                              src={item.image}
                              alt={item.name}
                            />
                            <div className="product-info">
                              <p className="product-rating">
                                <IoStar />
                                {item.rating}
                              </p>

                              <p
                                className="product-name"
                                onClick={() =>
                                  handleProductDetails(item._id, item.category)
                                }
                              >
                                {item.name}
                              </p>
                            </div>
                            <div className="product-action">
                              <p className="product-price">
                                <span className="currency">US$</span>{" "}
                                {item.price}
                              </p>
                              {cart.some(
                                (product) => product._id === item._id
                              ) ? (
                                <div className="quantity-btns-container">
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item._id,
                                        (cart.find(
                                          (product) => product._id === item._id
                                        )?.quantity || 1) - 1
                                      )
                                    }
                                  >
                                    <FaMinus />
                                  </button>
                                  <span>
                                    {cart.find(
                                      (product) => product._id === item._id
                                    )?.quantity || 1}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item._id,
                                        (cart.find(
                                          (product) => product._id === item._id
                                        )?.quantity || 1) + 1
                                      )
                                    }
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="add-to-cart-btn"
                                  onClick={() => handleAddtoCart(item)}
                                  type="button"
                                >
                                  Add to Cart
                                </button>
                              )}

                              <button
                                className="wishlist-btn"
                                type="button"
                                onClick={() => handleWishList(item)}
                              >
                                {favoriteList.some(
                                  (favItem) => favItem._id === item._id
                                )
                                  ? "Remove from favorites"
                                  : "Save for later"}
                              </button>
                            </div>
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
            <WishList
              setFavoriteList={setFavoriteList}
              setCart={setCart}
              cart={cart}
              updateQuantity={updateQuantity}
              handleAddtoCart={handleAddtoCart}
              handleProductDetails={handleProductDetails}
              handleWishList={handleWishList}
              favoriteList={favoriteList}
            />
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <Cart
              favoriteList={favoriteList}
              handleWishList={handleWishList}
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
          element={
            <Departments
              updateQuantity={updateQuantity}
              cart={cart}
              handleAddtoCart={handleAddtoCart}
              handleWishList={handleWishList}
              favoriteList={favoriteList}
              handleProductDetails={handleProductDetails}
            />
          }
        >
          {" "}
        </Route>
        <Route
          path="/signin"
          element={
            <SignIn handleHome={handleHome} handleSignUp={handleSignUp} />
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <SignUp handleSignIn={handleSignIn} handleHome={handleHome} />
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              handleHome={handleHome}
              handleSettings={handleSettings}
            />
          }
        ></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </>
  );
}

export default App;
