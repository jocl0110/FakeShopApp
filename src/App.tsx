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

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [url, setUrl] = useState("");

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

  const handleProductDetails = (getCurrentId: string) => {
    console.log(getCurrentId);

    navigate(`/product/${getCurrentId}`);
  };

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
                              onClick={() => handleProductDetails(item.id)}
                              style={{ width: "200px", height: "auto" }}
                              src={item.thumbnail}
                              alt={item.title}
                            />
                            <p>
                              <IoStar />
                              {item.rating}
                            </p>
                            <p onClick={() => handleProductDetails(item.id)}>
                              {item.title}
                            </p>
                            <p>${item.price}</p>
                            <p>{item.availabilityStatus}</p>
                            <button type="button">Add to Cart</button>
                            <button type="button">
                              Save it for later
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
                <div>
                  <button>
                    <GrFormPrevious onClick={handlePrevious} />
                  </button>
                  <span>
                    Slide {currentSlide + 1} of {totalSlides}
                  </span>
                  <button>
                    <MdNavigateNext onClick={handleNext} />
                  </button>
                </div>
              </main>
              <Footer />
            </>
          }
        ></Route>
        <Route path="/wishlist" element={<h1>Hello</h1>}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/category/:name" element={<Departments url={url} />}>
          {" "}
        </Route>
      </Routes>
    </>
  );
}

export default App;
