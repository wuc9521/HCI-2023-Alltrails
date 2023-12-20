import dotenv from "dotenv";
import React, { useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
dotenv.config();

const Map = (trails) => {
  var GEOJSON_URL = "./map.geojson";

  useEffect(() => {
    // Load GeoJSON data
    fetch(GEOJSON_URL)
      .then((response) => response.json())
      .then((data) => {
        // Handle GeoJSON data
        console.log("GeoJSON data:", data);
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  const mapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={{ height: "100vh", width: "100%" }} center={mapOptions.center} zoom={mapOptions.zoom}>
        {/* Render Markers or other components based on GeoJSON data */}
        {/* Example using Marker */}
        {/* <Marker position={{ lat: 0, lng: 0 }} /> */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
