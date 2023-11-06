import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'

const BookComp = ({ book }) => {
    const [quantity, setQuantity] = useState(1);
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    // console.log(user)

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };


    const addToCart = async (id) => {
        if(user){
            const cartItem = await fetch(`/api/cart/add`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: user._id,
                    bookId: book._id,
                    quantity
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
    
            const data = await cartItem.json();
            if (data) {
                alert('Item added successfully to the cart..!')
            }
        }
        else{
            navigate('/login')
        }
        
    }

    const bookDetails = {
        image: book.image,
        title: book.title,
        category: book.category,
        price: book.price,
        author: book.author
    }

    return (
        <div className='book-card' key={book._id}>
            <img src={book.image} alt="" />
            <div className='book-details'>
                <div className='top-dtails'>
                    <p>{book.title}</p>
                    <p>{book.category}</p>
                    <p className='price'>₹ {book.price}</p>
                    <div className='quantity-info'>
                        <p>Quantity: </p>
                        <div className="quantity">
                            <p className="quantity-btn decrease" onClick={decreaseQuantity}>-</p>
                            <p className="quantity-value">{quantity}</p>
                            <p className="quantity-btn increase" onClick={increaseQuantity}>+</p>
                        </div>
                    </div>
                    <p>Total : <span className='price'>₹ {book.price * quantity}</span></p>
                    <div className='btn-container'>
                        {/* <button className='order-btn'>Order Now</button> */}
                        <Link to={`/order/checkout/${book._id}`}
                            state = {{bookDetails, quantity}}
                            className='order-btn'
                            style={{ textDecoration: 'none' }}>Order Now</Link>
                        <button className='add2cart-btn' onClick={() => addToCart(book._id)}>Add to Cart</button>
                    </div>
                </div>
                <div className='author-details'>
                    <p>{book.author}</p>
                </div>
            </div>
        </div>
    )
}


export default BookComp;