import React from 'react'
import '../styles/Admin_header.css'
import { Link, useNavigate } from 'react-router-dom'

function AdminHeader() {
  const navigate = useNavigate()

  const logout = ()=> {
    localStorage.clear();
    navigate('/')
  }
  
  return (
    <>
      <header className='admin-header'>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/admin'>Dashboard</Link></li>
                <li><Link to='/admin/manage/admin'>Admin</Link></li>
                <li><Link to='/admin/manage/categories'>Categories</Link></li>
                <li><Link to='/admin/manage/books'>Books</Link></li>
                <li><Link to='/admin/manage/orders'>Orders</Link></li>
                <li><Link to="/" onClick={logout}>Logout</Link></li>
            </ul>
        </nav>
      </header>
    </>
  )
}

export default AdminHeader
