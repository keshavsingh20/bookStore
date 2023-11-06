import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Myorders = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    myorders();
  }, []);

  const myorders = async () => {
    const data = await fetch(
      `/api/order/orders/${userId}`
    );
    const orders = await data.json();
    setOrders(orders);
  };

  return (
    <div>
      <Header />

      <div
        className="main-content"
        style={{
          backgroundColor: "#cecece",
          paddingTop: "20px",
          paddingBottom: "40px",
        }}
      >
        <h1>My Orders</h1>

        <div
          className="table-container"
          style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}
        >
          <table className="table tbl-full table-striped">
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
                <th>Payment</th>
                <th>Payment Id</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => {
                  // <OrderDetails order={order} index={index}/>
                  let orderDate = new Date(order.order_date).toLocaleDateString(
                    "en-US",
                    { timeZone: "Asia/Kolkata" }
                  );
                  let orderTime = new Date(order.order_date).toLocaleTimeString(
                    "en-US",
                    { timeZone: "Asia/Kolkata", hour12: false }
                  );
                  let updationDate = new Date(
                    order.completion_date
                  ).toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" });
                  let updationTime = new Date(
                    order.completion_date
                  ).toLocaleTimeString("en-US", {
                    timeZone: "Asia/Kolkata",
                    hour12: false,
                  });

                  return (
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
                      </td>
                      <td>{order.customer.name}</td>
                      <td>{order.customer.email}</td>
                      <td>{order.customer.phone}</td>
                      <td>
                        {order.customer.address +
                          "," +
                          order.customer.state +
                          "," +
                          order.customer.country +
                          "," +
                          order.customer.pin}
                      </td>
                      <td>{order.payment.status}</td>
                      <td>{order.payment.id}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={18}>
                    <h2>No Products Found..!</h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Myorders;
