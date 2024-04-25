const Pagination = ({
  currentPage,
  paginate,
  totalPages,
}: {
  currentPage: number;
  paginate: (pageNumber: number) => void;
  totalPages: number;
}) => {
  return (
    <nav>
      <ul className="pagination flex justify-center">
        <li className="page-item">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-link"
          >
            &lt;
          </button>
        </li>
        <li className="page-item">
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination