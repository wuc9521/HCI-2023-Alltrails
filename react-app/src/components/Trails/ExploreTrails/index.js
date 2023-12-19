import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrailsThunk } from "../../../store/trails";
import { useParams, useHistory } from "react-router-dom";
import TrailItem from "../../Trails/TrailItem";
import Map from "../../Map";
import "./ExploreTrails.css";

function ExploreTrails() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getTrailsThunk());
  }, [dispatch]);
  const allTrails = useSelector((state) => Object.values(state.trails));
  return (
    <div className="explore-details-container">
      <div className="explore-details-content">
        <div className="explore-details-content-left">
          <div className="list-details-bookmarks">
            <div className="list-details-bookmarks-header">
              <h2><center>Explore Trails</center></h2>
            </div>
            <div className="list-details-bookmarks-content">
              {allTrails.map((trail) => (
                <TrailItem key={trail.id} trail={trail} />
              ))}
            </div>
          </div>
        </div>
        <div className="list-details-content-right">
        {/* <Map bookmarks={allTrails} /> */}
        {/* 要是js也有多态就好了hhh */}
        </div>
      </div>
    </div>
  );
}

export default ExploreTrails;

