import axios from "axios";
const TOKEN = "token";

//ACTION TYPE
const USER_REPORT = "USER_REPORT";

//ACTION CREATORS
const setUserReport = (report) => ({
  type: USER_REPORT,
  report,
});

//THUNK CREATOR
export const getUserReport = () => async (dispatch) => {
  const { data } = await axios.get("/api/report/loginUserReport");
  return dispatch(setUserReport(data));
};

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case USER_REPORT:
      return action.report;
    default:
      return state;
  }
}
