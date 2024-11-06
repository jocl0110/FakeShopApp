import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products?");
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
      <NavBar />
      <main>
        <div>
          <label>
            <input type="text" placeholder="What can we help you find" />{" "}
            <button>Search</button>
          </label>
        </div>
        <div>
          <ul className="products-grid">
            {data &&
              data.map((item) => {
                return (
                  <li>
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
  );
}

export default App;
