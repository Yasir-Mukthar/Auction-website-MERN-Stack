import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { Link } from "react-router-dom";
import {
  getAllCategories,
  deleteCategory,
  getCategoriesMoreDetail,
  getTopCategories,
} from "../../store/category/categorySlice.js";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



const AllCategories = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const [filterField, setFilterField] = useState("name");
  const { categories, categoriesDetail,topCategories } = useSelector(
    (state) => state.category
  );
  console.log(topCategories);
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter(filterField, value);
    setFilterInput(value);
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id)).then(() => {
      dispatch(getAllCategories());
      dispatch(getCategoriesMoreDetail());
    });
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Picture",
        accessor: "imageUrl",
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
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row: { original } }) => (
          <div>
            <button onClick={() => handleDeleteCategory(original.actions)}>
              Delete
            </button>
            <Link to={`/admin/categories/edit/${original.actions}`}>Edit</Link>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getCategoriesMoreDetail());
    dispatch(getTopCategories())
  }, []);
  console.log(categoriesDetail);
  const data = React.useMemo(
    () =>
      Array.isArray(categories?.data)
        ? categories.data.map((category) => ({
            name: category.name,
            description: category.description,
            imageUrl: category.imageUrl,
            actions: category._id,
          }))
        : [],
    [categories]
  );
  console.log("data", data);

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
  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // Set the document's title
        pdf.setProperties({
          title: 'All Categories'
        });
        // Save the PDF
        pdf.save("AllCategories.pdf");
      });
  }

  return (
    <div className="text-black" id="divToPrint">
            <button onClick={printDocument} className="bg-red-500 p-4">Export to PDF</button>

      <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-2xl font-bold text-black">All Categories</h1>
        <div className="flex justify-between">
          <div>
            <h3>Total Categories: {categoriesDetail?.totalCategories}</h3>

            <h3 className="border p-5">
              Most Populated Category:{" "}
              {categoriesDetail?.mostPopulatedCategory[0]?.name}
              <h3>
                Products: {categoriesDetail?.mostPopulatedCategory[0]?.products}
              </h3>
            </h3>
            <h3 className="border p-5">
              Recently added Category:{" "}
              {categoriesDetail?.recentlyAddedCategory?.name}
            </h3>
            {/* <h3>
              Most Populated Category: {categoriesDetail?.mostPopulatedCategory}
            </h3>
            <h3>
              Least Populated Category: {categoriesDetail?.leastPopulatedCategory}
            </h3>
            <h3>
              Recently Added Category: {categoriesDetail?.recentlyAddedCategory}
            </h3> */}
          </div>
        </div>
      </div>

      <>
        <div className="flex justify-between">
          <div>
            <select
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
            >
              <option value="name">Select a field</option>
              <option value="name">Name</option>
              <option value="description">Description</option>
            </select>
            <input
              value={filterInput}
              onChange={handleFilterChange}
              placeholder={"Search name"}
            />
          </div>
          <div>
            <Link
              className="text-white border p-2 rounded-md bg-blue-400"
              to={`/admin/categories/create-category`}
            >
              Create Category
            </Link>
          </div>
        </div>
        <table {...getTableProps()} className="text-white bg-black">
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={headerGroupIndex}
                className="bg-gray-400 "
              >
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={columnIndex}
                    className="px-4"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                <tr
                  {...rowProps}
                  {...row.getRowProps()}
                  key={row.id}
                  className="hover:bg-gray-600"
                >
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={cellIndex}
                        className="px-4"
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
        <div className="flex justify-center my-4 items-center">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`bg-blue-500 px-4 py-2 text-white mr-2 rounded-lg ${
              !canPreviousPage ? "bg-blue-200" : ""
            }`}
          >
            Prev
          </button>
          <span className="text-black">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageCount}{" "}
            </strong>
            {"  "}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`bg-blue-500 px-4 py-2 text-white rounded-lg ${
              !canNextPage ? "bg-blue-200" : ""
            }`}
          >
            Next
          </button>

          <button
            className={`bg-blue-500 p-2 rounded-lg mx-2 text-white ${
              pageIndex === 0 ? "bg-blue-200" : ""
            }`}
            onClick={() => gotoPage(0)}
            disabled={pageIndex === 0 ? true : false}
          >
            First{" "}
          </button>
          <button
            className={`bg-blue-500 p-2 rounded-lg text-white ${
              pageIndex === pageCount - 1 ? "bg-blue-200" : ""
            }`}
            onClick={() => gotoPage(pageCount - 1)}
          >
            Last{" "}
          </button>

          <select
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
      </>
      {
        <div className="bg-green-400">
          <h1>Top Categories</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {topCategories?.map((category, index) => (
                <tr key={index}>
                  <td>{category.name}</td>
                  <td>{category.products}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default AllCategories;
