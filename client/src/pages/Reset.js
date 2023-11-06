import React from "react";
import "../styles/Reset.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Reset() {
  const [email, setEmail] = useState("");

  const handleReset = () => {};

  return (
    <>
      <Header />

      <div className="loginContainer">
        <div className="subSignUpContainer">
          <div className="headingContainer">
            <h4>RESET</h4>
            <span>
              Forgot Password? Don't Worry! We are here to help you...!
            </span>
          </div>

          <div className="inputContainer">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter Your Email..."
            />
            <button type="submit" onClick={handleReset} className="loginButton">
              Recover
            </button>
          </div>

          <div className="logFooterContainer">
            <span>
              Already Registered?{" "}
              <Link
                to="/login"
                style={{
                  fontWeight: "bold",
                  color: "blue",
                  textDecoration: "none",
                }}
              >
                Login Now
              </Link>
            </span>
            <span>
              Haven't Registered Yet?{" "}
              <Link
                to="/signup"
                style={{
                  fontWeight: "bold",
                  color: "blue",
                  textDecoration: "none",
                }}
              >
                Register Now
              </Link>
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Reset;
