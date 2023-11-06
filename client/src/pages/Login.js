import React from 'react'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const navigate = useNavigate()
  

  const handleLogin = async () => {
    if(!email || !password) {
      setErr(true)
      return;
    }

    let userData = await fetch("/api/user/login",{
      method: "POST",
      body: JSON.stringify({email, password}),
      headers:{
        'Content-Type':'application/json'
      }
    })

    userData = await userData.json();
    if(!userData.res) {
      localStorage.setItem("user", JSON.stringify(userData.user))
      localStorage.setItem("token", JSON.stringify(userData.auth))
      navigate('/')
    }
    else {
      alert(userData.res)
    }
  }

  return (
    <>
      <Header />


      <div className="loginContainer">
        <div className="subSignUpContainer">
          <div className="headingContainer">
            <h4>LOGIN</h4>
            <span>We Are Happy To See You Again...!</span>
          </div>

          <div className="inputContainer">
            {/* <select name="loginType" id="loginType">
              <option value="" selected disabled>Please Select Login Type</option>
              <option value="user">User</option>
              <option value="vendor">Admin</option>
            </select> */}
            <input type="email" onChange={(e) => setEmail(e.target.value)} id='email' placeholder="Email" />
            {err && !email && <span className='validation-error'>Please enter your email address</span>}
            <input type="password" onChange={(e) => setPassword(e.target.value)} id='password' placeholder="Password" />
            {err && !password && <span className='validation-error'>Please enter valid password</span>}
            <button type="submit" onClick={handleLogin} className="loginButton">
              Login
            </button>
          </div>

          <div className="logFooterContainer">
            <span style={{ marginBottom: 10 }}>
              Forgot Password?{" "}
              <Link to="/forgot/password" style={{ fontWeight: "bold", color: "blue", textDecoration: "none" }}>
                Reset Now
              </Link>
            </span>
            <span>
              Haven't Registered Yet?{" "}
              <Link to="/signup" style={{ fontWeight: "bold", color: "blue", textDecoration: "none" }}>
                Register Now
              </Link>
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Login
