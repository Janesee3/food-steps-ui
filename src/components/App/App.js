import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import FoodStepsHeader from "../FoodStepsHeader/FoodStepsHeader";
import NavRoutes from "../NavRoutes/NavRoutes";
import { Layout } from "antd";
import {
	saveLoginStatusAndUser,
	removeLoginStatusAndUser,
	getLocalStorageLoggedInStatus
} from "../../utils/userManager";
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			isUserLoggedIn: getLocalStorageLoggedInStatus() // Use localStorage to remember login status
		};
	}

	render() {
		return (
			<Layout className="layout">
				<Router>
					{/* Router can only have 1 child, hence a div wrapper required */}
					<div>
						<FoodStepsHeader
							onUserLogin={this.onUserLogin}
							onUserLogout={this.onUserLogout}
							isUserLoggedIn={this.state.isUserLoggedIn}
						/>
						<NavRoutes isUserLoggedIn={this.state.isUserLoggedIn} />
					</div>
				</Router>
			</Layout>
		);
	}

	onUserLogin = user => {
		saveLoginStatusAndUser(user);
		this.setState({
			isUserLoggedIn: true
		});
	};

	onUserLogout = () => {
		removeLoginStatusAndUser();
		this.setState({
			isUserLoggedIn: false
		});
	};
}

export default App;
