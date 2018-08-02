import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import FoodStepsHeader from "../FoodStepsHeader/FoodStepsHeader";
import NavRoutes from "../NavRoutes/NavRoutes";
import "./App.css";
import { Layout } from "antd";

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Router>
          {/* Router can only have 1 child, hence a div wrapper required */}
          <div>
            <FoodStepsHeader />
            <NavRoutes />
          </div>
        </Router>
      </Layout>
    );
  }
}

export default App;
