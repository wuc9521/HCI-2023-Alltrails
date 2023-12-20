import dotenv from "dotenv";
import React, { useEffect, useMemo } from "react";
import { useMap } from "../../../context/MapContext";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";
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

                const url = `/path/${country}${state}${city}${name}.geojson`;

                console.log(url);
                // return fetch(url)
                //     .then((response) => response.json())
                //     .catch((error) => {
                //         console.error("Error loading GeoJSON:", error);
                //         return null; // Handle fetch error
                //     });
                return fetch(url).then((response) => response.json()).then((response) =>{
                    console.log(response);
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
    return (
        <LoadScript>
            <GoogleMap mapContainerStyle={{ height: "100vh", width: "100%" }} center={mapOptions.center} zoom={mapOptions.zoom}>
                {/* Render Markers or other components based on GeoJSON data */}
                {/* Example using Marker */}
                {/* <Marker position={{ lat: 0, lng: 0 }} /> */}

            </GoogleMap>
        </LoadScript>
    );
};

export default MapTrails;
