import axios from "axios";
const TOKEN = "token";

//ACTION TYPE
const GUEST_REPORT = "GUEST_REPORT";

//ACTION CREATORS
const setGuestReport = (report) => ({
  type: GUEST_REPORT,
  report,
});

//THUNK CREATOR
export const getGuestReport = () => async (dispatch) => {
  const { data } = await axios.get("/api/report/guestUserReport");
  return dispatch(setGuestReport(data));
};

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case GUEST_REPORT:
      return action.report;
    default:
      return state;
  }
}
