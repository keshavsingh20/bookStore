import React, { useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateStore = () => {
    const [store_name, setStoreName] = useState("");
    const [vendor_name, setVendorName] = useState("");
    const [phone, setPhone] = useState("");
    const [store_address, setStoreAddress] = useState("")
    const navigate = useNavigate()
    const params = useParams();

    useEffect(() => {
        getStoreDetails();
    }, [])
    const getStoreDetails = async () => {
        let store = await fetch(`/api/store/details/${params.id}`)
        store = await store.json();
        setStoreName(store.store_name)
        setVendorName(store.vendor_name)
        setPhone(store.phone)
        setStoreAddress(store.store_address)
    }


    const handleStoreUpdate = async () => {
        let storeData = await fetch(`/api/store/update/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ store_name, vendor_name, phone, store_address }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        storeData = await storeData.json()
        if (storeData) {
            navigate('/admin/manage/admin')
        }
    }

    return (
        <>
            <AdminHeader />

            <div className='admin-home-container'>
                <div className="main-content">
                    <div className="wrapper">
                        <h1 style={{ textAlign: 'start' }}>Update Store</h1>
                        <br /><br />

                        <div className='add-category'>
                            <div>
                                <label htmlFor="store">Store Name: </label>
                                <input type="text" name="store" id="store" value={store_name} onChange={(e) => setStoreName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="vendor">Vendor Name: </label>
                                <input type="text" name="vendor" id="vendor" value={vendor_name} onChange={(e) => setVendorName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone No: </label>
                                <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="address">Address: </label>
                                <textarea rows={3} cols={25} name='address' id='address' value={store_address} onChange={(e) => setStoreAddress(e.target.value)} ></textarea>
                            </div>
                            <button type='Submit' className='btn btn-primary' onClick={handleStoreUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <AdminFooter />
        </>
    )
}

export default UpdateStore
