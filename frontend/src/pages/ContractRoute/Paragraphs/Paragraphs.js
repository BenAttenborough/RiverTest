import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchPars, fetchTitle, ShowContent } from "./paragraphFunctionality";
import Controls from "./Controls";

/**
 * Component that wraps all the page functionality together
 *
 * @param {object} props
 */
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

  // Fetch some paragraphs and title once on component mount
  useEffect(() => {
    if (!EOF) {
      fetchPars(fetchParams);
      fetchTitle(id, setTitle);
    }
  }, []);

  function resetPage(pageNumber) {
    setCurrentPage(pageNumber);
    setContent(null);
    setEOF(false);
    const options = {
      id,
      currentPage: pageNumber,
      pageSize,
      setContent,
      prevContent: null,
      setEOF
    };
    fetchPars(options);
  }

  return (
    <div>
      <Link to="/" className="nav-button">
        Home
      </Link>
      <h2>{title}</h2>
      <p>
        Scroll to fetch additional paragraphs. Forward/backwards buttons skip
        pages
      </p>
      <Controls page={page} resetPage={resetPage} EOF={EOF} />
      <p>{`Starting page: ${page}`}</p>
      <p>{`Fetching ${pageSize} paragraphs at a time`}</p>
      {content ? (
        content.error ? (
          <p>{content.error}</p>
        ) : (
          <ShowContent
            content={content}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            EOF={EOF}
            fetchParams={fetchParams}
          />
        )
      ) : (
        "Fetching data"
      )}
    </div>
  );
}
