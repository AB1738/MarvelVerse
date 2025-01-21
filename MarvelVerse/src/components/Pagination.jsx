import React from 'react'

const Pagination = ({currentPage,totalPages,nextPage,prevPage}) => {
  return (
    <div className="pagination">
    <button onClick={prevPage} disabled={currentPage === 1}>
      <i className="fa-solid fa-arrow-left"></i>
    </button>
    <span className="pagination-text">
      {" "}
      {currentPage} of {totalPages}
    </span>
    <button onClick={nextPage} disabled={currentPage === totalPages}>
      <i className="fa-solid fa-arrow-right"></i>
    </button>
  </div>
  )
}

export default Pagination