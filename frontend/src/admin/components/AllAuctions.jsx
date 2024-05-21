import React,{useEffect , useState,useMemo} from 'react'
import {useSelector , useDispatch} from "react-redux"
import { getAllUsers } from '../../store/user/userSlice'
import { useTable, useSortBy, usePagination,useFilters } from "react-table";
import { Link } from 'react-router-dom';
import { getAllAuctions } from "../../store/auction/auctionSlice";



const AllAuctions = () => {
    const dispatch = useDispatch()
    const [filterInput, setFilterInput] = useState("");
    const [filterField, setFilterField] = useState("name");
    const { auction, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auction
    );
    console.log(auction);
    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter(filterField, value); // Use the selected field
        setFilterInput(value);
      };
    //   const data = React.useMemo(
    //     () => [
    //       {
    //         id: 1,
    //         name: "yasir",
    //         rollno: 20,
    //         email: "yasir@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 2,
    //         name: "faisal",
    //         rollno: 43,
    //         email: "yasir@gmail.com",
    //         phone: "1234567890",
    //       },
    
    //       {
    //         id: 3,
    //         name: "hassan",
    //         rollno: 50,
    //         email: "yasir@gmail.com",
    //         phone: "1234567890",
    //       },
    
    //       {
    //         id: 4,
    //         name: "nasir",
    //         rollno: 40,
    //         email: "nasir@gmail.com",
    //         phone: "1234567890",
    //       },
    
    //       {
    //         id: 5,
    //         name: "ali",
    //         rollno: 56,
    //         email: "ali@gmail.com",
    //         phone: "1234567890",
    //       },
    
    //       {
    //         id: 6,
    //         name: "mukhtar",
    //         rollno: 22,
    //         email: "mukhtar@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 7,
    //         name: "tariq",
    //         rollno: 54,
    //         email: "tariq@gmail.com",
    //         phone: "1234567890",
    //       },
    
    //       {
    //         id: 8,
    //         name: "hanzala",
    //         rollno: 11,
    //         email: "hanzala@gmail.com",
    //         phone: "1234567890",
    //       },
    
    //       {
    //         id: 9,
    //         name: "kashif",
    //         rollno: 44,
    //         email: "kashif@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 10,
    //         name: "danyal",
    //         rollno: 33,
    //         email: "danyal@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 11,
    //         name: "raiz",
    //         rollno: 20,
    //         email: "raiz@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 12,
    //         name: "salman",
    //         rollno: 36,
    //         email: "salman@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 13,
    //         name: "yasir",
    //         rollno: 66,
    //         email: "yasir@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 14,
    //         name: "imran",
    //         rollno: 32,
    //         email: "imran@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 15,
    //         name: "waqas",
    //         rollno: 10,
    //         email: "waqas@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 16,
    //         name: "azhar",
    //         rollno: 30,
    //         email: "azhar@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 17,
    //         name: "yasir",
    //         rollno: 29,
    //         email: "yasir@gmail.com",
    //         phone: "1234567890",
    //       },
    //       {
    //         id: 18,
    //         name: "yasir",
    //         rollno: 23,
    //         email: "yasir@gmail.com",
    //         phone: "1234567890",
    //       },
    //     ],
    //     []
    //   );
   
    // const columns =  [
    //       {
    //         Header: "Picture",
    //         accessor: "profilePicture",
    //       },
    //       {
    //         Header: "Name",
    //         accessor: "fullName",
    //       },
    //       {
    //         Header: "Type",
    //         accessor: "userType",
    //       },
    //       {
    //         Header: "Verified",
    //         accessor: "paymentVerified",
    //       }
    //     ]
    // const data = React.useMemo(() => allUser, [allUser]);    
    const handleDeleteUser=()=>{
        alert("dele")
    }
    const columns = React.useMemo(
        () => [
           
          {
            Header: "Picture",
            accessor: "picture",
            Cell: ({ value }) => <img src={value} alt="Profile" style={{ width: '50px', height: '50px' }} />

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
        },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row: { original } }) => (
                  <div>
                    <Link to={`/admin/auctions/view/${original.actions}`}>View</Link>
                    <button onClick={() => handleDeleteUser(original.actions)}>Delete</button>
                    <Link
                        to={`/admin/auctions/edit/${original.actions}`}
                    >
                    Edit
                    </Link>

                    {/* ...other buttons */}
                  </div>
                ),
              },
        ],
        []
      );   

    useEffect(()=>{
        dispatch(getAllUsers())
        dispatch(getAllAuctions())
    }
    ,[])
   
    const data = React.useMemo(() => 
        Array.isArray(auction) ? auction.map((auc) => ({
          picture: auc?.image,
          name: auc?.name,
          category: auc?.category?.name || "---",
          seller: auc?.seller?.fullName || "---",
          location: auc?.location?.name,
          status: auc?.status,
          startingPrice: auc?.startingPrice,
          startTime:auc?.startTime,
          endTime:auc?.endTime,
          paymentStatus: auc?.paid===false ? "UnPaid" : "Paid",
          actions: auc?._id,
        })) : [],
        [auction]
      );
    console.log('data',data)

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
        state: { pageIndex,pageSize },
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
        usePagination,
        
      );

  return (
    <div className='text-black'>
     <>
    <select value={filterField} onChange={e => setFilterField(e.target.value)}>
  <option value="name">Select a field</option>
  <option  value="name">Name</option>
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
  value={filterInput}
  onChange={handleFilterChange}
  placeholder={"Search name"}
/>
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
  onChange={e => {
    setPageSize(Number(e.target.value));
  }}
>
  {[8, 12,16,20,24,28,32,36,40].map(pageSize => (
    <option key={pageSize} value={pageSize}>
      Show {pageSize}
    </option>
  ))}
</select>
      </div>
    </>

    </div>
  )
}

export default AllAuctions