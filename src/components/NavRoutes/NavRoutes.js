import React from "react";
import { Route } from "react-router-dom";
import MainLocationsPage from "../MainLocationsPage/MainLocationsPage";
import LocationForm from "../LocationForm/LocationForm";
import { Layout } from "antd";
import './NavRoutes.css'
import UserLocationsPage from '../UserLocationsPage/UserLocationsPage'
import LocationsList from '../LocationsList/LocationsList'
import "./NavRoutes.css";
const { Content } = Layout;




const NavRoutes = () => {
  return (
    <Content className="content-container">
      <Route path="/location" component={MainLocationsPage} />
      <Route path="/user-locations-page" component={UserLocationsPage} />
      <Route path="/location-list" component={LocationsList} />
      <Route path="/new-location" component={LocationForm} />
    </Content>

  );
};

export default NavRoutes;
