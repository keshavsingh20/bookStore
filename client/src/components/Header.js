import React, {useState} from "react";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-3.png";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate('/login')
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
     <header className={`header ${menuOpen ? "open" : ""}`}>
        <div className="logo">
          <Link to="/"><img src={logo} alt="" /></Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            {
              
              user && user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>
            }
            {
              user ?
              <>
              <li><Link to="/profile" >Profile</Link></li>
              <li><Link to="/login" onClick={logout} >Logout</Link></li>
              </>
                :
                <>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>
                </> 
            }
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
