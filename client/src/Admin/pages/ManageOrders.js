import React, { useState, useEffect } from 'react'
import '../styles/ManageOrders.css'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'
// import OrderDetails from '../components/OrderDetails'

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getAllOrders();
  }, [])

  const getAllOrders = async () => {
    const data = await fetch("/api/order/all");
    setOrders(await data.json());
  }

  // console.log(orders)

  const handleActionUpdate = async (id) => {
    const data = await fetch(`/api/order/update/${id}`, {
      method: "PUT",
      body: JSON.stringify({status}),
      headers:{
        'Content-Type':'application/json'
      }
    })

    const orderUpdatedData = await data.json();
    // console.log(orderUpdatedData);
    getAllOrders();
  }



  return (
    <>
      <AdminHeader />

      <div className='admin-home-container'>
        <div className="main-content">
          <h1>Manage Orders</h1>

          <div className='table-container' style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
            <table className="table tbl-full table-striped" >
              <thead>
                <tr className="tbl-heading">
                  <th>S.N.</th>
                  <th>Book</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Order On</th>
                  <th>Updated On</th>
                  <th>Status</th>
                  <th>CName</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  {/* <th>State</th>
                  <th>Country</th>
                  <th>Pin Code</th> */}
                  <th>Payment</th>
                  <th>Payment Id</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {
                  orders.length > 0 ?
                    orders.map((order, index) =>{
                      // <OrderDetails order={order} index={index}/>
                      let orderDate = new Date(order.order_date).toLocaleDateString("en-US", { timeZone: "Asia/Kolkata",})
                      let orderTime = new Date(order.order_date).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: false })
                      let updationDate = new Date(order.completion_date).toLocaleDateString("en-US", { timeZone: "Asia/Kolkata",})
                      let updationTime = new Date(order.completion_date).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: false })
                  
                      return(
                        <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order.book}</td>
                        <td>{order.category}</td>
                        <td>₹{order.price}</td>
                        <td>{order.quantity}</td>
                        <td>₹{order.quantity * order.price}</td>
                        <td>{orderDate + " " + orderTime}</td>
                        <td>{updationDate + " " + updationTime}</td>
                        <td>
                          <p className={order.status}>{order.status}</p>
                          {/* <select name="order-status" id="order-status">
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button className='btn adm-btn btn-primary'>Update</button> */}
                        </td>
                        <td>{order.customer.name}</td>
                        <td>{order.customer.email}</td>
                        <td>{order.customer.phone}</td>
                        {/* <td>{order.customer.address}</td>
                        <td>{order.customer.state}</td>
                        <td>{order.customer.country}</td>
                        <td>{order.customer.pin}</td> */}
                         <td>{order.customer.address +"," + order.customer.state + ","+ order.customer.country + "," + order.customer.pin}</td>
                        <td>{order.payment.status}</td>
                        <td>{order.payment.id}</td>
                        <td>
                          {/* <a href="#" className="btn btn-success adm-btn">Accept</a>
                          <a href="#" className="btn btn-danger adm-btn">Cancel</a> */}
                           <select name="order-status" id="order-status" onChange={(e) => setStatus(e.target.value)}>
                            <option value={order.status} selected disabled hidden>{order.status}</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancel</option>
                          </select>
                          <button className='btn adm-btn btn-primary' onClick={()=>handleActionUpdate(order._id)}>Update</button>
                        </td>
                      </tr>
                    )}
                    )

                    :
                    <tr>
                      <td colSpan={18}><h2>No Products Found..!</h2></td>
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

export default ManageOrders
