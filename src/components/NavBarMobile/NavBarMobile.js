import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Icon } from "antd";

class NavBarMobile extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div>
        <Button
          className="navbar-mobile-btn"
          type="primary"
          onClick={this.toggleCollapsed}
        >
          <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
        </Button>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[]}
          style={{ display: this.state.collapsed ? "none" : "" }}
        >
          <Menu.Item key="1">
            <Link to="/user-locations-page">User Locations Page</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/new-location">New Location</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/location">Main Location Page</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default NavBarMobile;
