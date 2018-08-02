import React from "react";
import { Route } from "react-router-dom";
import MainLocationsPage from '../MainLocationsPage/MainLocationsPage';

const NavRoutes = () => {
  return (
    <div className="main">
      <Route path="/location" component={MainLocationsPage} />
    </div>
  );
};

export default NavRoutes;
