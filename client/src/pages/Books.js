import React, { useState, useEffect } from 'react'
import '../styles/Books.scss'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from '../components/Search'
import BookMenu from '../components/BookMenu'

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchkey, setSearchKey] = useState("");
  // const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getBooks();
  }, [])

  const getBooks = async () => {
    let result = await fetch("/api/book/books/details");
    result = await result.json();
    setBooks(result);
  }

  const handleSearch = async (searchkey) => {
    let key = searchkey;
    if (key) {
      let result = await fetch(`/api/book/search/${key}`, {
        headers: {
          // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
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

      <Search handleSearch={handleSearch} setSearchKey={setSearchKey} />
      <div className='book-menu'>
        <BookMenu books={books} />
      </div>

      <Footer />
    </>
  )
}

export default Books;