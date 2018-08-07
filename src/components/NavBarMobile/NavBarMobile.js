import React, { Component } from "react";
import { Button, Icon } from "antd";
import NavBar from "../NavBar/NavBar";

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
        <NavBar
          mobile={true}
          collapsed={this.state.collapsed}
          onSelect={this.toggleCollapsed}
        />
      </div>
    );
  }
}

export default NavBarMobile;
