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
  let { id, currentPage, pageSize, setContent, content } = fetchParams;

  const url = `http://localhost:4000/contract/${id}/paragraphs?page=${currentPage}&pageSize=${pageSize}`;
  fetch(url)
    .then(handleErrors)
    .then(resp => {
      console.log(resp);
      return resp.json();
    })
    .then(info => {
      let formattedContent = info.content.map(item => {
        return {
          id: item.id,
          text: item.attributes.text
        };
      });
      // formattedContent = [
      //   ...formattedContent,
      //   {
      //     id: "fooo",
      //     text: "Extra line"
      //   }
      // ];
      // console.log("formattedContent", formattedContent);
      if (content) {
        console.log("content -->", content);
        formattedContent = [...content, ...formattedContent];
      }
      console.log("formattedContent", formattedContent);

      setContent(formattedContent);
    })
    .catch(err => {
      console.log(err);
      setContent({ error: err });
    });
}

function ShowParagraphs(props) {
  const { content } = props;
  if (!content) {
    return <p>There is no content for specified page</p>;
  }
  return content.map(item => {
    return <p key={item.id}>{item.text}</p>;
  });
}

function ShowContent(props) {
  const { content, currentPage, setCurrentPage } = props;
  return (
    <div>
      <ShowParagraphs content={content} />
      <Button
        label={"Fetch more paragraphs"}
        action={() => {
          console.log("currentPage,", currentPage);
          setCurrentPage(currentPage + 1);
        }}
      />
    </div>
  );
}

export function Paragraphs(props) {
  let { page, pageSize } = props;
  let { id } = useParams();
  const [content, setContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const fetchParams = {
    id,
    currentPage,
    pageSize,
    setContent,
    content
  };
  // let url = `http://localhost:4000/contract/${id}/paragraphs?page=${page}&pageSize=${pageSize}`;

  useEffect(() => {
    fetchPars(fetchParams);
  }, [currentPage]);
  // console.log("content >>>>>>", content);
  // console.log("page", page);
  return (
    <div>
      <p>Paras route...</p>
      <p>{`page: ${page}`}</p>
      <p>{`pageSize: ${pageSize}`}</p>
      {content ? (
        <ShowContent
          content={content}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        "Fetching data"
      )}
    </div>
  );
}
