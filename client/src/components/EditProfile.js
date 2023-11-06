import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useParams, useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phoneNo, setPhoneNo] = useState(user.phoneNo)
    const [address, setAddress] = useState(user.address)
    const [state, setState] = useState(user.state)
    const [country, setCountry] = useState(user.country)
    const [pin, setPin] = useState(user.pin)
    const params = useParams()
    const navigate = useNavigate()


    const updatedProfile = async () => {
        let user = await fetch(`/api/user/profile/${params.id}`, {
            headers: {
                // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        user = await user.json()
        localStorage.setItem("user", JSON.stringify(user[0]));
        navigate('/profile')
    }

    const handleEditProfile = async () => {
        let data = await fetch(`/api/user/profile/edit/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, email, phoneNo, address, state, country, pin }),
            headers: {
                'Content-Type': 'application/json',
                // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        data = await data.json()
        if (data.modifiedCount === 1) {
            alert('Profile Updated Successfully..!')
            updatedProfile();
        }
        else {
            navigate('/profile')
        }
    }


    return (
        <div>
            <Header />

            <div className='profile'>
                <h1>Update Profile</h1>

                <div className="input-box">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-box">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-box">
                    <label htmlFor="phone">Phone: </label>
                    <input type="text" id="phone" name="phone" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                </div>
                <div className="input-box">
                    <label htmlFor="address">Address: </label>
                    <textarea id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                </div>
                <div className="input-box">
                    <label htmlFor="state">State: </label>
                    <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)}></input>
                </div>
                <div className="input-box">
                    <label htmlFor="country">Country: </label>
                    <input type='text' id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}></input>
                </div>
                <div className="input-box">
                    <label htmlFor="pincode">PIN Code: </label>
                    <input type='text' id="pincode" name="pincode" value={pin} onChange={(e) => setPin(e.target.value)}></input>
                </div>
                <div style={{ marginTop: '40px' }}>
                    <button className='profile-button' onClick={handleEditProfile}>Update</button>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default EditProfile
