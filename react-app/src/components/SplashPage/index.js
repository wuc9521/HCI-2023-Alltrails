import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrailsThunk } from "../../store/trails";
import Banner from "./Banner/Banner";
import TrailItem from "../Trails/TrailItem";
import "./SplashPage.css";

function SplashPage() {
  const dispatch = useDispatch();
  const getTrails = useSelector((state) => state.trails);
  const trails = Object.values(getTrails);
  const topTrails = trails.sort((a, b) => b.avg_rating - a.avg_rating);
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    dispatch(getTrailsThunk());
  }, [dispatch]);

  if (!topTrails.length) return null;

  const handleSlider = (direction) => {
    const trailContainer = document.querySelector(".trail-item-container");
    if (direction === "back") {
      trailContainer.scrollLeft -= 1095;
    } else {
      trailContainer.scrollLeft += 1095;
    }
  };

  const handleSearchData = (data) => {
    setSearchData(data.results);
    setQuery(data.query);
  };


  return (
    <>
      <Banner onSearch={handleSearchData} />
      <div className="content-container">
        <div className="content-trails">
          <div className="local-favorites">
            {
              searchData.length > 0 ?
                <span>Search Results about <u>#{query}</u></span> :
                <span>Top Trails</span>
            }
          </div><br />
          <button className="prev-button" onClick={() => handleSlider("back")}>
            <i className="fa-solid fa-chevron-left fa-2xl" />
          </button>
          <button className="next-button" onClick={() => handleSlider("forward")}>
            <i className="fa-solid fa-chevron-right fa-2xl" />
          </button>
          <div className="trail-item-container">
            {searchData.length > 0 ? (
              searchData.map((trail, index) => (
                <TrailItem key={index} trail={trail} nameOfClass="splash" />
              ))
            ) : (
              topTrails.slice(0, 10).map((trail, index) => (
                <TrailItem key={index} trail={trail} nameOfClass="splash" />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SplashPage;
