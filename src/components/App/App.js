import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import NavRoutes from "./NavRoutes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <NavRoutes />
        </div>
      </Router>
    );
  }
}

export default App;
