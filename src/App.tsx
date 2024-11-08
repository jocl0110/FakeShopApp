import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setData(data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);
  console.log(data);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <main>
                  <div></div>
                  <div>
                    <ul className="products-grid">
                      {data &&
                        data.map((item) => {
                          return (
                            <li key={item.id}>
                              <img
                                style={{ width: "100px", height: "auto" }}
                                src={item.image}
                                alt={item.title}
                              />
                              <p>{item.title}</p>
                              <p>{item.description}</p>
                              <p>{item.price}</p>
                              <button type="button">Add to Cart</button>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </main>
                <Footer />
              </>
            }
          ></Route>
          <Route path="/wishlist" element={<h1>Hello</h1>}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
