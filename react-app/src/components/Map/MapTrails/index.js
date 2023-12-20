import dotenv from "dotenv";
import React, { useEffect } from "react";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";
import "./MapTrails.css";
dotenv.config();

const MapTrails = ({trails}) => {
    var GEOJSON_BASE_URL = "/path";

    useEffect(() => {
        // Load GeoJSON data
        console.log("=============================")
        console.log(trails)
        console.log("=============================")
        var returnList = [];
        for (var i = 0; i < trails.length; i++) {
            var url = GEOJSON_BASE_URL + "/" + trails[i].country + "/" + trails[i].state ? trails[i].state : "" + "/" + trails[i].city + "/" + trails[i].name + ".js";
            console.log(url)
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    // Handle GeoJSON data
                    console.log("GeoJSON data:", data);
                    returnList.push(data);
                })
                .catch((error) => console.error("Error loading GeoJSON:", error));
        }
        console.log(returnList)
    }, []);

    const mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 2,
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    });
    if (!isLoaded) return <h1>Loading...</h1>;
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
