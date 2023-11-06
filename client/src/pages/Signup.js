import React from 'react'
import '../styles/Signup.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfpassword] = useState("")
  const [phoneNo, setPhoneNo] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"))
    if(auth) {
      auth.role === "user" ?
      navigate('/')
      :
      navigate('/admin')
    }
  }, [])

  const handleSignUp = async () => {
    if (!username || !email || !password || !confPassword || !phoneNo || !role) {
      setError(true)
      return false;
    }

    if (confPassword === password) {
      let user = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify({ name: username, email, password, phoneNo, role }),
        headers: {
          "Content-Type": "application/json",
        }
      })

      user = await user.json()
      if (!user.res) {
        localStorage.setItem("user", JSON.stringify(user.userData));
        localStorage.setItem("token", JSON.stringify(user.auth))
        navigate('/')
      }
      else {
        alert(user.res)
      }

    }
    else {
      alert("Confirm password didn't matched. Please enter confirm password correctly..!")
    }

  }

  return (
    <>
      <Header />

      <div className="SignUpContainer">
        <div className="subSignUpContainer">
          <div className="headingContainer">
            <h4>REGISTER</h4>
            <span>Happy To Join You...!</span>
          </div>

          <div className="inputContainer">
            <input type="text" onChange={(e) => setUsername(e.target.value)} id='username' placeholder="Username" />
            {error && !username && <span className='validation-error'>Please enter your username</span>}
            <input type="email" onChange={(e) => setEmail(e.target.value)} id='email' placeholder="Email" />
            {error && !email && <span className='validation-error'>Please enter your email address</span>}
            <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNo(e.target.value)} />
            {error && !phoneNo && <span className='validation-error'>Please enter your phone number</span>}
            <input type="password" onChange={(e) => setPassword(e.target.value)} id='password' placeholder="Password" />
            {error && !password && <span className='validation-error'>Please enter valid password</span>}
            <input type="password" placeholder="Confirm Password" onChange={(e) => setConfpassword(e.target.value)} />
            {error && !confPassword && <span className='validation-error'>Please enter confirm password</span>}
            {/* <select name="user-role" id="user-role" onChange={(e) => setRole(e.target.value)}>
              <option value="" selected disabled>Please Choose Your Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            {error && !role && <span className='validation-error'>Please enter your role</span>} */}
            <button type="submit" onClick={handleSignUp} className="loginButton">
              Register
            </button>
          </div>

          <div className="logFooterContainer">
            <span>
              Already Registered?{" "}
              <Link to="/login" style={{ fontWeight: "bold", color: "blue", textDecoration: "none" }}>
                Login Now
              </Link>
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Signup
