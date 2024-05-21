import React,{useEffect , useState,useMemo} from 'react'
import {useSelector , useDispatch} from "react-redux"
import { getAllUsers } from '../../store/user/userSlice'
import { useTable, useSortBy, usePagination,useFilters } from "react-table";
import { Link } from 'react-router-dom';



const AllUsers = () => {
    const [users , setUsers] = useState([])
    const dispatch = useDispatch()
    const {allUser,reset,success} = useSelector(state => state.user)
    const [filterInput, setFilterInput] = useState("");
    const [filterField, setFilterField] = useState("name");

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
            accessor: "profilePicture",
            Cell: ({ value }) => <img src={value} alt="Profile" style={{ width: '50px', height: '50px' }} />

          },
          {
            Header: "Name",
            accessor: "fullName",
          },
            {
                Header: "Type",
                accessor: "userType",
            },
            {
                Header: "Verified",
                accessor: "paymentVerified",
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row: { original } }) => (
                  <div>
                    <Link to={`/admin/users/profile/${original.actions}`}>View</Link>
                    <button onClick={() => handleDeleteUser(original.actions)}>Delete</button>
                    <Link
                        to={`/admin/users/edit/${original.actions}`}
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
    }
    ,[])
   
    const data = React.useMemo(() => 
        Array.isArray(allUser?.data) ? allUser.data.map((user) => ({
          profilePicture: user.profilePicture,
          fullName: user.fullName,
            userType: user.userType,
            paymentVerified: user.paymentVerified===false ? "Unverified" : "Verified",
            actions: user._id,
        })) : [],
        [allUser]
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
  <option value="fullName">Select a field</option>
  <option  value="fullName">Name</option>
    <option value="userType">Type</option>
    <option value="paymentVerified">Verified</option>

   


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
              {headerGroup.headers.map((column, i) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={i}
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
  {page.map((row, i) => {
    prepareRow(row);
    const rowProps = row.getRowProps();

    return (
      <tr {...rowProps} key={i} className="hover:bg-gray-600">
        {row.cells.map((cell, j) => {
          const cellProps = cell.getCellProps();

          return (
            <td {...cellProps} key={`${i}-${j}`}>
              {cell.render("Cell")}
            </td>
          );
        })}
      </tr>
    );
  })}
</tbody>
        {/* <tbody {...getTableBodyProps()}>
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
                        const cellProps = cell.getCellProps();

                  return (
                    <td
                    {...cellProps}
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
        </tbody> */}
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

export default AllUsers