import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { makeFetchRequest } from "../../../utils/utils";

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

  const url = `http://localhost:4000/contract/${id}/paragraphs?page=${currentPage}&pageSize=${pageSize}`;

  makeFetchRequest(url, data => {
    updateParagraphs(data, prevContent, setContent, setEOF);
  });
}

function updateParagraphs(data, prevContent, setContent, setEOF) {
  let formattedContent = [];
  if (data.content) {
    formattedContent = data.content.map(item => {
      return {
        id: item.id,
        text: item.attributes.text
      };
    });
  }
  if (prevContent) {
    formattedContent = prevContent.concat(formattedContent);
  }
  const lastItem = formattedContent[formattedContent.length - 1];
  if (lastItem.id === "EOF") {
    setEOF(true);
  }
  // console.log("formattedContent", formattedContent);
  // console.log("formattedContent.length", formattedContent.length);
  // console.log("lastitem", formattedContent[formattedContent.length - 1]);
  setContent(formattedContent);
}

function ShowParagraphs(props) {
  const { content } = props;
  // console.log("xContentx:", content);
  if (!content) {
    return <li>There is no content for specified page</li>;
  }
  return content.map(item => {
    return <li key={item.id}>{item.text}</li>;
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
  console.log("useVis prevContent", prevContent);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio === 1) {
        console.log("useVis prevContent inner", prevContent);
        console.log("fetchParams.currentPage", fetchParams.currentPage);
        console.log("currentPage", currentPage);

        fetchParams = {
          ...fetchParams,
          currentPage: fetchParams.currentPage + 1,
          prevContent: content
        };
        console.log("Updated fetchParams", fetchParams);
        console.log("********* EOF:", EOF);

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

  useVis(
    scrollEle,
    currentPage,
    setCurrentPage,
    fetchParams,
    prevContent,
    content,
    EOF
  );

  return (
    <div>
      <ul className="contract-paragraphs">
        <ShowParagraphs content={content} />
      </ul>
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
  // Defaults if parameters missing
  if (!page) {
    page = 1;
  }
  if (!pageSize) {
    pageSize = 5;
  }
  let { id } = useParams();
  const [content, setContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(page));
  const [EOF, setEOF] = useState(false);
  const [title, setTitle] = useState("...");

  const fetchParams = {
    id,
    currentPage,
    pageSize,
    setContent,
    prevContent: content,
    setEOF
  };

  const url = `http://localhost:4000/contract/${id}`;

  // Fetch paragraphs on component mount and then every time currentPage is incremented
  useEffect(() => {
    if (!EOF) {
      console.log("Fecthing new paragraphs: ", fetchParams);
      fetchPars(fetchParams);
      makeFetchRequest(url, meta => {
        setTitle(meta.data.attributes.name);
      });
    }
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      <p>{`Starting page: ${page}`}</p>
      <p>{`Fetching ${pageSize} paragraphs at a time`}</p>
      {content ? (
        content.error ? (
          <Error message={content.error} />
        ) : (
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
        )
      ) : (
        "Fetching data"
      )}
    </div>
  );
}

function Error({ message }) {
  return (
    <div>
      <p>{`${message}`}</p>
    </div>
  );
}
