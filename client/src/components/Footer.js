import React from 'react'
import '../styles/Footer.css'
import fbLogo from '../assets/images/facebook.jpg';
import instaLogo from '../assets/images/instagram.jpg';
import twitterLogo from '../assets/images/twitter.jpg';
import linkedinLogo from '../assets/images/linkedin.png';

const Footer = ()=> {
  return (
    <>
      <footer>
        <div className='social-icons'>
          <div className='social'>
            <a href="#"><img src={fbLogo} alt="" /></a>
          </div>
          <div className='social'>
            <a href="#"><img src={instaLogo} alt="" /></a>
          </div>
          <div className='social'>
            <a href="#"><img src={twitterLogo} alt="" /></a>
          </div>
          <div className='social'>
            <a href="#"><img src={linkedinLogo} alt="" /></a>
          </div>
        </div>
        <div className='footer-details'>
          <p>2023 © All Copyrights reserved. <br /> Developed & Maintained By: &nbsp;
          <a href="https://in.linkedin.com/in/keshav-singh-yadav18" target='_blank'>Keshav Singh Yadav</a>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer;
