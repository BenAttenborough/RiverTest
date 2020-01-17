import React, { useState, useEffect, useRef } from "react";
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
  // console.log("Fetching pars");
  let {
    id,
    currentPage,
    pageSize,
    setContent,
    prevContent,
    setEOF
  } = fetchParams;

  // console.log("prevContent -->", prevContent);

  const url = `http://localhost:4000/contract/${id}/paragraphs?page=${currentPage}&pageSize=${pageSize}`;
  fetch(url)
    .then(handleErrors)
    .then(resp => {
      // console.log(resp);
      return resp.json();
    })
    .then(updateParagraphs(prevContent, setContent, setEOF))
    .catch(err => {
      console.log(err);
      setContent({ error: err });
    });
}

function updateParagraphs(prevContent, setContent, setEOF) {
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
      // console.log("prevContent -->", prevContent);
      // formattedContent = [...prevContent, ...formattedContent];
      formattedContent = prevContent.concat(formattedContent);
      // console.log()
    }
    const lastItem = formattedContent[formattedContent.length - 1];
    if (lastItem.id === "EOF") {
      setEOF(true);
    }
    // console.log("formattedContent", formattedContent);
    // console.log("formattedContent.length", formattedContent.length);
    // console.log("lastitem", formattedContent[formattedContent.length - 1]);
    setContent(formattedContent);
  };
}

function ShowParagraphs(props) {
  const { content } = props;
  // console.log("xContentx:", content);
  if (!content) {
    return <p>There is no content for specified page</p>;
  }
  return content.map(item => {
    return <p key={item.id}>{item.text}</p>;
  });
}

function onScroll() {
  console.log("Scrolled to bottom");
}

function useVis(
  ref,
  currentPage,
  setCurrentPage,
  fetchParams,
  prevContent,
  content,
  EOF
) {
  // const [triggered, setTriggered] = useState(false);
  console.log("useVis prevContent", prevContent);
  // console.log("useVis content", content);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio === 1) {
        console.log("useVis prevContent inner", prevContent);
        console.log("fetchParams.currentPage", fetchParams.currentPage);
        console.log("currentPage", currentPage);
        // console.log("useVis content inner", content);

        // item is in view
        // console.log("currentPage:", currentPage);
        // console.log("triggered:", triggered);
        // setCurrentPage(currentPage + 1);
        // setTriggered(true);

        // Get more paragraphs
        // console.log("fetchParams", fetchParams);
        fetchParams = {
          ...fetchParams,
          currentPage: fetchParams.currentPage + 1,
          prevContent: content
        };
        console.log("Updated fetchParams", fetchParams);
        console.log("********* EOF:", EOF);
        // let params = {
        //   id: fetchParams.id,
        //   currentPage: fetchParams.currentPage + 1,
        //   pageSize: fetchParams.pageSize,
        //   prevContent: content,
        //   setContent: fetchParams.setContent,
        //   setEOF: fetchParams.setEOF
        // };
        // console.log("Updated params", params);
        fetchPars(fetchParams);
        setCurrentPage(currentPage + 1);
        // *** setEOF
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }
  );

  // return observer;
  useEffect(() => {
    if (!EOF) {
      console.log("triggered useEffect");
      // console.log("ref.current", ref.current);
      // console.log("triggered:", triggered);
      if (ref.current) {
        console.log("ref.current is true");
        observer.observe(ref.current);
      }
      return () => {
        console.log("Cleaning up useEffect observer");
        observer.disconnect();
      };
    }
  }, [content]);
}

function ShowContent(props) {
  const {
    content,
    currentPage,
    setCurrentPage,
    EOF,
    fetchParams,
    prevContent
  } = props;
  console.log("prevContent", prevContent);
  console.log("content", content);
  const scrollEle = useRef(null);
  // useVis(scrollEle, () => {
  //   console.log("currentPage,", currentPage);
  //   setCurrentPage(currentPage + 1);
  // });

  useVis(
    scrollEle,
    currentPage,
    setCurrentPage,
    fetchParams,
    prevContent,
    content,
    EOF
  );

  // let options = {
  //   root: document.querySelector("#scrollArea"),
  //   rootMargin: "0px",
  //   threshold: 1.0
  // };

  // let observer = new IntersectionObserver(onScroll);
  // observer.observe(scrollEle);

  return (
    <div>
      <p>ShowContent</p>
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
      {!EOF && <div ref={scrollEle}>---Scroll for more---</div>}
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
    setEOF
  };
  // Fetch paragraphs on component mount and then every time currentPage is incremented
  useEffect(() => {
    if (!EOF) {
      console.log("Fecthing new paragraphs: ", fetchParams);
      fetchPars(fetchParams);
    }
  }, []);

  return (
    <div>
      <p>Paras route...</p>
      <p>{`page: ${page}`}</p>
      <p>{`pageSize: ${pageSize}`}</p>
      {content ? (
        <div>
          <ShowContent
            content={content}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            EOF={EOF}
            fetchParams={fetchParams}
            prevContent={content}
          />
        </div>
      ) : (
        "Fetching data"
      )}
    </div>
  );
}
