import React, { useState, useEffect } from "react";

function Pagination(props) {
  const totalPages = parseInt(props.totalPages);
  const currentPage = parseInt(props.currentPage);
  const propMaxPage = parseInt(props.maxPages);
  const callback = props.callback;
  const chooseMax = (totalPages, maxPages) => {
    if (totalPages > maxPages) {
      return maxPages;
    } else {
      return totalPages;
    }
  };
  const maxPages = chooseMax(totalPages, propMaxPage);
  const range = (from, to, step = 1) => {
    const range = [];
    let i = from;
    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };
  useEffect(() => {
    setRangeArray(range(currentPage, currentPage + maxPages - 1));
  }, [totalPages]);
  const [rangeArr, setRangeArray] = useState([]);
  const loadNewPage = (e) => {
    const i = parseInt(e.target.name, 10);
    callback(i);
  };
  const loadNextPage = () => {
    const length = rangeArr.length;
    if (
      currentPage === rangeArr[length - 1] &&
      currentPage !== totalPages - 1
    ) {
      const arr = rangeArr.map((i) => i + 1);
      setRangeArray(arr);
    }
    if (currentPage !== totalPages - 1) {
      callback(currentPage + 1);
    }
  };

  const loadPrevPage = () => {
    if (currentPage === rangeArr[0] && currentPage !== 0) {
      const arr = rangeArr.map((i) => i - 1);
      setRangeArray(arr);
    }
    if (currentPage !== 0) {
      callback(currentPage - 1);
    }
  };
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button class="page-link" onClick={loadPrevPage}>
            Previous
          </button>
        </li>
        {rangeArr.map((i) => {
          return (
            <li
              key={i}
              class={i === currentPage ? "active page-item" : "page-item"}
            >
              <button class="page-link" name={i} onClick={loadNewPage}>
                {i}
              </button>
            </li>
          );
        })}
        <li class="page-item">
          <button class="page-link" onClick={loadNextPage}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;
