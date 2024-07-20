
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

const Pagination = (props) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex justify-center items-center border-t border-border-info-color pt-4  my-10 md:button:px-3 md:button:py-2 button:px-2 button:py-1 button:rounded-lg ">
      {props.currentPage > 1 && (
        <button
          onClick={() => props.prevPage()}
          className="bg-[#00A3FF] hover:bg-color-danger text-white transition-all"
        >
          <FaCaretLeft size={18} />
        </button>
      )}

      <span>
        <span className="ml-3">Page {props.currentPage}</span>
        <span className="mr-3"> of {pages.length}</span>
      </span>
      {props.currentPage < pages.length && (
        <button
          onClick={() => props.nextPage()}
          className="bg-[#00A3FF] hover:bg-color-danger text-white transition-all"
        >
          <FaCaretRight size={18} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
