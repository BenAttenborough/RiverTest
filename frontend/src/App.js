import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import { ContractRoute } from "./pages/ContractRoute/ContractRoute";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-main">
          <div id="paragraphs-container" className="App-content">
            <Switch>
              <Route path="/contract">
                <ContractRoute />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

function HandleFetchError(error) {
  return (
    <div>
      <p>{`${error.error}`}</p>
    </div>
  );
}

function ShowData(props) {
  const { contract } = props;
  return (
    <div>
      <p>{`Requested id: ${contract.data.id}`}</p>
      <p>{`Requested name: ${contract.data.attributes.name}`}</p>
    </div>
  );
}

export function DisplayData(props) {
  console.log("props: ", props);
  return (
    <div>
      {/* <p>{`Name: ${props.contract.data.attributes.name}`}</p> */}
      {props.contract.error ? (
        <HandleFetchError error={props.contract.error} />
      ) : (
        <ShowData contract={props.contract} />
      )}
    </div>
  );
}
