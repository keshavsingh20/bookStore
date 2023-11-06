import React, { useState, useEffect } from "react";
// import '../styles/Categories.scss'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExploreBooks from "../components/ExploreBooks";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    let result = await fetch("/api/category/details");

    result = await result.json();
    setCategories(result);
  };

  return (
    <>
      <Header />
      <div>
        <div className="search">
          <div className="search-field">
            {/* <input type="text" placeholder="Search Categories here...!" value={'All availble categories are here.'} readOnly/> */}
            <h1 style={{ color: "white", background: "rgb(0, 0,0, 0.6)" }}>
              Available Categories
            </h1>
            {/* <button className="search-btn">Search</button> */}
          </div>
        </div>

        <div className="explore">
          <ExploreBooks categories={categories} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Categories;
