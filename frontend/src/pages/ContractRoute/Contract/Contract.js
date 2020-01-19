import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleErrors } from "../../../utils/utils";

function ShowData(props) {
  const { contract } = props;
  let title = "Unknown title";
  if (contract.data.attributes.name) {
    title = contract.data.attributes.name;
  }
  return (
    <div>
      <h3>{`${title}`}</h3>
      <p>
        <a href={`/contract/${contract.data.id}/paragraphs?page=1&pageSize=5`}>
          View contract contents
        </a>
      </p>
    </div>
  );
}

function DisplayData(props) {
  return (
    <div>
      {props.contract.error ? (
        <p>{`${props.contract.error}`}</p>
      ) : (
        <ShowData contract={props.contract} />
      )}
    </div>
  );
}

export function Contract() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const url = `http://localhost:4000/contract/${id}`;
  useEffect(() => {
    fetch(url)
      .then(handleErrors)
      .then(resp => {
        console.log(resp);
        return resp.json();
      })
      .then(info => {
        console.log("info", info);
        setData(info);
      })
      .catch(err => {
        console.log(err);
        setData({ error: err });
      });
  }, []);
  return (
    <div>
      <h2>Requested contract ID: {id}</h2>
      {data ? <DisplayData contract={data} /> : <p>No data</p>}
    </div>
  );
}
