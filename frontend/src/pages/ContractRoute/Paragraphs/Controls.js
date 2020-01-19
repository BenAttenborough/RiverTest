import React, { useState } from "react";

export default function Controls({ page, resetPage, EOF }) {
  let [pagination, setPagination] = useState(page);
  return (
    <div>
      {pagination > 1 && (
        <div
          className="page-button"
          onClick={() => {
            setPagination(parseInt(pagination) - 1);
            resetPage(parseInt(pagination) - 1);
          }}
        >
          Page backwards
        </div>
      )}

      {!EOF && (
        <div
          className="page-button"
          onClick={() => {
            setPagination(parseInt(pagination) + 1);
            resetPage(parseInt(pagination) + 1);
          }}
        >
          Page forward
        </div>
      )}
    </div>
  );
}
