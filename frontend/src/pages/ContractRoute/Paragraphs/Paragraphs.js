import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleErrors } from "../../../utils/utils";

function Button(props) {
  const { label, action } = props;
  return (
    <div className="button" onClick={action}>
      <span>{label}</span>
    </div>
  );
}

function fetchPars(fetchParams) {
  console.log("Fetching pars");
  const { id, currentPage, pageSize, setData } = fetchParams;
  const url = `http://localhost:4000/contract/${id}/paragraphs?page=${currentPage}&pageSize=${pageSize}`;
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
      // if (data) {
      //   let oldContent = data.content.slice();
      //   let newContent = info.content.slice();
      //   // console.log("oldContent", oldContent);
      //   // console.log("newContent", newContent);
      //   let combinedData = oldContent.concat(newContent);
      //   // console.log("combinedData", combinedData);
      //   setData({
      //     content: combinedData,
      //     page: info.page,
      //     pageSize: info.pageSize
      //   });
      // }
      setData(info);
    })
    .catch(err => {
      console.log(err);
      setData({ error: err });
    });
}

function ShowParagraphs(props) {
  const { data } = props;
  if (!data.content) {
    return <p>There is no data for specified page</p>;
  }
  return data.content.map(item => {
    return <p key={item.id}>{item.attributes.text}</p>;
  });
}

function ShowContent(data) {
  return (
    <div>
      <ShowParagraphs data={data} />
      <Button
        label={"Fetch more paragraphs"}
        action={() => {
          console.log("x");
        }}
      />
    </div>
  );
}

export function Paragraphs(props) {
  let { page, pageSize } = props;
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const fetchParams = {
    id,
    currentPage,
    pageSize,
    setData
  };
  // let url = `http://localhost:4000/contract/${id}/paragraphs?page=${page}&pageSize=${pageSize}`;

  useEffect(() => {
    fetchPars(fetchParams);
  }, [page]);
  console.log("data >>>>>>", data);
  console.log("page", page);
  return (
    <div>
      <p>Paras route...</p>
      <p>{`page: ${page}`}</p>
      <p>{`pageSize: ${pageSize}`}</p>
      {data ? ShowContent(data) : "Fetching data"}
    </div>
  );
}
