import dotenv from "dotenv";
import React, { useEffect, useMemo, useState } from "react";
import { useMap } from "../../../context/MapContext";
import { GoogleMap, useJsApiLoader, Data } from "@react-google-maps/api";
dotenv.config();

const MapComponent = ({ JSONDataList }) => {
    const [map, setMap] = useState(null);
    const { currentZoom, setCurrentZoom, currentLat, setCurrentLat, currentLng, setCurrentLng } = useMap();
    const center = useMemo(() => ({ lat: currentLat, lng: currentLng }), [currentLat, currentLng]);
    const mapOptions = {
        zoom: currentZoom,
        center,
        mapTypeId: "terrain",
    };

    const onLoad = (map) => {
        setMap(map);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLat(position.coords.latitude);
            setCurrentLng(position.coords.longitude);
            setCurrentZoom(18);
        });
        if (map && JSONDataList) {
            // 遍历所有的 GeoJSON 数据，将其添加到 Data 组件中
            JSONDataList.forEach((geoJSONData) => {
                map.data.setStyle((feature) => {
                    let color = "lightblue";

                    if (feature.getProperty("isColorful")) {
                        color = feature.getProperty("color");
                    }
                    return /** @type {!google.maps.Data.StyleOptions} */ {
                        fillColor: color,
                        strokeColor: color,
                        strokeWeight: 2,
                    };
                });
                // When the user clicks, set 'isColorful', changing the color of the letters.
                map.data.addListener("click", (event) => {
                    event.feature.setProperty("isColorful", true);
                });

                // When the user hovers, tempt them to click by outlining the letters.
                // Call revertStyle() to remove all overrides. This will use the style rules
                // defined in the function passed to setStyle()
                map.data.addListener("mouseover", (event) => {
                    map.data.revertStyle();
                    map.data.overrideStyle(event.feature, { strokeWeight: 8 });
                });

                map.data.addListener("mouseout", (event) => {
                    map.data.revertStyle();
                });

                map.data.addGeoJson(geoJSONData);
            });
        }
    }, [map, JSONDataList]);

    return (
        <GoogleMap
            mapContainerStyle={{
                height: '100vh',
                width: '100%',
            }}
            center={mapOptions.center}
            zoom={mapOptions.zoom}
            onLoad={onLoad} >
            <Data options={{ controlPosition: 2, controls: true }} />
        </GoogleMap>
    );
};

const MapTrails = ({ trails }) => {
    const [JSONDataList, setJSONDataList] = useState([]);

    useEffect(() => {
        const fetchGeoJSON = async () => {
            const requests = trails.map((trail) => {
                const country = trail.country ? trail.country.toLowerCase() + '/' : '';
                const state = trail.state && trail.state !== "None" ? `${trail.state.toLowerCase()}/` : '';
                const city = trail.city !== "None" ? trail.city.toLowerCase() + '/' : '';
                const name = trail.name.replace(/[\s.-]/g, '_');
                const url = state !== '' ? `/path/${country}${state}${name}.geojson` : `/path/${country}${city}${name}.geojson`;
                return fetch(url)
                    .then((response) => response.json())
                    .catch((error) => {
                        console.error("Error loading GeoJSON:", error);
                        return null; // 返回 null 表示请求失败，但仍然会被包含在 Promise.all 的结果中
                    });
            });
            const geoJSONDataList = await Promise.all(requests);
            setJSONDataList(geoJSONDataList);
        };
        fetchGeoJSON();
    }, [trails]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries: ['geometry', 'drawing'],
    });

    if (!isLoaded) return (
        <h1>Loading...</h1>
    );
    return (
        <div>
            <MapComponent JSONDataList={JSONDataList} />
        </div>
    );
};

export default MapTrails;