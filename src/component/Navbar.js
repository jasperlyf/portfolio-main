// Navbar.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

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
                {/* Change "/About" to "/about" */}
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/food">
                {" "}
                {/* Change "/FoodApp" to "/food" */}
                Food
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/workout">
                {" "}
                {/* Change "/WorkoutApp" to "/workout" */}
                Workout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/crypto">
                {" "}
                {/* Change "/CryptoApp" to "/crypto" */}
                Crypto
              </Link>
            </li>
            {/* Add more nav items as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
