import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
// import { paginateWithDots } from "../../utils/services";
export default function Pagination({
  currentPage,
  pageNumbers,
  next,
  setCurrentPage,
}) {
  const handleChangingPage = (page) => {
    if (!isNaN(page) && page > 0 && page <= pageNumbers) {
      setCurrentPage(page);
    } else return;
  };
  return (
    <div className="mt-8 px-4 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className=" flex-1 flex items-center  justify-center sm:justify-center md:justify-between lg:justify-between">
        <div
          onClick={() => handleChangingPage(currentPage - 1)}
          className="cursor-pointer hover:text-indigo-600 sm:hidden md:flex lg:flex hidden flex-row w-24 items-center justify-between opacity-60"
        >
          <ArrowLeftIcon className="h-5" />
          <div>Précedent</div>
        </div>

        <div>
          <nav
            className="relative z-0 inline-flex  -space-x-px"
            aria-label="Pagination"
          >
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {/* {paginateWithDots(currentPage, 1, pageNumbers).map(
              (page, index) => (
                <span
                  key={page + index}
                  onClick={() => handleChangingPage(page)}
                  className={
                    (!isNaN(page) && "cursor-pointer ") +
                    "md:inline-flex relative items-center px-4 py-2 text-sm font-medium " +
                    (page === currentPage
                      ? "border-t-2 border-indigo-500 text-indigo-600"
                      : "text-gray-500 hover:bg-gray-50")
                  }
                >
                  {page}
                </span>
              )
            )} */}
            <span
              aria-current="page"
              className="  border-t-2 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 text-sm font-medium"
            >
              1
            </span>
            <span className="  text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2  text-sm font-medium">
              2
            </span>
            <span className="  text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 text-sm font-medium">
              3
            </span>
            <span className="relative inline-flex items-center px-4 py-2    text-sm font-medium text-gray-700">
              ...
            </span>
            <span className="  text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2  text-sm font-medium">
              8
            </span>
            <span className="  text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2  text-sm font-medium">
              9
            </span>
            <span className="  text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2  text-sm font-medium">
              10
            </span>
          </nav>
        </div>
        <div
          onClick={() => handleChangingPage(currentPage + 1)}
          className="sm:hidden md:flex lg:flex hidden flex-row w-20 items-center justify-between cursor-pointer hover:text-indigo-600 opacity-60"
        >
          <div>Suivant</div>
          <ArrowRightIcon className="h-5" />
        </div>
      </div>
    </div>
  );
}
