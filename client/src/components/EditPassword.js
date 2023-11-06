import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useParams, useNavigate } from 'react-router-dom'

const EditPassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const params = useParams()
    const navigate = useNavigate()


    const handlePasswordChange = async () => {
        if (confirmPassword === newPassword && newPassword.length > 0) {
            let data = await fetch(`/api/user/profile/change/password/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ currentPassword, newPassword }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            data = await data.json();
            // console.log(data)
            if (data.modifiedCount === 1) {
                alert('Password Updated Successfully..!')
                navigate('/profile')
            }
            else {
                alert('Enter cuurent password correctly..!')
            }
        }
        else {
            alert('Please enter new password and confirm password correctly..!')
        }
    }


    return (
        <div>
            <Header />

            <div className='profile'>
                <h1>Change Password</h1>

                <div className="input-box">
                    <label htmlFor="old">Old Password: </label>
                    <input type="password" id="old" name="old" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="input-box">
                    <label htmlFor="new">New Password: </label>
                    <input type="password" id="new" name="new" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="input-box">
                    <label htmlFor="confirm">Confirm New Password: </label>
                    <input type="password" id="confirm" name="confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div style={{ marginTop: '40px' }}>
                    <button className='profile-button' onClick={handlePasswordChange}>Update Password</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default EditPassword
