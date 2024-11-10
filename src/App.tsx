import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import { IoStar } from "react-icons/io5";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const getData = async (searchParam = "") => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchParam}`
      );
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

  return (
    <>
      <NavBar onSearch={getData} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <main>
                <div></div>
                <div>
                  <ul className="products-grid">
                    {data && data.length > 0 ? (
                      data.map((item) => {
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
                          </li>
                        );
                      })
                    ) : (
                      <p>No product found</p>
                    )}
                  </ul>
                </div>
              </main>
              <Footer />
            </>
          }
        ></Route>
        <Route path="/wishlist" element={<h1>Hello</h1>}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
