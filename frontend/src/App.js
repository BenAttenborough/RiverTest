import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import { ContractRoute } from "./pages/ContractRoute/ContractRoute";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-main">
          <Switch>
            <Route path="/contract">
              <div id="paragraphs-container" className="App-content">
                <ContractRoute />
              </div>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
