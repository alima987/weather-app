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
      <ul className="flex justify-center items-center mt-4">
        <li className="mr-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            &lt; 
          </button>
        </li>
        <li className="ml-2">
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
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