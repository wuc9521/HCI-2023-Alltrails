import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListThunk, editListThunk } from "../../../store/lists";
import { useParams, useHistory } from "react-router-dom";
import TrailItem from "../../Trails/TrailItem";
import Map from "../../Map";
import "./ExploreTrails.css";

function ExploreTrails() {
  const { listId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const list = useSelector((state) => state.lists);

  const handleClick = (e) => {
    history.push("/")
  }

  useEffect(() => {
    dispatch(getSingleListThunk(listId));
  }, [dispatch, listId]);

  if (!list.id) return null;
  const bookmarks = list.bookmarks;

  return (
    <div className="list-details-container">
      <div className="list-details-content">
        <div className="explore-details-content-left">
          <div className="list-details-bookmarks">
            {bookmarks.length ? bookmarks.map(
              (bookmark, i) => (
              <TrailItem key={i} trail={bookmark.trail} nameOfClass="bookmark" bookmarkId={bookmark.id} listId={listId} />
              )
            )
              : <div className="no-bookmarks">
                <p className="secondary-color" style={{ fontWeight: "500" }}>Tap the bookmark icon on any trail to turn this into your adventure wishlist</p>
                <button
                  className="green-button"
                  id="explorer-trails-button"
                  onClick={(e) => handleClick(e)}
                >Explorer Trails</button>
              </div>}
          </div>
        </div>
        <div className="list-details-content-right">
          <Map bookmarks={bookmarks} />
        </div>
      </div>
    </div>
  );
}

export default ExploreTrails;

