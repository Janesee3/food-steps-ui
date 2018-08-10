import React from "react";
import { Route } from "react-router-dom";
import MainLocationsPage from "../MainLocationsPage/MainLocationsPage";
import { Layout } from "antd";
import "./NavRoutes.css";
import UserLocationsPage from "../UserLocationsPage/UserLocationsPage";
import "./NavRoutes.css";
const { Content } = Layout;

const NavRoutes = props => {
	return (
		<Content className="content-container">
			<Route path="/" exact render={() => <MainLocationsPage isLoggedInUser={props.isLoggedInUser}/>}/>
			<Route path="/user-locations-page" component={UserLocationsPage} />
			{/* <Route path="/location-list" component={LocationsList} /> */}
			{/* <Route path="/new-location" render={() => <LocationFormContainer isLoggedInUser={props.isLoggedInUser} />} /> */}
		</Content>
	);
};

export default NavRoutes;
