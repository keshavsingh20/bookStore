import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookComp from "../components/BookComp";
import { useLocation } from "react-router-dom";

const CategoryBook = () => {
  let { state } = useLocation();
  const category = state;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    findCategoryBooks();
  }, []);

  const findCategoryBooks = async () => {
    let result = await fetch(
      `/api/book/search/${category}`,
      {
        headers: {
          // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      }
    );
    result = await result.json();
    if (result) {
      setBooks(result);
    } else {
      setBooks([]);
    }
  };

  return (
    <div>
      <Header />

      <div className="search">
        <div className="search-field">
          {/* <input type="text" placeholder="Search Categories here...!" value={'All availble categories are here.'} readOnly/> */}
          <h1 style={{ color: "white", background: "rgb(0, 0,0, 0.6)" }}>
            Availalve Books for {category}
          </h1>
          {/* <button className="search-btn">Search</button> */}
        </div>
      </div>

      <div className="book-container">
        {books.length > 0 ? (
          books.map((book, index) => <BookComp book={book} key={index} />)
        ) : (
          <div>
            <h2>No books found...!</h2>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryBook;
