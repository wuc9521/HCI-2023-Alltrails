import React, { useState, useEffect } from "react";
import "./Banner.css";
import { useDispatch } from "react-redux";
import { searchTrailsThunk } from "../../../store/trails"; // Replace with the actual path

const Banner = ({onSearch}) => {
  const dispatch = useDispatch();
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // This is the state that will hold the results from the search
  const handleClick = async () => {
    try {
      const query = document.getElementById("search-input").value;
      if (query.trim() !== "") {
        const results = await dispatch(searchTrailsThunk(query));
        console.log(results);
        setSearchResults(results);
        setShowResults(true);
        onSearch({query, results});
      } else {
        setShowResults(false);
        console.log("Query is empty");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Adding a useEffect to log the updated state after it has been applied
  useEffect(() => {
    console.log("Updated searchResults:", searchResults);
  }, [searchResults]);


  return (
    <>
      <div className="centerpiece">
        <img className="splash-image" alt="hiker-hills" src="/images/backgrounds/splash-page.jpg" />
        <div className="centerpiece-content">
          <h1>Find your outdoors</h1>
          <span className="search-bar">
            <div id="search-button">
              <i className="fa-solid fa-magnifying-glass fa-xl" />
              <input id="search-input" type="search" name="trail-search" placeholder="Search by city, park, or trail name" />
              <div onClick={handleClick}>
                <i className="fa-solid fa-circle-arrow-right fa-2xl" />
              </div>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default Banner;
