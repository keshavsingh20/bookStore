import React from "react";
import "../styles/ExploreBooks.css";
import { Link } from "react-router-dom";

const ExploreBooks = ({ categories }) => {
  return (
    <>
      <h1>Explore Books</h1>
      <div className="exploreContainer">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Link
              to={`/category/books`}
              state={category.title}
              className="explore-card"
              key={index}
            >
              <img src={category.image} alt="" />
              <p>{category.title}</p>
            </Link>
          ))
        ) : (
          <div className="explore-card">
            <h2>No Categories Found...!</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default ExploreBooks;
