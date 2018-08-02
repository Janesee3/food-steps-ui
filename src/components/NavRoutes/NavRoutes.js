import React from "react";
import { Route } from "react-router-dom";
import MainLocationsPage from "../MainLocationsPage/MainLocationsPage";
import { Layout } from "antd";
import './NavRoutes.css'
import LocationsList from '../LocationsList/LocationsList'
const { Content } = Layout;




const NavRoutes = () => {
  return (
    <Content className="content-container">
      <Route path="/location" component={MainLocationsPage} />
      <Route path="/location-list" component={LocationsList} />
    </Content>

  );
};

export default NavRoutes;
