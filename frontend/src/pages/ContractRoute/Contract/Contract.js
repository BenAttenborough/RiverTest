import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleErrors } from "../../../utils/utils";
import { DisplayData } from "../../../App";
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
export function Contract() {
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
