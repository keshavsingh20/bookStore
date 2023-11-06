import React from 'react'
import '../styles/ContactComp.css'

function ContactComp() {
    return (
        <>
            <div className='contact-container'>
                <h1 style={{ color: 'rgb(27, 97, 248)', marginBottom: '10px', fontWeight:'600' }}>We're here for you always</h1>
                <div className='contact'>
                    <div className='contact-details'>
                        <div>
                            <p>Keshav Singh Yadav</p>
                            <p>Email: <a href="mailto:keshavyadav200018@gmail.com" className='contact-links'>keshavyadav200018@gmail.com</a></p>
                            <p>Phone No: <a href="tel:+916378407433" className='contact-links'>+91 6378407433</a></p>
                        </div>
                        <div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.838971791765!2d73.2921320742475!3d28.05994097598226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6adbe0a7c29%3A0xc45e43813e5ac1e0!2sEngineering%20College%20Bikaner!5e0!3m2!1sen!2sin!4v1693598605716!5m2!1sen!2sin" width="300" height="220" style={{ border: '2px solid green', borderRadius: "10px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div className='contact-form'>
                            <input type="text" placeholder='Enter Your Name' />
                            <input type="email" placeholder='Enter Your Email' />
                            <input type="text" placeholder='Enter Subject' />
                            <textarea name="" id="" cols="30" rows="8" placeholder=''></textarea>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactComp
