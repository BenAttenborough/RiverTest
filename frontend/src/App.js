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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  return <h2>Home</h2>;
}

function showParagraphs(data) {
  if (!data.content) {
    return <p>There is no data for specified page</p>;
  }
  return data.content.map(item => {
    return <p key={item.id}>{item.attributes.text}</p>;
  });
}

function detectContainerBottom(container) {
  if (container.getBoundingClientRect().bottom <= window.innerHeight) {
    return true;
  }
  return false;
}

// function handleScroll(event, page, setPage) {
//   const container = document.getElementById("paragraphs-container");
//   // An issue here where re-render causes container bottom to be shown again forcing another update
//   if (detectContainerBottom(container)) {
//     console.log("Scrolled to bottom of container");

//     setPage(page + 1);
//   }
//   // console.log("Scrolling", event);
//   // console.log("page", page);
// }

function onScroll() {
  console.log("Scrolled!!! -----");
}

function Paragraphs(props) {
  let { pageSize } = props;
  let { id } = useParams();

  const [data, setData] = useState(null);
  const [page, setPage] = useState(parseInt(props.page));

  let url = `http://localhost:4000/contract/${id}/paragraphs?page=${page}&pageSize=${pageSize}`;

  // window.addEventListener("scroll", event => {
  //   handleScroll(event, page, setPage);
  // });

  // let options = {
  //   root: document.getElementById("paragraphs-container"),
  //   rootMargin: "0px",
  //   threshold: 0
  // };

  // let observer = new IntersectionObserver(onScroll, options);
  // // let target = document.getElementById("eof-marker");
  // let target = (
  //   <div id="eof-marker" className="eof-class">
  //     <p>xxxxx</p>
  //   </div>
  // );

  // if (target) {
  //   observer.observe(target);
  // }

  useEffect(() => {
    // So this is broken because we are adding another event listener every time page is updated
    // window.addEventListener("scroll", event => {
    //   handleScroll(event, page, setPage);
    // });

    fetch(url)
      .then(handleErrors)
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(info => {
        console.log("info >>>>>", info);
        console.log("info >>>>>", info.content);
        // If there is data merge the new info with it
        if (data) {
          let oldContent = data.content.slice();
          let newContent = info.content.slice();
          // console.log("oldContent", oldContent);
          // console.log("newContent", newContent);
          let combinedData = oldContent.concat(newContent);
          // console.log("combinedData", combinedData);
          setData({
            content: combinedData,
            page: info.page,
            pageSize: info.pageSize
          });
        }

        setData(info);
      })
      .catch(err => {
        console.log(err);
        setData({ error: err });
      });
  }, [page]);

  console.log("data >>>>>>", data);
  console.log("page", page);
  return (
    <div>
      <p>Paras route...</p>
      <p>{`page: ${page}`}</p>
      <p>{`pageSize: ${pageSize}`}</p>
      {data ? showParagraphs(data) : "Fetching data"}
      <div id="eof-marker" className="eof-class">
        <p>xxxxx</p>
      </div>
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
