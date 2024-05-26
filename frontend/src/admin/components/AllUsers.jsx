import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers,deleteUserById } from "../../store/user/userSlice";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { Link } from "react-router-dom"
import {Chart as ChartJS, defaults} from "chart.js/auto"
import { Bar, Line  , Doughnut } from 'react-chartjs-2'


const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { allUser, reset, success } = useSelector((state) => state.user);
  const [filterInput, setFilterInput] = useState("");
  const [filterField, setFilterField] = useState("name");

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter(filterField, value); // Use the selected field
    setFilterInput(value);
  };


  
  const handleDeleteUser = (id) => {
    dispatch(deleteUserById(id)).then(() => {
      dispatch(getAllUsers());
    });
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Picture",
        accessor: "profilePicture",
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
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row: { original } }) => (
          <div>
            <Link to={`/admin/users/profile/${original.actions}`}>View</Link>
            <button onClick={() => handleDeleteUser(original.actions)}>
              Delete
            </button>
            <Link to={`/admin/users/edit/${original.actions}`}>Edit</Link>

            {/* ...other buttons */}
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const data = React.useMemo(
    () =>
      Array.isArray(allUser?.data)
        ? allUser.data.map((user) => ({
            profilePicture: user.profilePicture,
            fullName: user.fullName,
            userType: user.userType,
            paymentVerified:
              user.paymentVerified === false ? "Unverified" : "Verified",
            actions: user._id,
          }))
        : [],
    [allUser]
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

 const totalBuyers =allUser?.data?.filter((user) => user.userType === "user").length;
 const totalVerifiedUsers=allUser?.data?.filter((user) => user.paymentVerified === true).length;
  const totalSellers=allUser?.data?.filter((user) => user.userType === "seller").length;
  // const totalAdmins=allUser?.data?.filter((user) => user.userType === "admin").length;

  const userCreatedAt=new Array(6).fill(0);
  allUser?.data?.forEach((user)=> {
    const month=new Date(user.createdAt).getMonth();
    userCreatedAt[month]=userCreatedAt[month]+1;
  })
   
  console.log("userCreatedAt",userCreatedAt)



  const cities = [
    { city: 'New York' },
    { city: 'Los Angeles' },
    { city: 'Chicago' },
    { city: 'Houston' },
    { city: 'Phoenix' },
    { city: 'Philadelphia' },
    // More users here
    { city: 'Chicago' },
    { city: 'Houston' },
    { city: 'Chicago' },
    { city: 'Houston' },
    { city: 'Phoenix' },
    { city: 'Los Angeles' },
    { city: 'Chicago' },
    { city: 'Houston' },
    { city: 'Phoenix' },
    { city: 'Philadelphia' },
    // More users here
  ];

  // Count the number of users from each city
const cityCounts = cities.reduce((counts, user) => {
  counts[user.city] = (counts[user.city] || 0) + 1;
  return counts;
}, {});

// Get the top cities
const topCities = Object.entries(cityCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([city, count]) => ({ city, count }));

  return (
    <div className="text-black">
      <div className="text-white flex gap-4 m-5">
        <div className="border border-white p-2">
          <h1 className="text-2xl font-bold">All Users</h1>
          <div >
            {allUser?.data?.length}
          </div>
        </div>
        <div className="border border-white p-4">
          <div>
            Sellers
            </div>
            {totalSellers}
        </div>
        <div className="border border-white p-4">
          <div>
            New Users
            <p className="text-[9px]">within this week</p>
            </div>
            {allUser?.data?.filter((user) => 
            new Date(user.createdAt).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000
            ).length}





        </div>
        <div className="border border-white p-4">
          <div>
            Buyers
            </div>
            {totalBuyers}
        </div>
        <div className="border border-white p-4">
          <div>
            Verified Users
            </div>
            {totalVerifiedUsers}
        </div>
      </div>
       <div className='h-[400px] bg-slate-700  border border-white m-2 p-3 flex'>
        <Doughnut
                data={ {
                    labels: ["Sellers", 'Buyers'],
                    datasets: [
                      {
                        data: [totalSellers, totalBuyers], 
                        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)'],
                      },
                    ],
                  }}
                height={50}
                width={100}
                options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'User Base',
                      },
                    },
                  }
                }
            />
             <Line
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [
                      {
                        label: 'Total Users',
                        data: userCreatedAt, // replace this with your data
                        fill: false,
                        backgroundColor: 'rgb(75, 192, 192)',
                        borderColor: 'rgba(75, 192, 192, 0.2)',
                      },
                    ],
                }}
                height={100}
                width={200}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                  }
                   
                }

            />
        </div>
        <div className='h-[400px] bg-slate-700  border border-white m-2 p-3 flex'>
          <Bar 
          data={{
            labels: topCities.map(city => city.city),
            datasets: [
              {
                label: 'No of Users',
                data: topCities.map(city => city.count),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          }}
          height={20}
          width={50}
          options={{
            indexAxis: 'y',
            ticks: {
              stepSize: 1,
            },
            
    
            responsive: true,
            plugins: {
             
              title: {
                display: true,
                text: 'Top Cities',
              },
            },
          }}



          />
        </div>
      <>
        <select
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
        >
          <option value="fullName">Select a field</option>
          <option value="fullName">Name</option>
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
    </div>
  );
};

export default AllUsers;
