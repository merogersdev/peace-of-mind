import "./Pagination.scss";

export default function Pagination({
  totalEntries,
  entriesPerPage,
  setCurrentPage,
  currentPage,
}) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i += 1) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <h4 className="pagination__h4">Pages:</h4>
      <div className="pagination__button-container">
        {pages.map((page) => (
          <button
            className={`pagination__button pagination__button${
              currentPage === page ? "--primary" : "--dark"
            } pagination__button--big-icon pagination__button--spacer`}
            type="button"
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
