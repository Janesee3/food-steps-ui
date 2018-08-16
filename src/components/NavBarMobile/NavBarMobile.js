import React, { Component } from "react";
import { Button, Icon, Drawer } from "antd";
import NavBar from "../NavBar/NavBar";
import "./NavBarMobile.css";

class NavBarMobile extends Component {
	state = {
		isDrawerVisible: false
	};

	closeDrawer = () => {
		this.setState({
			isDrawerVisible: false
		});
	};

	showDrawer = () => {
		this.setState({
			isDrawerVisible: true
		});
	};

	render() {
		return (
			<div className="menu-btn-wrapper">
				<Button ghost className="menu-btn" onClick={this.showDrawer}>
					<Icon type="menu-unfold" />
				</Button>
				<Drawer
					title=""
					placement="left"
					closable={false}
					onClose={this.closeDrawer}
					visible={this.state.isDrawerVisible}
					className="drawer"
				>
					<NavBar mode={"vertical"} />
				</Drawer>
			</div>
		);
	}
}

export default NavBarMobile;
