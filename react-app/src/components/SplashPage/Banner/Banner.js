// import { Link } from "react-router-dom";
import "./Banner.css";
import { useDispatch } from "react-redux";
import { searchTrailsThunk } from "../../../store/trails"; // 替换为实际的路径

const Banner = () => {
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    const searchInput = e.target;
    // 获取输入框的值，假设你的输入框有一个 id 为 "search-input"
    const query = document.getElementById("search-input").value;
    const result = await dispatch(searchTrailsThunk(query)); // 调用 Redux thunk 函数
    console.log(result);// 处理返回的结果，如果需要的话
  };

  return (
    <>
      <div className="centerpiece">
        <img className="splash-image" alt="hiker-hills" src="/images/backgrounds/splash-page.jpg" />
        <div className="centerpiece-content">
          <h1>Find your outdoors</h1>
          <span className="search-bar">
            <div id="search-button">
              <i className="fa-solid fa-magnifying-glass fa-xl" />
              <input id="search-input" type="search" name="trail-search" placeholder="Search by city, park, or trail name"/>
              <div onClick={(e) => handleClick(e)}>
                <i className="fa-solid fa-circle-arrow-right fa-2xl" />
              </div>
            </div>
          </span>
          <p id="explorer-tag">
            {/* <Link>Explore nearby trails</Link> */}
            </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
