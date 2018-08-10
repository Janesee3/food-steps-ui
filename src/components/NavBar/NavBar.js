import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

export const menu = (
	<Menu
		theme="dark"
		defaultSelectedKeys={[]}
		mode="horizontal"
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

const NavBar = () => {
	return menu;
};

export default NavBar;
