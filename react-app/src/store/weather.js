import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.REACT_APP_WEATHER_BASE_URL;
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const GET_WEATHER = "weather/GET_WEATHER";
export const getWeather = (weather) => ({
  type: GET_WEATHER,
  weather,
});

export const getWeatherThunk = (lat, lng) => async (dispatch) => {
  //如果lat, lng不是14位小数
  // lat = lat.toFixed(14);
  // lng = lng.toFixed(14);
  //@wct: sb ycy 曾经把经纬度搞反了
  const res = await fetch(
    `${baseUrl}/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`
  );
  if (res.ok) {
    const data = await res.json();
    dispatch(getWeather(data));
    return data;
  }
};

const weatherReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_WEATHER:
      newState = {};
      newState = { ...action.weather };
      return newState;
    default:
      return state;
  }
};

export default weatherReducer;
