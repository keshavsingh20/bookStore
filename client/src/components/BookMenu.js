import React from 'react'
import '../styles/BookMenu.css'
import BookComp from './BookComp'

const BookMenu = ({books}) => {


  return (
    <>
        <h2>Book Menu</h2>
        <div className='book-container'>
          {
            books.length > 0 ?
            books.map((book, index)=>
              <BookComp book={book} key={index}/>
            )
            :
            <div><h2>No books found...!</h2></div>
          }
        </div>

    </>
  )
}

export default BookMenu;
