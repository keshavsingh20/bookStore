import React from 'react'

const OrderDetails = ({order, index}) => {
    return (
        <tr key={order._id}>
            <td>{index+1}</td>
            <td>{order.book}</td>
            <td>{order.category}</td>
            <td>₹{order.price}</td>
            <td>{order.quantity}</td>
            <td>₹{order.quantity * order.price}</td>
            <td>{order.order_date}</td>
            <td>07/09/2023</td>
            <td>
                <select name="order-status" id="order-status">
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button className='btn adm-btn btn-primary'>Update</button>
            </td>
            <td>{order.customer.name}</td>
            <td>{order.customer.email}</td>
            <td>{order.customer.phone}</td>
            <td>{order.customer.address}</td>
            <td>{order.customer.state}</td>
            <td>{order.customer.country}</td>
            <td>{order.customer.pin}</td>
            <td>{order.payment.status}</td>
            <td>{order.payment.id}</td>
            <td>
                <a href="#" className="btn btn-success adm-btn">Accept</a>
                <a href="#" className="btn btn-danger adm-btn">Cancel</a>
            </td>
        </tr>
    )
}

export default OrderDetails
