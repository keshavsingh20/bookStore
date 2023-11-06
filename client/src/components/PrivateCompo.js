import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const PrivateComp = ()=> {
    const auth = localStorage.getItem("user");

    return auth ? <Outlet /> : <Navigate to='/login' />

}

export const AdminOutlet = ()=> {
    const userRole = JSON.parse(localStorage.getItem("user")).role;

    return userRole === 'admin' ? <Outlet /> : <Navigate to='/' />
}

export default PrivateComp;