import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SignupFormPage from "./components/AuthPages/SignupFormPage";
import LoginFormPage from "./components/AuthPages/LoginFormPage";
import SplashPage from "./components/SplashPage";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import TrailDetails from "./components/Trails/TrailDetails";
import ListDetails from "./components/Lists/ListDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ExploreTrails from "./components/Explore/ExploreTrails";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage} />
          <Route path="/explore" component={ExploreTrails} />  {/* added by @wct */}
          <Route path="/trails/:trailId" component={TrailDetails} />
          <Route path="/profile/lists/:listId">
            <ProtectedRoute>
              <ListDetails />
            </ProtectedRoute>
          </Route>
          <Route path="/profile">
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Route>
          <Route path="/" component={SplashPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
