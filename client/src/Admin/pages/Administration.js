import React, { useState, useEffect } from 'react'
import '../styles/Administration.css'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'
import { Link } from 'react-router-dom'

function Administration() {
    const [stores, setStores] = useState([])

    useEffect(() => {
        getStores()
    }, [])

    const getStores = async () => {
        const data = await fetch("/api/store/all")
        setStores(await data.json());
    }

    const handleDeleteStore = async (id) => {
        try {
            let result = await fetch(`/api/store/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if (result.acknowledged === true) {
                // window.location.reload(false);
                alert('Store Deleted Successfully...!')
                getStores()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <AdminHeader />

            <div className='admin-home-container'>
                <div className="main-content">
                    <h1>Administration</h1>

                    <Link to='/admin/add/store' className='btn btn-success adm-btn'>Add New Store</Link>
                    <div className='table-container'>
                        <table className="table tbl-full table-striped" style={{width: '90%'}}>
                            <thead>
                                <tr className="tbl-heading">
                                    <th>S.N.</th>
                                    <th>Store Name</th>
                                    <th>Vendor</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    stores.length > 0 ?
                                        stores.map((store, index) =>
                                            <tr key={store._id}>
                                                <td>{index + 1}</td>
                                                <td>{store.store_name}</td>
                                                <td>{store.vendor_name}</td>
                                                <td>{store.phone}</td>
                                                <td>{store.store_address}</td>
                                                <td>
                                                    <Link to={`/admin/update/store/${store._id} `} className="btn btn-primary adm-btn">Update</Link>
                                                    <button className="btn btn-danger adm-btn" onClick={() => handleDeleteStore(store._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        <tr>
                                            <td colSpan={6}><h2>No Stores Found...!</h2></td>
                                        </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AdminFooter />

        </>
    )
}

export default Administration
