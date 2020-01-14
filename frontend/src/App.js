import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/contract">
              <ContractRoute />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function ContractRoute() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Contract</h2>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:id`}>
          <Contract />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Contract() {
  let { id } = useParams();

  const [data, setData] = useState(null);

  let url = "http://localhost:4000/data";

  useEffect(() => {
    fetch(url)
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(info => {
        console.log(info);
        setData(info);
      });
  }, []);

  return (
    <div>
      <h3>Requested contract ID: {id}</h3>
      {data ? <DisplayData contract={data} /> : <p>No data</p>}
    </div>
  );
}

function DisplayData(props) {
  console.log(props);
  return (
    <div>
      <p>{`Name: ${props.contract.data.attributes.name}`}</p>
    </div>
  );
}
