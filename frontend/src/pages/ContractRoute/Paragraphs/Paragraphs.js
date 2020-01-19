import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchPars, fetchTitle, ShowContent } from "./paragraphFunctionality";

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

function Controls({ page, resetPage, EOF }) {
  let [pagination, setPagination] = useState(page);
  return (
    <div>
      <form>
        <input
          type="text"
          value={pagination}
          onChange={event => {
            setPagination(parseInt(event.target.value));
            resetPage(parseInt(event.target.value));
          }}
        />
      </form>

      {pagination > 1 && (
        <button
          onClick={() => {
            setPagination(parseInt(pagination) - 1);
            resetPage(parseInt(pagination) - 1);
          }}
        >
          Page backwards
        </button>
      )}

      {!EOF && (
        <button
          onClick={() => {
            setPagination(parseInt(pagination) + 1);
            resetPage(parseInt(pagination) + 1);
          }}
        >
          Page forward
        </button>
      )}
    </div>
  );
}
