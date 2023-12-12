// import dotenv from "dotenv";
// import { useEffect, useMemo } from "react";
// import { useMap } from "../../context/MapContext";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import "./Map.css";
// dotenv.config();

// const Map = ({ bookmarks }) => {
//   const { currentZoom, setCurrentZoom, currentLat, setCurrentLat, currentLng, setCurrentLng } =
//     useMap();
//   const center = useMemo(() => ({ lat: currentLat, lng: currentLng }), [currentLat, currentLng]);
//   const mapOptions = {
//     zoom: currentZoom,
//     center,
//     mapTypeId: "terrain",
//   };

//   useEffect(() => {
//     setCurrentZoom(8);
//     // setCurrentLat(40.112206); //@wct: 这里的经度和纬度是写死的.
//     // setCurrentLng(-120.90653);
//     navigator.geolocation.getCurrentPosition((position) => {
//       setCurrentLat(position.coords.latitude);
//       setCurrentLng(position.coords.longitude);
//     });
//   }, []);

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
//   });
//   if (!isLoaded) return <h1>Loading...</h1>;
//   else console.log("Map loaded");
//   return (
//     <>
//       <GoogleMap options={mapOptions} mapContainerClassName="map-container">
//         {bookmarks.map((bookmark) => (
//           <Marker position={{ lat: bookmark.trail.lat, lng: bookmark.trail.lng }} />
//         ))}
//       </GoogleMap>
//     </>
//   );
// };

// export default Map;

import dotenv from "dotenv";
import { useEffect, useMemo, useState } from "react";
import { useMap } from "../../context/MapContext";
import { GoogleMap, useLoadScript, Marker, Polyline } from "@react-google-maps/api";
import "./Map.css";
dotenv.config();

const Map = ({ bookmarks }) => {
  const { currentZoom, setCurrentZoom, currentLat, setCurrentLat, currentLng, setCurrentLng } =
    useMap();
  const center = useMemo(() => ({ lat: currentLat, lng: currentLng }), [currentLat, currentLng]);
  const mapOptions = {
    zoom: currentZoom,
    center,
    mapTypeId: "terrain",
  };

  const [polylinePath, setPolylinePath] = useState([]);

  useEffect(() => {
    setCurrentZoom(8);
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLat(position.coords.latitude);
      setCurrentLng(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (bookmarks.length > 1) {
      const waypoints = bookmarks.map((bookmark) => ({
        lat: bookmark.trail.lat,
        lng: bookmark.trail.lng,
      }));

      const directionsService = new window.google.maps.DirectionsService();

      const origin = waypoints[0];
      const destination = waypoints[waypoints.length - 1];
      const intermediateWaypoints = waypoints.slice(1, -1);

      const request = {
        origin,
        destination,
        waypoints: intermediateWaypoints.map((waypoint) => ({
          location: waypoint,
          stopover: true,
        })),
        travelMode: window.google.maps.TravelMode.WALKING, // Change as needed
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const path = result.routes[0].overview_path.map((point) => ({
            lat: point.lat(),
            lng: point.lng(),
          }));
          setPolylinePath(path);
        }
      });
    }
  }, [bookmarks]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <>
      <GoogleMap options={mapOptions} mapContainerClassName="map-container">
        {polylinePath.length > 0 && (
          <Polyline path={polylinePath} options={{ strokeColor: "#FF0000" }} />
        )}
        {bookmarks.map((bookmark, index) => (
          <Marker
            key={index}
            position={{ lat: bookmark.trail.lat, lng: bookmark.trail.lng }}
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default Map;
