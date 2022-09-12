import React from "react";

const Pagination = ({ numberOfPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{ paddingBottom: "50px" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul style={{ display: "flex" }}>
          <li
            onClick={prevPage}
            style={{
              padding: "10px",
              width: "80px",
              textAlign: "center",
            }}
          >
            prev
          </li>
          {pageNumbers.map((page) => (
            <li
              key={page}
              style={{
                padding: "10px",
                width: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
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
          <li
            onClick={nextPage}
            style={{
              padding: "10px",
              width: "80px",
              textAlign: "center",
            }}
          >
            next
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
