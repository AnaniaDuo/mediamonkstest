import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getGuestColor } from "../store/guestColor";
import { useSelector, useDispatch } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!document.cookie.includes("token")) {
      dispatch(getGuestColor());
    }
  }, []);

  const { color, guestColor } = props;

  return (
    <div>
      {username ? (
        <div className="home-page">
          <h3>Welcome, {username}</h3>
          <div
            className="ball"
            style={{
              background: color,
            }}
          ></div>
        </div>
      ) : (
        <div className="home-page">
          <h3>Welcome</h3>
          <div
            className="ball"
            style={{
              background: guestColor,
            }}
          />
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.user ? state.auth.user.username : undefined,
    color: state.auth.color,
    guestColor: state.guestColor,
  };
};

export default connect(mapState)(Home);
