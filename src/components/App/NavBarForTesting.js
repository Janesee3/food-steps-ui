import React from "react";
import { Link } from "react-router-dom";

const NavBarForTesting = () => {
  return (
    <div className="nav-bar">
      <Link to="/location">
        <span>Location</span>
        <span>   </span>
      </Link>
    </div>
  );
};

export default NavBarForTesting;
