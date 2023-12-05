import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Jasper Ling
        </Link>

        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                {" "}
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/food">
                {" "}
                Food
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/workout">
                {" "}
                Workout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/crypto">
                {" "}
                Crypto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
