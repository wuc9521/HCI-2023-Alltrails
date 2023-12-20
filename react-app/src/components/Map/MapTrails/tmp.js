import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Data } from '@react-google-maps/api';

const MapComponent = ({ geoJSONDataList }) => {
  const [map, setMap] = useState(null);

  const mapOptions = {
    zoom: 2,
    center: { lat: 0, lng: 0 },
  };

  const onLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    if (map && geoJSONDataList) {
      // 遍历所有的 GeoJSON 数据，将其添加到 Data 组件中
      geoJSONDataList.forEach((geoJSONData) => {
        map.data.addGeoJson(geoJSONData);
      });
    }
  }, [map, geoJSONDataList]);

  return (
    <GoogleMap
      mapContainerStyle={{ height: '400px', width: '100%' }}
      center={mapOptions.center}
      zoom={mapOptions.zoom}
      onLoad={onLoad}
    >
      <LoadScript />
      <Data options={{ controlPosition: 2, controls: true }} />
    </GoogleMap>
  );
};

const DataFetchingComponent = () => {
  const [geoJSONDataList, setGeoJSONDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jsonFileUrls = ['/public/path/file1.json', '/public/path/file2.json', '/public/path/file3.json'];

      const tempDataArray = [];

      for (const url of jsonFileUrls) {
        try {
          const response = await fetch(url);
          const jsonData = await response.json();
          tempDataArray.push(jsonData);
        } catch (error) {
          console.error('Error loading JSON file:', url, error);
        }
      }

      setGeoJSONDataList(tempDataArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data Summary</h1>
      <MapComponent geoJSONDataList={geoJSONDataList} />
    </div>
  );
};

export default DataFetchingComponent;
