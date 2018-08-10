import React from "react";
import { Route } from "react-router-dom";
import MainLocationsPage from "../MainLocationsPage/MainLocationsPage";
import LocationFormContainer from "../LocationFormContainer/LocationFormContainer";
import { Layout } from "antd";
import "./NavRoutes.css";
import UserLocationsPage from "../UserLocationsPage/UserLocationsPage";
import LocationsList from "../LocationsList/LocationsList";
import "./NavRoutes.css";
const { Content } = Layout;

const NavRoutes = props => {
	return (
		<Content className="content-container">
			<Route path="/" exact component={MainLocationsPage} />
			<Route path="/user-locations-page" component={UserLocationsPage} />
			{/* <Route path="/location-list" component={LocationsList} /> */}
			{/* <Route path="/new-location" render={() => <LocationFormContainer isLoggedInUser={props.isLoggedInUser} />} /> */}
		</Content>
	);
};

export default NavRoutes;
