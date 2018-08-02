import React from "react";
import { Route } from "react-router-dom";
import MainLocationsPage from "../MainLocationsPage/MainLocationsPage";
import { Layout } from "antd";
import './NavRoutes.css'
import UserLocationsPage from '../UserLocationsPage/UserLocationsPage'
const { Content } = Layout;




const NavRoutes = () => {
  return (
    <Content className="content-container">
      <Route path="/location" component={MainLocationsPage} />
      <Route path="/user-locations-page" component={UserLocationsPage} />
    </Content>

  );
};

export default NavRoutes;
