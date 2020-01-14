import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function Contract() {
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

  return <div className="Contract">{data ? <p>data</p> : <p>No data</p>}</div>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Contract /> */}
        <Router>
          <Switch>
            <Route path="/about">
              <p>About</p>
            </Route>
            <Route path="/users">
              <p>Users</p>
            </Route>
            <Route path="/">
              <p>Home</p>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
