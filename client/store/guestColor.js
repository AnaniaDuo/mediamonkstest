import axios from "axios";
const TOKEN = "token";

//ACTION TYPE
const GUEST_COLOR = "GUEST_COLOR";

//ACTION CREATORS
const setGuestColor = (color) => ({
  type: GUEST_COLOR,
  color,
});

//THUNK CREATOR
export const getGuestColor = () => async (dispatch) => {
  const { data } = await axios.get("/auth/guestme");
  return dispatch(setGuestColor(data));
};

//REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case GUEST_COLOR:
      return action.color;
    default:
      return state;
  }
}
