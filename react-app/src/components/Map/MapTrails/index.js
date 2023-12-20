import dotenv from "dotenv";
import React, { useEffect, useMemo } from "react";
import { useMap } from "../../../context/MapContext";
import { GoogleMap, LoadScript, useLoadScript, Marker } from "@react-google-maps/api";
import "./MapTrails.css";
dotenv.config();

const MapTrails = ({ trails }) => {
    const { currentZoom, setCurrentZoom, currentLat, setCurrentLat, currentLng, setCurrentLng } = useMap();
    const center = useMemo(() => ({ lat: currentLat, lng: currentLng }), [currentLat, currentLng]);
    const mapOptions = {
        zoom: currentZoom,
        center,
        mapTypeId: "terrain",
    };

    useEffect(() => {
        const fetchGeoJSON = async () => {
            const requests = trails.map((trail) => {
                const country = trail.country ? trail.country.toLowerCase() + '/' : '';
                const state = trail.state && trail.state !== "None" ? `${trail.state.toLowerCase()}/` : '';
                const city = trail.city !== "None" ? trail.city.toLowerCase() + '/' : '';
                const name = trail.name.replace(/[\s.-]/g, '_');
    
                const url = state !== '' ? `/path/${country}${state}${name}.geojson` : `/path/${country}${city}${name}.geojson`;
    
                console.log(url);
    
                return fetch(url)
                    .then((response) => response.json())
                    .catch((error) => {
                        console.error("Error loading GeoJSON:", error);
                        return null; // 返回 null 表示请求失败，但仍然会被包含在 Promise.all 的结果中
                    });
            });
    
            const geoJSONDataList = await Promise.all(requests);
            console.log(geoJSONDataList);
            return geoJSONDataList;
        };
        fetchGeoJSON();
    }, [trails]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    });
    if (!isLoaded) return (
        <h1>Loading...</h1>
    );
    // return (
    //     // <LoadScript>
    //     //     <GoogleMap mapContainerStyle={{ height: "100vh", width: "100%" }} center={mapOptions.center} zoom={mapOptions.zoom}>
    //     //         {/* Render Markers or other components based on GeoJSON data */}
    //     //         {/* Example using Marker */}
    //     //         {/* <Marker position={{ lat: 0, lng: 0 }} /> */}

    //     //     </GoogleMap>
    //     // </LoadScript>
    //     <div id="map">
    //         <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXhHCiGE-x7aQoiIEz7vMatZaG69litLg&callback=initMap"></script>
    //     </div>
    // );
    return (
        <div>
          {isLoaded ? (
            <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
              <GoogleMap mapContainerStyle={{ height: "400px", width: "100%" }} center={mapOptions.center} zoom={mapOptions.zoom}>
                {trails.map((trail, index) => (
                  <Marker key={index} position={{ lat: trail.lat, lng: trail.lng }} />
                ))}
              </GoogleMap>
            </LoadScript>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      );
};

export default MapTrails;