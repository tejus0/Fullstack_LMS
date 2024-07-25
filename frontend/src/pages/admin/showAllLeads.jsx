import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import Navbar from "../../component/navbar/Navbar";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterDrawer from "../../component/FilterDrawer";
import { useDispatch, useSelector } from 'react-redux'


import { FaSort, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { updatePage } from "../../redux/dataSlice";

const    ShowAllleads = () => {

  const dispatch = useDispatch();

  const [columns, setColumns] = useState([
    { visible: true, label: 'name' },
    { visible: true, label: 'registeredOn' },
    { visible: true, label: 'neetScore' },
    { visible: true, label: 'state' },
    { visible: true, label: 'course' },
    { visible: true, label: 'contactNo' },
    { visible: true, label: 'leadStatus' },
    { visible: true, label: 'counsillor' },
  ]);

  const handleSelectRow = (key) => {
    setColumns((prevColumns) =>
      prevColumns.map(col =>
        col.label === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const baseUrl = import.meta.env.VITE_API; 
  const [users, setUsers] = useState([]);

  console.log(users);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  // const [page, setPage] = useState(0);

  const page = useSelector((state) => state.data.page)
  console.log(page);
  const [rowsPerPage, setRowsPerPage] = useState(10); // change here for number of rows per page
  const navigate = useNavigate();

  const [search, setsearch] = useState("");
  const [SearchBy, setSearchBy] = useState("name");
  const [filter, setfilter] = useState([]);

  const [leadStatusFilter, setLeadStatusFilter] = useState("All");
  const [isLeadStatusDropdownOpen, setIsLeadStatusDropdownOpen] =
    useState(false);

  const [counsellors, setCounsellors] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,

    };
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    return `${formattedDate}, ${formattedTime}`;
  };



  const getCounsellorData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/getCounsellorInfo`);
      setCounsellors(res.data.data);
    } catch (error) {
      console.log(error);
      setCounsellors([]);
    }
  };

  useEffect(() => {
    getCounsellorData();
  }, []);

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;

        }
        return 0;
      });
    }

    return sortableUsers;
  }, [users, sortConfig]);




  const handleChangePage = (event, newPage) => {
    dispatch(updatePage(newPage));
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    navigate(`/login`);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handelChange = (e) => {
    setsearch(e.target.value);

    if (e.target.value === "") {
      setUsers(filter);
    } else {
      console.log("ok");
      setUsers(
        sortedUsers.filter((item) =>
          item[SearchBy].toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const filteredUsers = React.useMemo(() => {
    if (leadStatusFilter === "All") {
      return sortedUsers;
    } else {
      return sortedUsers.filter((user) => {
        const latestRemark = user.remarks.FollowUp3.length
          ? user.remarks.FollowUp3[user.remarks.FollowUp3.length - 1].subject
          : user.remarks.FollowUp2.length
            ? user.remarks.FollowUp2[user.remarks.FollowUp2.length - 1].subject
            : user.remarks.FollowUp1.length
              ? user.remarks.FollowUp1[user.remarks.FollowUp1.length - 1].subject
              : "No Remarks";
        const leadStatus = `${latestRemark}`;
        return leadStatus
          .toLowerCase()
          .includes(leadStatusFilter.toLowerCase());
      });
    }
  }, [sortedUsers, leadStatusFilter]);

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const paginationDisabled = paginatedUsers.some(
    (item) => item.remarks.length === 20
  );

  const toggleLeadStatusDropdown = () => {
    setIsLeadStatusDropdownOpen((prev) => !prev);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };



  const [len, setlen] = useState()
  // console.log(users,"uders in all leads"  );

  useEffect(() => {
    console.log(page, "page in all leads");

    const fetchData = async () => {
      //  this is wrong

      //   const response = await axios.get(${baseUrl}/getCounsellorDataList/${id}).catch(err => {
      //     console.log(err, "error");
      //   });
      const response = await axios.get(`${baseUrl}/dashboard?page=${page + 1}&limit=10`).catch((err) => {
        console.log(err, "error");
      });

      setUsers(response.data.data);
      setfilter(response.data.data);
      setlen(response.data.length)
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <Box className="flex">
        <Navbar />
        {/* <div>
                    <Tooltip title="Delete">
                        <IconButton onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>


                    <div>

                        <IconButton onClick={toggleDrawer(true)}>
                            <FilterAltIcon />
                        </IconButton>
                        <FilterDrawer
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                            searchBy={SearchBy}
                            setSearchBy={setSearchBy}
                            onChange={handelChange}
                            search={search}
                            columns={columns}
                            handleSelectRow={handleSelectRow}
                        />

                    </div>
                </div> */}
        <div className="w-full p-4 relative overflow-x-auto shadow-md sm:rounded-lg sm:ml-20 ">
          <div className="flex justify-end">
            <div className="flex justify-center mb-3 ">

              <select
                value={SearchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="border-2 border-black border-r-0 w-[100px]"
              >
                <option value="name">Name</option>
                <option value="neetScore">neetScore</option>
                <option value="state">state</option>
                <option value="courseSelected">courseSelected</option>
                <option value="contactNumber">contactNumber</option>
              </select>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handelChange}
              />
            </div>
            <div className="flex justify-end items-center">
              <Tooltip title="Delete">
                <IconButton onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>


              <div>

                <IconButton onClick={toggleDrawer(true)}>
                  <FilterAltIcon />
                </IconButton>
                <FilterDrawer
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                  searchBy={SearchBy}
                  setSearchBy={setSearchBy}
                  onChange={handelChange}
                  search={search}
                  columns={columns}
                  handleSelectRow={handleSelectRow}
                />

              </div>
            </div>
          </div>

          <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {/* <tr>
                <th scope="col" className="px-6 py-3">
                  S. No.
                </th>
                <th scope="col" className="px-6 py-3 ">
                  {" "}
                  <div className="flex gap-2 items-center">
                    {" "}
                    Name{" "}
                    <FaSort
                      onClick={() => handleSort("name")}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />{" "}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 ">
                <div className="flex gap-2 items-center">
                  Registered ON{" "}
                  <FaSort
                    onClick={() => handleSort("createdAt")}
                    style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                  />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 ">
                <div className="flex items-center">
                  Neet Score{" "}
                  <FaSort
                    onClick={() => handleSort("neetScore")}
                    style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                  />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 ">
                  <div className="flex items-center">
                    Slot Date
                    <FaSort
                      onClick={() => handleSort("DateToVisit")}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 ">
                <div className="flex items-center">
                  State{" "}
                  <FaSort
                    onClick={() => handleSort("state")}
                    style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                  />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 ">
                  <div className="flex items-center">

                  Course{" "}
                  <FaSort
                    onClick={() => handleSort("courseSelected")}
                    style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />
                    </div> */}
              {/* <<<<<<< Updated upstream
                    
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> */}

              <tr>
                <th scope="col" className="px-6 py-3">S. No.</th>
                {columns.find(col => col.visible && col.label === "name") && <th scope="col" className="px-6 py-3">Name</th>}
                {columns.find(col => col.visible && col.label === "registeredOn") && <th scope="col" className="px-6 py-3">
                  <div className="flex gap-2 items-center">
                    Registered ON
                    <FaSort
                      onClick={() => handleSort("createdAt")}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />
                  </div>
                </th>}
                {columns.find(col => col.visible && col.label === "neetScore") && <th scope="col" className="px-6 py-3">
                  <div className="flex gap-2 items-center">
                    Neet Score
                    <FaSort
                      onClick={() => handleSort("neetScore")}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />
                  </div>
                </th>}
                {columns.find(col => col.visible && col.label === "DateToVisit") && <th scope="col" className="px-6 py-3">
                  <div className="flex gap-2 items-center">
                    Slot Date
                    <FaSort
                      onClick={() => handleSort("DateToVisit")}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />
                  </div>
                </th>}
                {columns.find(col => col.visible && col.label === "state") && <th scope="col" className="px-6 py-3">
                  <div className="flex gap-2 items-center">
                    State
                    <FaSort
                      onClick={() => handleSort("state")}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />
                  </div></th>}
                {columns.find(col => col.visible && col.label === "course") && <th scope="col" className="px-6 py-3">
                  <div className="flex gap-2 items-center">
                    Course
                    <FaSort
                      onClick={() => handleSort("courseSelected")}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />
                  </div></th>}
                {columns.find(col => col.visible && col.label === "contactNo") && <th scope="col" className="px-6 py-3">
                  <div className="flex gap-2 items-center">
                    Contact No
                    <FaSort
                      onClick={() => handleSort("contactNumber")}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />
                  </div></th>}
                {columns.find(col => col.visible && col.label === "counsillor") && <th scope="col" className="px-6 py-3">
                  <div className="flex gap-2 items-center">
                    Counsellor
                    {/* <FaSort
                      onClick={() => handleSort("DateToVisit")}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    /> */}
                  </div></th>}
                {columns.find(col => col.visible && col.label === "leadStatus") && <th scope="col" className="px-6 py-3">
                  <div className="flex relative gap-2 items-center">
                    Lead Status
                    {isLeadStatusDropdownOpen ? (
                      <FaChevronUp
                        onClick={toggleLeadStatusDropdown}
                        style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                      // </div>
                      />
                    ) : (
                      <FaChevronDown
                        onClick={toggleLeadStatusDropdown}
                        style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                      />
                    )}
                    {isLeadStatusDropdownOpen && (
                      <div className="absolute z-10 top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                        <button
                          onClick={() => {
                            setLeadStatusFilter("All");
                            toggleLeadStatusDropdown();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          All
                        </button>
                        <button
                          onClick={() => {
                            setLeadStatusFilter("Hot Lead");
                            toggleLeadStatusDropdown();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Hot Leads
                        </button>
                        <button
                          onClick={() => {
                            setLeadStatusFilter("Warm");
                            toggleLeadStatusDropdown();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Warm
                        </button>
                        <button
                          onClick={() => {
                            setLeadStatusFilter("Cold Call Done");
                            toggleLeadStatusDropdown();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Cold Call Done
                        </button>
                      </div>
                    )}
                  </div></th>}
                <th scope="col" className="px-6 py-3">
                  <div className="flex gap-2 items-center">
                    Update Status
                    <FaSort
                      onClick={() => handleSort("DateToVisit")}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />
                  </div></th>
                {/* {columns.find(col => col.visible && col.label === 'name') && <th scope="col" className="px-6 py-3">Name</th>}
                                {columns.find(col => col.visible && col.label === 'registeredOn') && <th scope="col" className="px-6 py-3">Registered ON</th>}
                                {columns.find(col => col.visible && col.label === 'neetScore') && <th scope="col" className="px-6 py-3">Neet Score</th>}
                                {columns.find(col => col.visible && col.label === 'state') && <th scope="col" className="px-6 py-3">State</th>}
                                {columns.find(col => col.visible && col.label === 'course') && <th scope="col" className="px-6 py-3">Course</th>}
                                {columns.find(col => col.visible && col.label === 'contactNo') && <th scope="col" className="px-6 py-3">Contact No</th>}
                                {columns.find(col => col.visible && col.label === 'leadStatus') && <th scope="col" className="px-6 py-3">Lead Status</th>} */}
                {/* <th scope="col" className="px-6 py-3">Update Status</th> */}
              </tr>
            </thead>
            <tbody className={`${!users.length ? "h-screen w-screen flex justify-center items-center" : ""}`}>
              {users.length > 0 ? users.map((user, index) => (
                <tr key={user._id} className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      {index + 1}
                    </div>
                  </td>

                  {columns.find(col => col.visible && col.label === 'name') && <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>}
                  {columns.find(col => col.visible && col.label === 'registeredOn') && <td className="px-6 py-4">{formatDate(user.createdAt)}</td>}
                  {columns.find(col => col.visible && col.label === 'neetScore') && <td className="px-6 py-4">{user.neetScore}</td>}
                  {columns.find(col => col.visible && col.label === "DateToVisit") && <td className="px-6 py-4">{formatDate(user.DateToVisit)}</td>}
                  {columns.find(col => col.visible && col.label === 'state') && <td className="px-6 py-4">{user.state}</td>}
                  {columns.find(col => col.visible && col.label === 'course') && <td className="px-6 py-4">{user.courseSelected}</td>}
                  {columns.find(col => col.visible && col.label === 'contactNo') && <td className="px-6 py-4">{user.contactNumber}</td>}

                  {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                                    <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                                    <td className="px-6 py-4">{user.neetScore}</td>
                                    <td className="px-6 py-4">{user.state}</td>
                                    <td className="px-6 py-4">{user.courseSelected}</td>
                                    <td className="px-6 py-4">{user.contactNumber}</td>
                                     */}
                  {columns.find(col => col.visible && col.label === 'counsillor') && <td className="px-6 py-4">{counsellors.find(counsellor => counsellor._id === user.assignedCouns)?.name || "N/A"}</td>}
                  {columns.find(col => col.visible && col.label === 'leadStatus') && <td className="px-6 py-4"> {user.remarks.FollowUp3.length > 0
                    ? user.remarks.FollowUp3[
                      user.remarks.FollowUp3.length - 1
                    ].subject
                    : user.remarks.FollowUp2.length > 0
                      ? user.remarks.FollowUp2[
                        user.remarks.FollowUp2.length - 1
                      ].subject
                      : user.remarks.FollowUp1.length > 0
                        ? user.remarks.FollowUp1[
                          user.remarks.FollowUp1.length - 1
                        ].subject
                        : "No Remarks "}</td>}
                  <td className="px-6 py-4">
                    <Button variant="contained">
                      <Link to={`/student/${user._id}`} state={{ id: `${user._id}`}}> Edit </Link>
                    </Button>
                  </td>
                </tr>
              )) : <h1>No Data to Show</h1>}
            </tbody>
          </table>
          <TablePagination
            component="div"
            count={len}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* </div>
                </th>
                <th scope="col" className="px-6 py-3 flex">
                  <div className="flex items-center">

                  Counsellor
                 
                      </div>
                </th>
                <th scope="col" className=" relative px-6 py-3 flex">
                  {/* <div className="flex items-center"> */}

          {/* Lead Status
                  {isLeadStatusDropdownOpen ? (
                    <FaChevronUp
                    onClick={toggleLeadStatusDropdown}
                    style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    // </div>
                    />
                  ) : (
                    <FaChevronDown
                      onClick={toggleLeadStatusDropdown}
                      style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                    />
                  )}
                  {isLeadStatusDropdownOpen && (
                    <div className="absolute z-10 top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                      <button
                        onClick={() => {
                          setLeadStatusFilter("All");
                          toggleLeadStatusDropdown();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        All
                      </button>
                      <button
                        onClick={() => {
                          setLeadStatusFilter("Hot Lead");
                          toggleLeadStatusDropdown();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Hot Leads
                      </button>
                      <button
                        onClick={() => {
                          setLeadStatusFilter("Warm");
                          toggleLeadStatusDropdown();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Warm
                      </button>
                      <button
                        onClick={() => {
                          setLeadStatusFilter("Cold Call Done");
                          toggleLeadStatusDropdown();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cold Call Done
                      </button>
                    </div>
                  )}
                </th>
                <th scope="col" className="px-6 py-3">
                  Update Status{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">{index + 1}</div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4">{user.neetScore}</td>
                  <td className="px-6 py-4">{formatDate(user.DateToVisit)}</td>
                  <td className="px-6 py-4">{user.state}</td>
                  <td className="px-6 py-4">{user.courseSelected}</td>
                  <td className="px-6 py-4">{user.contactNumber}</td>
                  <td className="px-6 py-4">
                    {counsellors.find(
                      (counsellor) => counsellor._id === user.assignedCouns
                    )?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    {user.remarks.FollowUp3.length > 0
                      ? user.remarks.FollowUp3[
                          user.remarks.FollowUp3.length - 1
                        ].subject
                      : user.remarks.FollowUp2.length > 0
                      ? user.remarks.FollowUp2[
                          user.remarks.FollowUp2.length - 1
                        ].subject
                      : user.remarks.FollowUp1.length > 0
                      ? user.remarks.FollowUp1[
                          user.remarks.FollowUp1.length - 1
                        ].subject
                      : "No Remarks "}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/student/${user._id}`}
                      state={{ id: `${user._id}`, page: page }}
                    >
                      <Button variant="contained">Edit</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TablePagination
            component="div"
            count={sortedUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            disabled={paginationDisabled}
          /> */}
        </div>
      </Box>
    </div>
  );
};

export default ShowAllleads;
