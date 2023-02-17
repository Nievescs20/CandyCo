/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Pagination.css";

const Pagination = ({ numberOfPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pagination">
      <nav className="pagination__nav">
        <ul className="pagination__nav__list">
          <li onClick={prevPage} className="pagination__nav__list__first-last">
            prev
          </li>
          {pageNumbers.map((page) => (
            <li
              key={page}
              className="pagination__nav__list__pages"
              onClick={() => setCurrentPage(page)}
            >
              <a
                href="#"
                style={{ fontWeight: currentPage === page ? "bolder" : "" }}
              >
                {page}
              </a>
            </li>
          ))}
          <li onClick={nextPage} className="pagination__nav__list__first-last">
            next
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
