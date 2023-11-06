import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const CartItem = ({item, handleRemove})=> {
    const [quantity, setQuantity] = useState(item.quantity);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const bookDetails = {
        image: item.bookDetails.image,
        title: item.bookDetails.title,
        category: item.bookDetails.category,
        price: item.bookDetails.price,
        author: item.bookDetails.author
    }

    return (
        <div className="item-card" key={item._id}>
        <img src={item.bookDetails.image} alt="" />
        <div className="item-details">
            <div className="item">
                <p>{item.bookDetails.title}</p>
                <p>{item.bookDetails.category}</p>
                <p>{item.bookDetails.author}</p>
                <p className="price">₹ {item.bookDetails.price}</p>
            </div>
        </div>
        <div className="sub-details">
            <div className='quantity-info'>
                <p>Quantity: </p>
                <div className="quantity">
                    <p className="quantity-btn decrease" onClick={decreaseQuantity}>-</p>
                    <p className="quantity-value">{quantity}</p>
                    <p className="quantity-btn increase" onClick={increaseQuantity}>+</p>
                </div>
            </div>
            <p>Total Price: <span className="price">₹ {item.bookDetails.price * quantity}</span></p>
            {/* <button className="buy-btn cart-btn">Buy Now</button> */}
            <Link to={`/order/checkout/${item.bookDetails._id}`}
                            state = {{bookDetails, quantity}}
                            className='buy-btn cart-btn'
                            style={{ textDecoration: 'none' }}>Order Now</Link>
            <button className="delete-btn cart-btn" onClick={()=>handleRemove(item.bookDetails._id)}>Remove</button>
        </div>
    </div>
    )
}

export default CartItem;