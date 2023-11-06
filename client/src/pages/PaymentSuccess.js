import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  // console.log(searchQuery)

  const referenceNumber = searchQuery.get("reference");

  return (
    <div>
      <Header />

      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          height: "70vh",
          justifyContent: "center",
          background: "#ececec",
        }}
      >
        <h1>Order Successful.</h1>
        <p>Refrence Number : {referenceNumber}</p>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
