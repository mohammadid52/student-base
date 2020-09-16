import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

const Navbar = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const logoutUser = async () => {
    try {
      await firebase.logout();
      history.push("/login");
    } catch (error) {
      console.log("error Logout: ", error);
    }
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={require("../../Assets/logo.svg")}
            height="30px"
            alt="logo"
          />
        </Link>

        <div>
          <ul className="navbar-nav mr-auto"></ul>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link to="/studentForm" className="btn btn-primary mr-3">
                Add Student
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-a dropdown-toggle"
                to="!#"
                id="navbarDropdown"
                data-toggle="dropdown"
              >
                <img
                  src={require("../../Assets/admin.jpg")}
                  height="40px"
                  alt="admin img"
                />
                <span className="ml-2 navbar-text">Name</span>
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="!#">
                  Profile
                </Link>
                <Link
                  className="dropdown-item"
                  to="!#"
                  onClick={() => logoutUser()}
                >
                  Logout
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="!#">
                  Ads
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
