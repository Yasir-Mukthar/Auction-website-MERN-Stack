import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../store/user/userSlice";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { Link } from "react-router-dom";
import {
  deleteAuctionByAdminById,
  getAllAuctions,
} from "../../store/auction/auctionSlice";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import {
  FaCaretUp,
  FaCaretDown,
  FaCaretRight,
  FaCaretLeft,
  FaEye,
  FaRegEdit,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const AllAuctions = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const [filterField, setFilterField] = useState("name");
  const { auction, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auction
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter(filterField, value); // Use the selected field
    setFilterInput(value);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteAuctionByAdminById(id)).then(() => {
      dispatch(getAllAuctions());
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Picture",
        accessor: "picture",
        Cell: ({ value }) => (
          <img
            src={value}
            alt="Profile"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Seller",
        accessor: "seller",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`py-1 px-2 border capitalize rounded-lg ${
              value === "upcoming"
                ? "text-orange-500 border-orange-500"
                : value === "active"
                ? "text-green-500 border-green-500"
                : ""}`
            }
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Bid",
        accessor: "startingPrice",
      },
      {
        Header: "Start Time",
        accessor: "startTime",
      },
      {
        Header: "End Time",
        accessor: "endTime",
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        Cell: ({ value, row: { original } }) => (
          <span className={original.statusClass}>{value}</span>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row: { original } }) => (
          <div className="flex gap-2">
            <Link to={`/admin/auctions/view/${original.actions}`}>
              <FaEye
                size={38}
                className="inline mt-[-3px] text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color  px-2 py-[5px] transition-all"
              />
            </Link>
            <button onClick={() => handleDeleteUser(original.actions)}>
              <MdDeleteForever
                size={38}
                className=" inline mt-[-3px] text-color-danger hover:text-white hover:bg-color-danger rounded-lg border-2 border-color-danger  px-[6px] py-[3px] transition-all"
              />
            </button>
            {original.status === "upcoming" && (
              <Link to={`/admin/auctions/edit/${original.actions}`}>
                <FaRegEdit
                  size={38}
                  className="inline mt-[-3px] text-theme-color hover:text-white hover:bg-theme-color rounded-lg border-2 border-theme-color px-2 py-[5px] transition-all"
                />
              </Link>
            )}
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllAuctions());
  }, [dispatch]);

  const data = useMemo(
    () =>
      Array.isArray(auction)
        ? auction.map((auc) => {
            const paymentStatus = auc?.paid === false ? "UnPaid" : "Paid";
            const statusClass =
              auc?.paid === false
                ? "text-color-danger px-2 py-1 border border-color-danger rounded-full "
                : " text-color-success px-2 py-1 border border-color-success  rounded-full";

            return {
              picture: auc?.image,
              name: auc?.name,
              category: auc?.category?.name || "---",
              seller: auc?.seller?.fullName || "---",
              location: auc?.location?.name,
              status: auc?.status,
              startingPrice: auc?.startingPrice,
              startTime: new Date(auc?.startTime).toLocaleString(),
              endTime: new Date(auc?.endTime).toLocaleString(),
              paymentStatus: paymentStatus,
              statusClass: statusClass,
              actions: auc?._id,
            };
          })
        : [],
    [auction]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize },
    pageCount,
    gotoPage,
    setPageSize,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 8 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="px-7 py-4 w-full bg-theme-bg text-slate-300 rounded-2xl ">
        <h2 className=" text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5 ">
          All Auctions
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="outline-none bg-theme-bg2 rounded-xl px-3 py-3 cursor-pointer border border-border-info-color focus:border-theme-color  transition-all"
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
          >
            <option value="name">Select a Field</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="seller">Seller</option>
            <option value="location">Location</option>
            <option value="status">Status</option>
            <option value="startingPrice">Bid</option>
            <option value="startTime">Start Time</option>
            <option value="endTime">End Time</option>
            <option value="paymentStatus">Payment Status</option>
          </select>
          <input
            className="outline-none w-full md:w-[200px] bg-theme-bg2 rounded-xl px-3 py-3 border border-border-info-color focus:border-theme-color transition-all"
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search Name"}
          />
        </div>
        <div className="overflow-auto px-4 rounded-2xl border border-border-info-color mt-4 max-h-[500px]">
          <table
            {...getTableProps()}
            className="text-left whitespace-nowrap w-full border-separate border-spacing-x-0 border-spacing-y-4 "
          >
            <thead className="sticky top-0 bg-theme-bg table-header-group">
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <tr
                  className="table-row"
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroupIndex}
                >
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={columnIndex}
                      className="p-2 pr-5 select-none first:rounded-l-lg last:rounded-r-lg border-b border-border-info-color  hover:bg-theme-bg2  transition-all"
                    >
                      <div className="flex gap-4">
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaCaretDown size={24} className="mt-[-2px]" />
                            ) : (
                              <FaCaretUp size={24} />
                            )
                          ) : null}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="table-row-group" {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                const rowProps = row.getRowProps();
                return (
                  <tr
                    {...rowProps}
                    {...row.getRowProps()}
                    key={row.id}
                    className=" border "
                  >
                    {row.cells.map((cell, cellIndex) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={cellIndex}
                          className="pl-2 pr-5 border-b border-border-info-color pb-2"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 my-4 items-center md:button:px-4 md:button:py-2 button:px-2 button:py-1 button:rounded-lg  ">
          <div className="flex justify-center items-center gap-4">
            <button
              className={`bg-[#00A3FF] hover:bg-color-danger text-white transition-all ${
                pageIndex === 0 ? "bg-gray-500 hover:bg-gray-500" : ""
              }`}
              onClick={() => gotoPage(0)}
              disabled={pageIndex === 0 ? true : false}
            >
              <MdSkipPrevious size={18} />{" "}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`bg-[#00A3FF] hover:bg-color-danger text-white transition-all ${
                !canPreviousPage ? "bg-gray-500 hover:bg-gray-500" : ""
              }`}
            >
              <FaCaretLeft size={18} />
            </button>
            <span className="text-slate-300">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageCount}{" "}
              </strong>
              {"  "}
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`bg-[#00A3FF] hover:bg-color-danger text-white transition-all ${
                !canNextPage ? "bg-gray-500 hover:bg-gray-500" : ""
              }`}
            >
              <FaCaretRight size={18} />
            </button>
            <button
              className={`bg-[#00A3FF] hover:bg-color-danger text-white transition-all ${
                pageIndex === pageCount - 1
                  ? "bg-gray-500 hover:bg-gray-500"
                  : ""
              }`}
              onClick={() => gotoPage(pageCount - 1)}
            >
              <MdSkipNext size={18} />{" "}
            </button>
          </div>

          <select
            className="outline-none hidden md:block bg-theme-bg2 rounded-xl px-4 py-3 cursor-pointer border border-border-info-color focus:border-theme-color  transition-all "
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[8, 12, 16, 20, 24, 28, 32, 36, 40].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default AllAuctions;
