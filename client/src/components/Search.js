import React, {useState} from "react";
import "../styles/Search.css";
// import SearchBg from "../assets/images/bg.jpg";

const Search = ({handleSearch, setSearchKey})=> {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchKey(value); 
  };

  const handleSubmit = () => {
    handleSearch(inputValue); 
  };

  // const handleSearchFunction = (event) => {
  //   const value = event.target.value;
  //   setInputValue(value);
  //   setSearchKey(value); 
  //   handleSearch(inputValue); 
  // };



  return (
    <>
      <div className="search">
        {/* <img src={SearchBg} alt="" /> */}
        <div className="search-field">
        <input type="text" placeholder="Search Books here...!" value={inputValue} onChange={handleInputChange}/>
          {/* <input type="text" placeholder="Search Books here...!" value={inputValue} onChange={handleSearchFunction}/> */}
          <button className="search-btn" onClick={handleSubmit}>Search</button>
        </div>
      </div>
    </>
  );
}

export default Search;
