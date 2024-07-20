import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const Pagination = (props) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className=" text-white p-4 text-center flex justify-center items-center">
      {props.currentPage > 1 && (
        <button
          className={`bg-[#00A3FF] hover:bg-color-danger text-white transition-all p-2 rounded-lg`}
          onClick={() => props.prevPage()}
        >
          {" "}
          <FaCaretLeft size={20} />
        </button>
      )}

      <span>
        <span className="ml-3">Page {props.currentPage}</span>
        <span className="mr-3"> of {pages.length}</span>
      </span>
      {props.currentPage < pages.length && (
        <button
          className={`bg-[#00A3FF] hover:bg-color-danger text-white transition-all p-2 rounded-lg `}
          onClick={() => props.nextPage()}
        >
          {" "}
          <FaCaretRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
