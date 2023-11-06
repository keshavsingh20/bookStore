import React from 'react'
import '../styles/Check.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import bookImg from '../assets/images/book/Book_Name_164.jpg'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


function Checkout() {
    let { state } = useLocation();
    const [quantity, setQuantity] = useState(state.quantity);
    const book = state.bookDetails;
    const user = JSON.parse(localStorage.getItem('user'))

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phoneNo, setPhoneNo] = useState(user.phoneNo)
    const [address, setAddress] = useState(user.address)
    const [State, setState] = useState(user.state)
    const [country, setCountry] = useState(user.country)
    const [pin, setPin] = useState(user.pin)


    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };


    const checkoutHandler = async (amount) => {
        const data = await fetch("/api/payment/checkout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount })
        })

        const orderDetails = await data.json()
        const order = orderDetails.order;
        // console.log(orderDetails)
        // console.log(order)

        const keyData = await fetch("/api/payment/getkey");
        const { key } = await keyData.json();
        // console.log(key)


        const options = {
            key: key, // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "BookStore",
            description: "BookStore Transaction Testing",
            image: "https://example.com/your_logo", // change according your specific image
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            // callback_url: "http://localhost:5000/api/payment/paymentverification",
            // handler: async function (response){
            //     // alert(response.razorpay_payment_id);
            //     // alert(response.razorpay_order_id);
            //     // alert(response.razorpay_signature)
            //     const razorpay_payment_id = response.razorpay_payment_id;
            //     const razorpay_order_id = response.razorpay_order_id;
            //     const razorpay_signature = response.razorpay_signature
            //     await fetch("http://localhost:5000/api/payment/paymentverification", {
            //         method: 'POST',
            //         body: JSON.stringify({
            //             razorpay_payment_id,
            //            razorpay_order_id,
            //            razorpay_signature
            //         }),
            //         headers: {
            //             "Content-Type": "application/json",
            //         }
            //     })  

            // },
            handler: async function (response) {
                const razorpay_payment_id = response.razorpay_payment_id;
                const razorpay_order_id = response.razorpay_order_id;
                const razorpay_signature = response.razorpay_signature;

                const data = await fetch("/api/payment/paymentverification", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: user._id,
                        book: book.title,
                        category: book.category,
                        price: book.price,
                        quantity: quantity,
                        customer_name: name,
                        customer_email: email,
                        customer_phone: phoneNo,
                        customer_address: address,
                        customer_state: State,
                        customer_country: country,
                        customer_pin: pin,
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature
                    }),
                });

                if (data.status == 200) {
                    // Check if the response status is ok (HTTP 200)
                    const responseData = await data.json();
                    if (responseData.success) {
                        // Payment verification was successful
                        // Redirect to the success page
                        window.location.href = `https://bookstore-xpjv.onrender.com/paymentsuccess?reference=${razorpay_payment_id}`;
                    } else {
                        // Handle a failed payment verification
                        console.error("Payment Failed...!");
                        alert('Payment verification failed.')
                    }
                } else {
                    // Handle non-200 HTTP status codes
                    alert('Payment Failed...!')
                    console.error(`Payment verification failed with status: ${data.status}`);
                }
            },
            prefill: {
                name: name,
                email: email,
                contact: phoneNo
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#137C1A"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open()
        // document.getElementById('rzp-button1').onclick = function(e){
        //     razor.open();
        //     e.preventDefault();
        // }
    }

    return (
        <>
            <Header />

            <div className="checkout-container">
                <h1 style={{ fontSize: '24px', marginBottom: '20px' }} >Checkout</h1>
                <div className='products'>
                    <div className='product-details'>
                        <img src={book.image} alt="" />
                        <div className='product-info'>
                            <p>{book.title}</p>
                            <p>₹ {book.price}</p>
                            <div className='quantity-details'>
                                <p>Quantity: </p>
                                <div className="quantity" style={{ justifyContent: 'center' }}>
                                    <p className="quantity-btn decrease" onClick={decreaseQuantity}>-</p>
                                    <p className="quantity-value">{quantity}</p>
                                    <p className="quantity-btn increase" onClick={increaseQuantity}>+</p>
                                </div>
                            </div>
                            <p>Total : ₹ <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{book.price * quantity}</span></p>
                        </div>
                    </div>

                </div>
                {/* <form> */}
                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className="input-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" id="phone" name="phone" onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} required />
                </div>
                <div className="input-group">
                    <label htmlFor="address">Address:</label>
                    <textarea id="address" name="address" onChange={(e) => setAddress(e.target.value)} value={address} required></textarea>
                </div>
                <div className="input-group">
                    <label htmlFor="state">State:</label>
                    <input type="text" id="state" name="state" onChange={(e) => setState(e.target.value)} value={State} required></input>
                </div>
                <div className="input-group">
                    <label htmlFor="country">Country:</label>
                    <input type='text' id="country" name="country" onChange={(e) => setCountry(e.target.value)} value={country} required></input>
                </div>
                <div className="input-group">
                    <label htmlFor="pincode">PIN Code:</label>
                    <input type='text' id="pincode" name="pincode" onChange={(e) => setPin(e.target.value)} value={pin} required></input>
                </div>

                <button className='pay-btn' onClick={() => checkoutHandler(book.price * quantity)} >Confirm and Pay</button>
                {/* </form> */}
            </div>

            <Footer />
        </>
    )
}

export default Checkout;
