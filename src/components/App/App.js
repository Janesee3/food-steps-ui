import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import FoodStepsHeader from "../FoodStepsHeader/FoodStepsHeader";
import NavRoutes from "../NavRoutes/NavRoutes";
import { Layout, message } from "antd";
import {
	saveLoginStatusAndUser,
	removeLoginStatusAndUser,
	getLocalStorageLoggedInStatus
} from "../../utils/userManager";
import { logout } from "../../services/userService/userService";
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
		logout(this.onLogoutSucess, this.onLogoutFailed);
		this.setState({
			isUserLoggedIn: false
		});
	};

	onLogoutSucess = () => {
		message.success("Successfully logged out", 3);
	};

	onLogoutFailed = () => {
		message.error(
			"Something unexpected occured while logging out. Please try again or contact admin.",
			3
		);
	};
}

export default App;
