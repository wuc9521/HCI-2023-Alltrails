import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrailsThunk } from "../../../store/trails";
import { getReviewsThunk } from "../../../store/reviews";
import TrailItem from "../TrailItem";
import BookmarkList from "../../Bookmark";
import BookmarkTab from "../../Bookmark/BookmarkTab";
import ModalButton from "../../ModalButton";
import ReviewItem from "../../Reviews/ReviewItem";
import ReviewForm from "../../Reviews/ReviewForm";
import WeatherForecast from "../../Weather";
import "./TrailDetails.css";

const TrailDetails = () => {
  const { trailId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const getTrails = useSelector((state) => state.trails);
  const currentTrail = getTrails[`${trailId}`];
  const allTrails = Object.values(getTrails).filter(
    (trail) => trail.id !== currentTrail.id && trail.park === currentTrail.park
  );

  useEffect(() => {
    document.body.style.backgroundColor = "#efefec";
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  });

  useEffect(() => {
    dispatch(getReviewsThunk(trailId));
    dispatch(getTrailsThunk());
  }, [trailId, dispatch]);

  const getReviews = useSelector((state) => state.reviews);
  const reviews = Object.values(getReviews).reverse();

  if (!currentTrail) return null;
  return (
    <div className="trail-details-container">
      <div className="trail-details-card">
        <img alt="cover" className="cover-image" src={currentTrail.cover} />
        <div className="trail-details-summary">
          <h1 className="trail-details-name">{currentTrail.name}</h1>
          <div className="trail-details-sub-header">
            <p>
              {currentTrail.difficulty} • <i className="fa-solid fa-star fa-xs" />{" "}
              {Number(currentTrail.avg_rating).toFixed(1)}({currentTrail.num_reviews})
            </p>
            <p>{currentTrail.park}</p>
          </div>
        </div>
        {user && (
          <div className="bookmark-icon single">
            <BookmarkTab
              type="bookmark"
              trailId={currentTrail.id}
              modalComponent={<BookmarkList trail={currentTrail} />}
            />
          </div>
        )}
      </div>
      <div className="trail-details-info-container">
        <div className="trail-details-info">
          <table className="trail-details-table">
            <tbody>
              <tr>
                <th id="length-th">Length</th>
                <th id="elevation-th">Elevation gain</th>
                <th id="route-type-th">Route type</th>
              </tr>
              <tr>
                <td id="length-td">{currentTrail.len}</td>
                <td id="elevation-td">{currentTrail.elevation}</td>
                <td id="route-type-td">{currentTrail.route_type}</td>
              </tr>
            </tbody>
          </table>
          <div className="trail-details-desc">"<i>{currentTrail.description}"</i></div>
          <hr className="item-divider" />
          <div className="trail-details-weather"><WeatherForecast lat={currentTrail.lat} lng={currentTrail.lng} /></div>
          <hr className="item-divider" />
        </div>
        <div className="trail-details-sidebar">
          <h2 id="sidebar-header"><center>Nearby Trails</center></h2>
          <div className="trail-item-container">
          {(() => {
            let topTen = [];
            for (let i = 0; i < Math.min(10, allTrails.length); i++) {
              const trail = allTrails[i];
              topTen.push(<TrailItem key={i} trail={trail} nameOfClass="splash" />);
            }
            return topTen;
          })()}
        </div>
        </div>
      </div>
    </div>
  );
};

export default TrailDetails;
