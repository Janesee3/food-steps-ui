import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const NavBar = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      style={{ lineHeight: "64px" }}
    >
      <Menu.Item key="1">
        <Link to="/location">Location</Link>
      </Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
  );
};

export default NavBar;