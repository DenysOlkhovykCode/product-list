import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";

const ProductPage = ({ products, setProducts, setShowAboutProduct }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((prod) => prod.id === parseInt(id));
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (product) {
      setComments(product.comments || []);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const storedProduct = storedProducts.find((prod) => prod.id === product.id);

      if (storedProduct && storedProduct.comments) {
        setComments(storedProduct.comments);
      }
    }
  }, [product]);

  if (!product) {
    return <div>Продукт не знайдено</div>;
  }

  const handleEditProduct = (updatedProduct) => {
    const updatedProducts = products.map((prod) =>
      prod.id === updatedProduct.id ? updatedProduct : prod
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleAddComment = () => {
    if (newComment) {
      const newCommentObj = {
        id: comments.length + 1,
        description: newComment,
      };

      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments);
      setNewComment("");

      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = storedProducts.map((prod) =>
        prod.id === product.id ? { ...prod, comments: updatedComments } : prod
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = storedProducts.map((prod) =>
      prod.id === product.id ? { ...prod, comments: updatedComments } : prod
    );
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const BackToList = () => {
    setShowAboutProduct(false);
    navigate("/");
  };

  return (
    <div>
      <button onClick={BackToList}>Назад до списку продуктів</button>
      <h2>{product.name}</h2>
      <p>Кількість: {product.count}</p>
      <p>
        Розмір: {product.size.width} x {product.size.height}
      </p>
      <p>Вага: {product.weight}</p>

      <button onClick={() => setShowModal(true)}>Редагувати продукт</button>
      <AddProduct
        show={showModal}
        onClose={() => setShowModal(false)}
        onAddProduct={handleEditProduct}
        product={product}
      />

      <h3>Коментарі</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.description}</p>
            <button onClick={() => handleDeleteComment(comment.id)}>Видалити</button>
          </li>
        ))}
      </ul>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Додати коментар"
      />
      <button onClick={handleAddComment}>Додати коментар</button>
    </div>
  );
};

export default ProductPage;
