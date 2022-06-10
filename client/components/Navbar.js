import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { deleteCookies } from "../utils";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="navbar">
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to="/home" className="nav-text">
            Home
          </Link>

          <a href="#" onClick={handleClick} className="nav-text">
            Logout
          </a>
          {isAdmin && (
            <Link to="/report" className="nav-text">
              Report
            </Link>
          )}
        </div>
      ) : (
        <div>
          <Link to="/login" className="nav-text">
            Login
          </Link>
          <Link to="/signup" className="nav-text">
            Sign Up
          </Link>
          <Link to="/home" className="nav-text">
            Home
          </Link>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: state.auth.user && !!state.auth.user.id,
    isAdmin: state.auth.user && !!state.auth.user.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      deleteCookies(document.cookie);
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
