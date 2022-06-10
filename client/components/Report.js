import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserReport } from "../store/userReport";
import { getGuestReport } from "../store/guestReport";

function Report(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGuestReport());
    dispatch(getUserReport());
  }, []);

  const userReport = props.userReport || [];
  const guestReport = props.guestReport || [];

  return (
    <div>
      <div>USER REPORT</div>
      {userReport && (
        <div>
          {userReport.map((ele) => (
            <div key={ele.id}>
              <> UserID={ele.id}</>
              <> {ele.trend}</>
            </div>
          ))}
        </div>
      )}
      <hr />
      <div>GUEST REPORT</div>
      {guestReport ? (
        <div>
          {guestReport.map((ele) => (
            <div key={ele.id}>
              <> GuestID={ele.id}</>
              <> {ele.trend}</>
            </div>
          ))}
        </div>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}

const mapState = (state) => {
  return {
    userReport: state.userReport,
    guestReport: state.guestReport,
  };
};
export default connect(mapState)(Report);
