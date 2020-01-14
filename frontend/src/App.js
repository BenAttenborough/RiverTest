import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  return <h2>Home</h2>;
}

function Paragraphs(props) {
  let { page, pageSize } = props;
  let { id } = useParams();

  const [data, setData] = useState(null);

  let url = `http://localhost:4000/contract/${id}/paragraphs?page=1&pageSize=50`;

  useEffect(() => {
    fetch(url)
      .then(handleErrors)
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(info => {
        console.log(info);
        setData(info);
      })
      .catch(err => {
        console.log(err);
        setData({ error: err });
      });
  }, []);

  return (
    <div>
      <p>Paras route...</p>
      <p>{`page: ${page}`}</p>
      <p>{`pageSize: ${pageSize}`}</p>
    </div>
  );
}

function ContractRoute() {
  let match = useRouteMatch();
  let query = useQuery();

  return (
    <div>
      <h2>Contract</h2>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:id/paragraphs`}>
          <Paragraphs
            page={query.get("page")}
            pageSize={query.get("pageSize")}
          />
        </Route>
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

  let url = `http://localhost:4000/contract/${id}/paragraphs?page=1&pageSize=50`;

  useEffect(() => {
    fetch(url)
      .then(handleErrors)
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(info => {
        console.log(info);
        setData(info);
      })
      .catch(err => {
        console.log(err);
        setData({ error: err });
      });
  }, []);

  return (
    <div>
      <h3>Requested contract ID: {id}</h3>
      {data ? <DisplayData contract={data} /> : <p>No data</p>}
    </div>
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

function DisplayData(props) {
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

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
