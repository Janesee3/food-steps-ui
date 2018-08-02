import React from "react";
import { Route } from "react-router-dom";
import LocationComponent from '../Location/Location';

const NavRoutes = () => {
  return (
    <div className="main">
      <Route path="/location" component={LocationComponent} />
    </div>
  );
};

export default NavRoutes;
