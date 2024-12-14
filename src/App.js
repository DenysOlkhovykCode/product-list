import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ProductPage from "./components/ProductPage";

const App = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAboutProduct, setShowAboutProduct] = useState(false);
  const [sortMethod, setSortMethod] = useState("alphabetical");

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  React.useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const sortProducts = (method) => {
    const sortedProducts = [...products];
    if (method === "alphabetical") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (method === "count") {
      sortedProducts.sort((a, b) => b.count - a.count);
    }
    return sortedProducts;
  };

  const handleSortChange = (e) => {
    setSortMethod(e.target.value);
  };

  const OnAboutProduct = () => {
    setShowAboutProduct(true);
  };

  return (
    <Router>
      <div>
        {!showAboutProduct && (
          <>
            <h1>Список продуктів</h1>
            <button onClick={() => setShowModal(true)}>Додати продукт</button>

            <select value={sortMethod} onChange={handleSortChange}>
              <option value="alphabetical">За алфавітом</option>
              <option value="count">За кількістю</option>
            </select>

            <ul>
              {sortProducts(sortMethod).map((product) => (
                <li key={product.id}>
                  <Link onClick={OnAboutProduct} to={`/product/${product.id}`}>
                    {product.name} — {product.count} шт.
                  </Link>
                  <button onClick={() => deleteProduct(product.id)}>Видалити</button>
                </li>
              ))}
            </ul>

            <AddProduct
              show={showModal}
              onClose={() => setShowModal(false)}
              onAddProduct={handleAddProduct}
            />
          </>
        )}

        <Routes>
          <Route path="/" element={<h1> </h1>} />

          <Route
            path="/product/:id"
            element={
              <ProductPage
                products={products}
                setProducts={setProducts}
                setShowAboutProduct={setShowAboutProduct}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
