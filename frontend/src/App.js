import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Contract />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
