import React, { useEffect, useState } from 'react'
import '../styles/Admin_home.css'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/AdminFooter'

function AdminHome() {
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(()=> {
    getCategories();
    getBooks();
    getAllOrders();
  })

  const getCategories = async () => {
    let result = await fetch("/api/category/details");
    result = await result.json();
    setCategoryCount(result.length);
}
const getBooks = async () => {
  let result = await fetch("/api/book/books/details");
  result = await result.json();
  setBookCount(result.length);
}
const getAllOrders = async ()=> {
  const data = await fetch("/api/order/all");
  const orders = await data.json();
  setOrderCount(orders.length);

  // console.log(orders) 
 
  // const successPayments = getSuccessPayments(orders);
  // console.log(successPayments);
  // console.log(getRevenue(orders))
  setRevenue(getRevenue(orders));
} 

// function getSuccessPayments(orders) {
//   if (Array.isArray(orders)) {
//     return orders.filter((order) => {
//       return order.payment && order.payment.status === "Success";
//     });
//   }
//   return [];
// }

function getRevenue(orders) {
  if (Array.isArray(orders)) {
    return orders.reduce((totalAmount, order) => {
      if (order.payment && order.payment.status === "Success") {
        return totalAmount + order.payment.total;
      }
      return totalAmount;
    }, 0);
  }
  return 0;
}



  return (
    <>
      <AdminHeader />

      <div className='admin-home-container'>
        <div className="main-content">
        <h1>Dashboard</h1>
          <div className="wrapper">

            <div className="col-4 text-center">
              <h1>{categoryCount}</h1>
              <br />
              Categories Available
            </div>

            <div className="col-4 text-center">
              <h1>{bookCount}</h1>
              <br />
              Books Available
            </div>

            <div className="col-4 text-center">
              <h1>{orderCount}</h1>
              <br />
              Total Orders
            </div>

            <div className="col-4 text-center">
              <h1>₹ {revenue}</h1>
              <br />
              Revenue Generated
            </div>
          </div>

        </div>
      </div>

      <AdminFooter />

    </>
  )
}

export default AdminHome
