import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrailsThunk } from "../../../store/trails";
import { useParams, useHistory } from "react-router-dom";
import ExploreItem from "../ExploreItem";
import MapTrails from "../../Map/MapTrails";
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
            <div>
              <h2><center>Explore Trails</center></h2>
            </div>
            <div>
              <center>
              {allTrails.map((trail) => (
                <ExploreItem key={trail.id} trail={trail} />
              ))}
              </center>
            </div>
          </div>
        </div>
        <div className="list-details-content-right">
        {
          <MapTrails trails={allTrails} />
        }
        </div>
      </div>
    </div>
  );
}

export default ExploreTrails;

