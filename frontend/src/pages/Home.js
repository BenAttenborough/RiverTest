import React, { useState } from "react";
import { makeFetchRequest } from "../utils/utils";
import { Link } from "react-router-dom";

export function DisplayContracts({ contracts }) {
  return (
    <div>
      <h3>Available contracts</h3>
      <ul className="contracts-list">
        {contracts.map(contract => {
          return (
            <li key={contract.data.id}>
              {contract.data.attributes.name}
              <span> </span>
              <Link to={`contract/${contract.data.id}`}>View title</Link>
              <span> </span>
              <Link to={contract.relationships.paragraphs.links.self}>
                View content
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function HandleData({ data }) {
  return (
    <div>
      {data.error ? (
        <p>{`Error: ${data.error}`}</p>
      ) : (
        <DisplayContracts contracts={data} />
      )}
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState(null);
  let url = `http://localhost:4000/contracts`;
  React.useEffect(() => {
    makeFetchRequest(url).then(setData);
  }, []);
  return (
    <div>
      <h2>Home</h2>
      {data ? <HandleData data={data} /> : <p>Loading</p>}
    </div>
  );
}
