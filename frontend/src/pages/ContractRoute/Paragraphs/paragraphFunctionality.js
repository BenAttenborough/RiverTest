import React, { useEffect, useRef } from "react";
import { makeFetchRequest } from "../../../utils/utils";
import { baseUrl } from "../../../settings/constants";
function Button(props) {
  const { label, action } = props;
  return (
    <div className="button" onClick={action}>
      <span>{label}</span>
    </div>
  );
}
/**
 * Fetches the contract title and sets it
 *
 * @param {int} id
 * @param {function} setTitle
 */
export function fetchTitle(id, setTitle) {
  const url = `${baseUrl}/contract/${id}`;
  makeFetchRequest(url).then(response => {
    if (!response.error) {
      setTitle(response.data.attributes.name);
    }
  });
}
/**
 * Fetches paragraphs based on:
 * id: The id of the contract
 * currentPage: The "page" of paragraphs to retrieve (defaults to 1)
 * pageSize: The number of paragraphs to retrieve per page
 *
 * setContent: A function which sets the content state
 * prevContent: The previous paragraphs fetched, if any. New paragraphs will be added to the end
 * setEOF: If the end of the contract is his this will be called to inform the system to stop fetching paragraphs
 *
 * @param {object} param0
 */
export function fetchPars({
  id,
  currentPage,
  pageSize,
  setContent,
  prevContent,
  setEOF
}) {
  const url = `${baseUrl}/contract/${id}/paragraphs?page=${currentPage}&pageSize=${pageSize}`;
  makeFetchRequest(url).then(data => {
    if (data.error) {
      console.warn("There has been an error. Is the server up and running?");
      setContent([
        { id: 1, text: `Cannot fetch data from server. Error: ${data.error}` }
      ]);
      setEOF(true);
    } else {
      updateParagraphs(data, prevContent, setContent, setEOF);
    }
  });
}
/**
 * Updates the content state with additional paragraphs
 *
 * @param {object} data The data where the paragraphs reside
 * @param {object} prevContent The previous paragraphs fetched, if any. New paragraphs will be added to the end
 * @param {function} setContent A function which sets the content state
 * @param {function} setEOF If the end of the contract is hit this will be called to inform the system to stop fetching paragraphs
 */
export function updateParagraphs(data, prevContent, setContent, setEOF) {
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
  setContent(formattedContent);
}
/**
 * Shows all the paragraphs sent to it
 * NOTE: Every paragraph must have a unique key
 *
 * @param { object } props Contains props.content
 */
export function ShowParagraphs({ content }) {
  if (!content) {
    return <li>There is no content for specified page</li>;
  }
  return content.map(item => {
    return <li key={item.id}>{item.text}</li>;
  });
}
/**
 * Watches for when user scrolls to the bottom of the page
 * and fetches additional paragraphs (if any).
 * It does this by watch for when the element indicated by ref
 * appears in the viewport
 *
 * @param {object} ref A reference to the element which will trigger the fetch
 * @param {int} currentPage The current page of paragraphs shown
 * @param {function} setCurrentPage Function that sets the page state
 * @param {object} fetchParams Params for fetching new paragraphs
 * @param {array} content The current paragraphs displayed
 * @param {boolean} EOF Indicates if we have hit the end of the file
 */

export function useVis(
  ref,
  currentPage,
  setCurrentPage,
  fetchParams,
  content,
  EOF
) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio === 1) {
        fetchParams = {
          ...fetchParams,
          currentPage: fetchParams.currentPage + 1,
          prevContent: content
        };
        fetchPars(fetchParams);
        setCurrentPage(currentPage + 1);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }
  );
  useEffect(() => {
    if (!EOF) {
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        observer.disconnect();
      };
    }
  }, [content]);
}
/**
 * Displays all the paragraphs and adds magic scroll element which is used for
 * detecting when the user has scrolled to the bottom of the screen
 * See: useVis
 *
 * @param {object} props
 */
export function ShowContent(props) {
  const { content, currentPage, setCurrentPage, EOF, fetchParams } = props;
  const scrollEle = useRef(null);
  useVis(scrollEle, currentPage, setCurrentPage, fetchParams, content, EOF);
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
