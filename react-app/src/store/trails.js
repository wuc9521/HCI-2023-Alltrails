////////////// Action Creators ///////////////
export const GET_TRAILS = "trails/GET_TRAILS";
export const GET_SINGLE_TRAIL = "trails/GET_SINGLE_TRAIL";
export const UPDATE_TRAIL = "trails/UPDATE_TRAIL";
export const SEARCH_TRAILS = "trails/SEARCH_TRAILS";

///////////// Action Creators ///////////////

// get all trails
export const getTrails = (trails) => ({
  type: GET_TRAILS,
  trails,
});
// get single trail
export const getSingleTrail = (trail) => ({
  type: GET_SINGLE_TRAIL,
  trail,
});

// update single trail
export const updateTrail = (trail) => ({
  type: UPDATE_TRAIL,
  trail,
});

// search trails
export const searchTrails = (trails) => ({
  type: SEARCH_TRAILS,
  trails,
});

/////////////////// Thunks ///////////////////

// get all trails
export const getTrailsThunk = () => async (dispatch) => {
  const res = await fetch("/api/trails");
  if (res.ok) {
    const data = await res.json();
    await dispatch(getTrails(data));
    return data;
  }
};

// get trail details of single trail
export const getSingleTrailThunk = (trailId) => async (dispatch) => {
  const res = await fetch(`/api/trails/${trailId}`); //@wct: 这里原本只有20条数据.
  if (res.ok) {
    const data = await res.json();
    await dispatch(getSingleTrail(data));
    return data;
  }
};

export const updateTrailThunk = (trailId) => async (dispatch) => {
  const res = await fetch(`/api/trails/${trailId}`);
  if (res.ok) {
    const data = await res.json();
    await dispatch(updateTrail(data));
    return data;
  }
};

export const searchTrailsThunk = (data) => async (dispatch) => {
  const response = await fetch("/api/trails/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  if (!response.ok) {
    throw new Error('Search request failed');
  }
  const result = await response.json();
  await dispatch(searchTrails(result));
  return result;
};

const trailsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_TRAILS:
      newState = {};
      action.trails.forEach((trail) => {
        newState[trail.id] = trail;
      });
      return newState;
    case GET_SINGLE_TRAIL:
      newState = {};
      newState = { ...action.trail };
      return newState;
    case UPDATE_TRAIL: {
      newState = {};
      newState = {
        ...state,
        [action.trail.id]: action.trail,
      };
      return newState
    }
    default:
      return state;
  }
};

export default trailsReducer;
