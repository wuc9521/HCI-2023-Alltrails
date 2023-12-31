import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherThunk } from "../../store/weather";
import "./Weather.css";

const WeatherForecast = ({ lat, lng }) => {
  const dispatch = useDispatch();
  const getWeather = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(getWeatherThunk(lat, lng));
  }, [dispatch, lat, lng]);

  if (!getWeather.current) return null;

  const formatForecast = () => {
    const forecast = [];
    for (let i = 0; i < 5; i++) {
      forecast.push(getWeather.daily[i]);
    }
    return forecast;
  };

  const formattedForecast = formatForecast();
  const formattedDay = (timestamp) => {
    // sets day of the week
    const day = new Date(timestamp * 1000).toLocaleString("en-US", {
      weekday: "long",
    });
    return day;
  };

  return (
    <div className="forecast-container">
      {formattedForecast.map((day, i) => (
        <div key={i} className="forecast-item">
          <p className="forecast-day"><center>{formattedDay(day.dt)}</center></p>
          <br />
          <div style={{height: "100%", minHeight: "80px"}}>
          <img alt={day.dt} style={{}} src={`\\images\\weather-icons\\logos-v1\\${day.weather[0].icon}.png`} />
          </div>
          <p className="forecast-desc">
            <center>{day.weather[0].description}</center>
            </p>
          <p className="forecast-temp">
            <center>
              {Math.round((day.temp.min - 32) * 5 / 9)}°C / {Math.round((day.temp.max - 32) * 5 / 9)}°C
            </center>
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
