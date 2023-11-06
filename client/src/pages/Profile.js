import React from 'react'
import '../styles/Profile.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const { name, email, phoneNo, address, state, country, pin } = user


    return (
        <div>
            <Header />

            <div className='profile'>
                <h1>My Profile</h1>

                <div className="input-box">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" value={name} readOnly />
                </div>
                <div className="input-box">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" value={email} readOnly />
                </div>
                <div className="input-box">
                    <label htmlFor="phone">Phone: </label>
                    <input type="text" id="phone" name="phone" value={phoneNo} readOnly />
                </div>
                <div className="input-box">
                    <label htmlFor="address">Address: </label>
                    <textarea id="address" name="address" value={address} readOnly></textarea>
                </div>
                <div className="input-box">
                    <label htmlFor="state">State: </label>
                    <input type="text" id="state" name="state" value={state} readOnly></input>
                </div>
                <div className="input-box">
                    <label htmlFor="country">Country: </label>
                    <input type='text' id="country" name="country" value={country} readOnly></input>
                </div>
                <div className="input-box">
                    <label htmlFor="pincode">PIN Code: </label>
                    <input type='text' id="pincode" name="pincode" value={pin} readOnly></input>
                </div>
                <div className='profile-btn-container'>
                    <Link to={`/myorders`} className='profile-button' style={{textDecoration:'none', color:'black'}}>My Orders</Link> 
                    <Link to={`/edit/profile/${user._id}`} className='profile-button' style={{ textDecoration: 'none', color: 'black' }}>Update Profile</Link>
                    <Link to={`/edit/password/${user._id}`} className='profile-button' style={{ textDecoration: 'none', color: 'black' }}>Change Password</Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Profile
