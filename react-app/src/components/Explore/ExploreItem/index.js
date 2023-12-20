import { useHistory, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMap } from "../../../context/MapContext";
import "./ExploreItem.css";

function ExploreItem({ trail, nameOfClass}) {
  const { setCurrentZoom, setCurrentLat, setCurrentLng } = useMap();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathName = location.pathname;

  const user = useSelector((state) => state.session.user);

  const handleClick = (e, trail) => {
    e.preventDefault();
    history.push(`/trails/${trail.id}`);
    window.scrollTo(0, 0);
  };

  if (!trail.id || !trail.cover) return null;
  return (
    <>
      <div className={`trail-item ${nameOfClass}`} onClick={(e) => handleClick(e, trail)}>
        <div>
          <img className={`trail-image ${nameOfClass}`} alt="cover" src={trail.cover} />
        </div>
        <div className={`trail-text ${nameOfClass}`}>
          <div>
            <p id="trail-diff-review"><span>{trail.len}</span> • {trail.difficulty}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExploreItem;
