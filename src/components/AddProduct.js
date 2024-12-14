import React, { useState, useEffect } from "react";

const AddProduct = ({ show, onClose, onAddProduct, product }) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCount(product.count);
      setWidth(product.size.width);
      setHeight(product.size.height);
      setWeight(product.weight);
    }
  }, [product]);

  const handleSave = () => {
    if (!name || !count || !width || !height || !weight) {
      alert("Заповніть всі поля!");
      return;
    }
    const newProduct = {
      id: product ? product.id : Date.now(),
      name,
      count,
      size: { width, height },
      weight,
      comments: product ? product.comments : [],
    };
    onAddProduct(newProduct);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Додати продукт</h2>
        <label>
          Назва продукту:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введіть назву"
          />
        </label>
        <br />
        <label>
          Кількість:
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="Введіть кількість"
          />
        </label>
        <br />
        <label>
          Розмір (ширина):
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Ширина"
          />
        </label>
        <br />
        <label>
          Розмір (висота):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Висота"
          />
        </label>
        <br />
        <label>
          Вага:
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="200g"
          />
        </label>
        <div className="buttons">
          <button onClick={handleSave}>Зберегти</button>
          <button onClick={onClose}>Скасувати</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
