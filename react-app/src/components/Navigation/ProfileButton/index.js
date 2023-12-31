import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const goToProfile = (e) => {
    e.preventDefault()
    setShowMenu(false)
    history.push("/profile/feed")
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {user ? (
        <button className="profile-button" onClick={openMenu}>
          <div className="profile-pic-container navi">
            <img
              className="profile-pic navi"
              alt="profile-pic"
              src={user.profile_pic ? user.profile_pic : user.default_pic}
            />
          </div>
        </button>
      ) : (
        <button id="login-button">
          <Link to="/login">Log in</Link>
        </button>
      )}
      <div className={`${ulClassName} primary-color`} ref={ulRef}>
        {user && (
          <div className="dropdown-options">
            <div className="dropdown-username">Hello, {user.first_name}</div>
            <div className="dropdown-email">{user.email}</div>
            <hr className="item-divider" />
            <div className="dropdown-button" onClick={(e) => goToProfile(e)}>Profile</div>
            <div className="dropdown-button" onClick={handleLogout}>Log out</div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
