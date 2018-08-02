import React from "react";
import { Layout } from "antd";
import NavBar from "../NavBar/NavBar";
import "./FoodStepsHeader.css";

const { Header } = Layout;

const FoodStepsHeader = () => {
  return (
    <div>
      <Header>
        <div className="logo" />
        <NavBar />
      </Header>
    </div>
  );
};

export default FoodStepsHeader;
