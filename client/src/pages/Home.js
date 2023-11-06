import React from "react";
import "../styles/Home.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import ExploreBooks from "../components/ExploreBooks";
import BookMenu from "../components/BookMenu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchkey, setSearchKey] = useState("");
  const [categories, setCategories] = useState([])
  // const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getBooks();
  }, [])

  const getBooks = async () => {
    let result = await fetch("/api/book/books/details");
    result = await result.json();
    setBooks(result);
  }


  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    let result = await fetch("/api/category/details");

    result = await result.json();
    setCategories(result);
  }


  const handleSearch = async (searchkey) => {
    let key = searchkey
    if (key) {
      let result = await fetch(`/api/book/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        setBooks(result)
      }
      else {
        getBooks()
      }
    }
    else {
      getBooks()
    }
  }


  return (
    <>
      <Header />

      <div className="home-container">
        <Search handleSearch={handleSearch} setSearchKey={setSearchKey} />
        <div className="explore">
          <ExploreBooks categories={categories.slice(0, 3)} />
          <Link to="/categories" className="explore-all">See All Categories</Link>
        </div>

        <div className='book-menu'>
          <BookMenu books={books.slice(0, 4)} />
          <Link to="/books" className='seeAllBtn'>See All Books</Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
