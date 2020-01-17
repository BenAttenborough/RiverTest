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
  let {
    id,
    currentPage,
    pageSize,
    setContent,
    prevContent,
    EOF,
    setEOF
  } = fetchParams;

  const url = `http://localhost:4000/contract/${id}/paragraphs?page=${currentPage}&pageSize=${pageSize}`;
  fetch(url)
    .then(handleErrors)
    .then(resp => {
      console.log(resp);
      return resp.json();
    })
    .then(updateParagraphs(prevContent, setContent, EOF, setEOF))
    .catch(err => {
      console.log(err);
      setContent({ error: err });
    });
}

function updateParagraphs(prevContent, setContent, EOF, setEOF) {
  return info => {
    let formattedContent = [];
    if (info.content) {
      formattedContent = info.content.map(item => {
        return {
          id: item.id,
          text: item.attributes.text
        };
      });
    }
    if (prevContent) {
      console.log("content -->", prevContent);
      formattedContent = [...prevContent, ...formattedContent];
    }
    const lastItem = formattedContent[formattedContent.length - 1];
    if (lastItem.id === "EOF") {
      setEOF(true);
    }
    console.log("formattedContent", formattedContent);
    console.log("formattedContent.length", formattedContent.length);
    console.log("lastitem", formattedContent[formattedContent.length - 1]);
    setContent(formattedContent);
  };
}

function ShowParagraphs(props) {
  const { content } = props;
  console.log("xContentx:", content);
  if (!content) {
    return <p>There is no content for specified page</p>;
  }
  return content.map(item => {
    return <p key={item.id}>{item.text}</p>;
  });
}

function ShowContent(props) {
  const { content, currentPage, setCurrentPage, EOF } = props;
  return (
    <div>
      <ShowParagraphs content={content} />
      {!EOF && (
        <Button
          label={"Fetch more paragraphs"}
          action={() => {
            console.log("currentPage,", currentPage);

            setCurrentPage(currentPage + 1);
          }}
        />
      )}
    </div>
  );
}

export function Paragraphs(props) {
  let { page, pageSize } = props;
  let { id } = useParams();
  const [content, setContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [EOF, setEOF] = useState(false);

  const fetchParams = {
    id,
    currentPage,
    pageSize,
    setContent,
    prevContent: content,
    EOF,
    setEOF
  };

  // Fetch paragraphs on component mount and then every time currentPage is incremented
  useEffect(() => {
    if (!EOF) {
      fetchPars(fetchParams);
    }
  }, [currentPage]);

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
          EOF={EOF}
        />
      ) : (
        "Fetching data"
      )}
    </div>
  );
}
