import React, { useState, useEffect } from "react";
import "../styles/Cart.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bookImg from "../assets/images/book/Book_Name_164.jpg";
import CartItem from "../components/CartItem";

const Cart = () => {
  const [items, setItems] = useState("");
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    let result = await fetch(`/api/cart/all/${userId}`);
    result = await result.json();
    setItems(result);
  };

  const handleRemove = async (bookId) => {
    let result = await fetch(
      `/api/cart/remove/${userId}/${bookId}`,
      {
        method: "DELETE",
        header: {
          "Content-Type": "application/json",
        },
      }
    );

    getItems();
  };



  return (
    <>
      <Header />

      <div className="cart-container">
        <h1>My Shopping Cart</h1>
        <div className="cart-items">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem item={item} handleRemove={handleRemove} />
            ))
          ) : (
            <div>
              <h2>No Item found in your cart...!</h2>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
