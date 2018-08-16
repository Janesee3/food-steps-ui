import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const menu = mode => {
	return (
		<Menu
			theme="dark"
			defaultSelectedKeys={[]}
			mode={mode}
			style={{ lineHeight: "64px" }}
		>
			<Menu.Item key="1">
				<Link to="/">Home</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to="/user-locations-page">My Food Places</Link>
			</Menu.Item>
		</Menu>
	);
};

const NavBar = props => {
	return menu(props.mode);
};

export default NavBar;
