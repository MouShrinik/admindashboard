const Pagination = ({
  currentPage,
  totalPages,
  next,
  prev,
  pageNumbers,
  handlePageChange,
}) => {
  return (
    <div className="pt-4 px-2 dark:bg-gray-950">
      <nav
        className="flex items-center justify-between pt-4 pb-4 gap-2
        min-[320px]:flex-col min-[320px]:text-start"
        aria-label="Table navigation"
      >
        <span
          className="text-sm font-normal text-gray-500 dark:text-gray-400
      mb-1 md:mb-0 w-full block md:inline md:w-auto px-2 sm:flex-col"
        >
          Showing{" "}
          <span className="font-semibold text-gray-700 dark:text-blue-500">
            {currentPage}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {totalPages}
          </span>
        </span>

        <ul className="inline-flex flex-wrap -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              disabled={currentPage === 1}
              onClick={prev}
              className="previous-page flex items-center justify-center 
           h-8 ms-0 leading-tight py-2.5 px-5 me-2 mb-2 text-sm font-medium
            text-blue-700 focus:outline-none focus:ring-4
           rounded-lg border border-blue-700 hover:bg-blue-800
          hover:text-white focus:z-10 focus:ring-blue-300 
           disabled:cursor-not-allowed disabled:border-none
          disabled:bg-gray-400 disabled:text-gray-700 dark:text-blue-500
          dark:border-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800 dark:disabled:hover:bg-gray-500
           dark:disabled:bg-gray-500
          "
            >
              Previous
            </button>
          </li>

          <li>
            <button
              onClick={() => handlePageChange(1)}
              className="first-page flex items-center justify-center 
         h-8 ms-0 leading-tight py-2.5 px-5 me-2 mb-2 text-sm font-medium
          text-blue-700 focus:outline-none focus:ring-4
         rounded-lg border border-blue-700
        hover:text-gray-700 focus:z-10 focus:ring-blue-300 
          dark:text-blue-500 dark:hover:text-white
        dark:border-blue-500 dark:focus:ring-blue-800 
        "
            >
              {"<<"}
            </button>
          </li>

          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => handlePageChange(number)}
                className={`${
                  number === currentPage
                    ? "bg-blue-800 text-white dark:text-white !important"
                    : ""
                }
              'flex items-center justify-center
              h-8 ms-0 leading-tight py-1.3 px-5 me-2 mb-2 text-sm font-medium
                focus:outline-none focus:ring-2 text-blue-600
              rounded-lg border border-blue-700 hover:bg-blue-800
             hover:text-white focus:z-10 focus:ring-blue-300 
               dark:text-blue-500
             dark:border-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800'
                `}
              >
                {number}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="last-page flex items-center justify-center 
         h-8 ms-0 leading-tight py-2.5 px-5 me-2 mb-2 text-sm font-medium
          text-blue-700 focus:outline-none focus:ring-4
         rounded-lg border border-blue-700 
        hover:text-white focus:z-10 focus:ring-blue-300 
          dark:text-blue-500
        dark:border-blue-500 dark:focus:ring-blue-800 
        "
            >
              {">>"}
            </button>
          </li>

          <li>
            <button
              disabled={currentPage === totalPages}
              onClick={next}
              href="#"
              className="next-page flex items-center justify-center 
            h-8 ms-0 leading-tight py-2.5 px-5 me-2 mb-2 text-sm font-medium
             text-blue-700 focus:outline-none focus:ring-4
            rounded-lg border border-blue-700 hover:bg-blue-800
           hover:text-white focus:z-10 focus:ring-blue-300 
            disabled:cursor-not-allowed
           disabled:bg-gray-400 disabled:text-gray-700 disabled:border-none dark:text-blue-500
           dark:border-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800 dark:disabled:hover:bg-gray-500 dark:disabled:bg-gray-500"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
