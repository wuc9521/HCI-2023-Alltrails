import dotenv from "dotenv";
import { useEffect, useMemo } from "react";
import { useMap } from "../../context/MapContext";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Map.css";
dotenv.config();

const Map = ({ bookmarks, trails }) => {
  const { currentZoom, setCurrentZoom, currentLat, setCurrentLat, currentLng, setCurrentLng } = useMap();
  const center = useMemo(() => ({ lat: currentLat, lng: currentLng }), [currentLat, currentLng]);
  const mapOptions = {
    zoom: currentZoom,
    center,
    mapTypeId: "terrain",
  };

  useEffect(() => {
    if(!bookmarks){
      console.log("bookmarks is null")
      console.log(trails)
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLat(position.coords.latitude);
      setCurrentLng(position.coords.longitude);
      setCurrentZoom(18);
    });
  }, []);


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <>
      <GoogleMap options={mapOptions} mapContainerClassName="map-container">
        {
          bookmarks ? ( bookmarks.map((bookmark) => (
            <Marker position={{ lat: bookmark.trail.lat, lng: bookmark.trail.lng }} />
            ))
          ) : ( trails.map((trail) => (
            <Marker position={{ lat: trail.lat, lng: trail.lng }} />
            ))
          )
        }
      </GoogleMap>
    </>
  );
};

export default Map;