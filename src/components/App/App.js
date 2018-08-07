import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import FoodStepsHeader from "../FoodStepsHeader/FoodStepsHeader";
import NavRoutes from "../NavRoutes/NavRoutes";
import "./App.css";
import { Layout } from "antd";
import {
	setLocalStorageLoggedInStatus,
	getLocalStorageLoggedInStatus
} from "../../utils/userManager";


// const isDevelopment = process.env.NODE_ENV === "development";

class App extends Component {
	constructor() {
		super();
		this.state = {
			isLoggedInUser: getLocalStorageLoggedInStatus() //IM HERE!! TEST THIS ONE!!
		};
	}

	render() {
		return (
			<Layout className="layout">
				<Router>
					{/* Router can only have 1 child, hence a div wrapper required */}
					<div>
						<FoodStepsHeader onSignInAppCallback={this.onUserSignedIn} />
						<NavRoutes isLoggedInUser={this.state.isLoggedInUser} />
					</div>
				</Router>
			</Layout>
		);
	}

	onUserSignedIn = () => {
		this.setState({
			isLoggedInUser: true
		});
	};
}

export default App;
