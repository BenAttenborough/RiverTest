import React, { useState, useEffect } from "react";
import { handleErrors } from "../utils/utils";

function DisplayContracts({ contracts }) {
  console.log("contracts:", contracts);
  return (
    <div>
      <h3>Available contracts</h3>
      <ul className="contracts-list">
        {contracts.map(contract => {
          return (
            <li key={contract.data.id}>
              <a href={`${contract.relationships.paragraphs.links.self}`}>
                {contract.data.attributes.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function HandleData({ data }) {
  return (
    <div>
      {data.data ? (
        <DisplayContracts contracts={data} />
      ) : (
        <p>{`Error: ${data.error}`}</p>
      )}
    </div>
  );
}

// function use

export default function Home() {
  const [data, setData] = useState(null);
  let url = `http://localhost:4000/contracts`;
  useEffect(() => {
    fetch(url)
      .then(resp => {
        console.log("cc", resp);
        handleErrors(resp);
      })
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(info => {
        console.log("info", info);
        setData(info);
      })
      .catch(err => {
        console.log("err:", err);
        if (err == "TypeError: Failed to fetch") {
          setData({ error: `Cannot make contact with server on ${url}` });
        } else {
          setData({ error: err });
        }
      });
  }, []);
  return (
    <div>
      <h2>Home</h2>
      {data ? <HandleData data={data} /> : <p>Loading</p>}
    </div>
  );
}
