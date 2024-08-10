import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import { object } from "yup";
import { FaSort, FaChevronDown, FaChevronUp } from "react-icons/fa";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import FilterDrawer from "../../../component/FilterDrawer";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";

const Table = () => {
  const [columns, setColumns] = useState([
    { visible: true, label: "name" },
    { visible: true, label: "registeredOn" },
    { visible: true, label: "neetScore" },
    { visible: true, label: "state" },
    { visible: true, label: "course" },
    { visible: true, label: "contactNo" },
    { visible: true, label: "leadStatus" },
  ]);

  const handleSelectRow = (key) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.label === key ? { ...col, visible: !col.visible } : col
      )
    );
  };
  const baseUrl = import.meta.env.VITE_API;
  const location = useLocation();
  console.log(location);
  const id = location.state?.id;
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [page, setPage] = useState(location.state?.page || 0);

  const [rowsPerPage] = useState(10); // Fixed rows per page to 10

  const [search, setsearch] = useState("");
  const [SearchBy, setSearchBy] = useState("name");

  const [filter, setfilter] = useState([]);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [filteredUsers, setFilteredUsers] = useState([]);

  const [leadStatusFilter, setLeadStatusFilter] = useState("All");
  const [isLeadStatusDropdownOpen, setIsLeadStatusDropdownOpen] =
    useState(false);

  const [showNewTable, setShowNewTable] = useState(false);
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("assigned"); // 'assigned' or 'college'

  const dispatch = useDispatch();

  // Function to fetch College Leads data
  const fetchCollegeLeads = async () => {
    try {
      const response = await axios.get(`${baseUrl}/showCounsCollegeLeads/${id}`,{withCredentials:true});
      // toast.success("Data Fetched Successfully");
      setUsers(response.data);
      setfilter(response.data);
      setFilteredUsers(response.data);
      setActiveButton("college");
      setPage(0);
    } catch (error) {
      console.error("Error fetching college leads:", error);
      toast.error(
          (error.response?.data?.msg || error.message)
      );
      // setUsers([])
      // setfilter([]);
      // setFilteredUsers([]);
      // setActiveButton("");
      // setPage(0);
    }
  };

  const handleToggleTable = () => {
    setShowNewTable(!showNewTable);
  };

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

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    //  this is wrong

    const response = await toast.promise(
      axios.get(`${baseUrl}/getCounsellorDataList/${id}`,{withCredentials:true}).catch((err) => {
        console.log(err, "error");
      }),

      {
        loading: "Fetching Data ...",
        success: "Data fetched Successfully",
        error: "Failed to fetch Data",
      }
    );

    // const response = await axios.get(`${baseUrl}/dashboard`).catch(err => {
    //   console.log(err, "error");
    // });
    setUsers(response.data);
    setfilter(response.data);
    setFilteredUsers(response.data);
    setActiveButton("assigned");
  };

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
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setPage(0); // Reset to first page when changing search term
  };

  const handleLogout = async() => {
    window.localStorage.clear();
    // navigate(`/login`); // Adjust the path as needed
    await axios.get(`${baseUrl}/logout`,{withCredentials:true});
    dispatch(logout())
  };

  // for search

  const handelChange = (e) => {
    setsearch(e.target.value);

    if (e.target.value === "") {
      setFilteredUsers(filter);
    } else {
      setFilteredUsers(
        sortedUsers.filter((item) =>
          item[SearchBy].toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
    setPage(0);
  };

  const DateSorting = async () => {
    try {
      const data = await axios.post(`${baseUrl}/sortondate`, {
        start: date.startDate,
        end: date.endDate,
      },{withCredentials:true});
      if (data.data.students.length === 0) {
        toast.error("No data found");
        setUsers([]);
        return;
      }
      setUsers(data.data.students);
      console.log(data.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // const filteredUsers = React.useMemo(() => {
  //   if (leadStatusFilter === "All") {
  //     return sortedUsers;
  //   } else {
  //     return sortedUsers.filter((user) => {
  //       const latestRemark = user.remarks.FollowUp3.length
  //         ? user.remarks.FollowUp3[user.remarks.FollowUp3.length - 1].subject
  //         : user.remarks.FollowUp2.length
  //         ? user.remarks.FollowUp2[user.remarks.FollowUp2.length - 1].subject
  //         : user.remarks.FollowUp1.length
  //         ? user.remarks.FollowUp1[user.remarks.FollowUp1.length - 1].subject
  //         : "No Remarks";
  //       const leadStatus = `${latestRemark}`;
  //       return leadStatus
  //         .toLowerCase()
  //         .includes(leadStatusFilter.toLowerCase());
  //     });
  //   }
  // }, [sortedUsers, leadStatusFilter]);

  // var paginatedUsers = filteredUsers.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  const filteredAndSortedUsers = React.useMemo(() => {
    let filtered = filteredUsers;
    if (leadStatusFilter !== "All") {
      filtered = filtered.filter((user) => {
        const latestRemark = user.remarks.FollowUp3.length
          ? user.remarks.FollowUp3[user.remarks.FollowUp3.length - 1].subject
          : user.remarks.FollowUp2.length
          ? user.remarks.FollowUp2[user.remarks.FollowUp2.length - 1].subject
          : user.remarks.FollowUp1.length
          ? user.remarks.FollowUp1[user.remarks.FollowUp1.length - 1].subject
          : "No Remarks";
        return latestRemark
          .toLowerCase()
          .includes(leadStatusFilter.toLowerCase());
      });
    }
    return filtered;
  }, [filteredUsers, leadStatusFilter]);

  var paginatedUsers = filteredAndSortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const paginationDisabled = {
    next: paginatedUsers.some((item) => item.remarks.FollowUp1.length === 0),
    previous: false, // Always enable Previous button
  };
  // const paginationDisabled = paginatedUsers.some(item => console.log(item.remarks.FollowUp1.length , "table remarks bc"))

  // console.log(paginatedUsers);

  const toggleLeadStatusDropdown = () => {
    setIsLeadStatusDropdownOpen((prev) => !prev);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLeadStatusFilter = (status) => {
    setLeadStatusFilter(status);
    setIsLeadStatusDropdownOpen(false);
    setPage(0); // Reset to first page when lead status filter changes
  };

  return (
    <div>
      <Box className="flex">
        <div className="flex flex-col bg-gray-200">
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Quick Lead">
            <IconButton>
              <Link to={`/?counsId=${id}`} target="_blank">
                <PersonAddAltIcon />
              </Link>
              {/* <a href={`http://localhost:5173/?counsId=${id}`}><PersonAddAltIcon /></a> */}
              {/* <a href={ `http://localhost:5173/?counsId=${id}`}><PersonAddAltIcon /></a> */}
            </IconButton>
          </Tooltip>
        </div>
        <div className="w-full p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex justify-end items-center gap-12">
            <Link to={`/counsellorDashboard/${id}`}>
              <Button variant="contained" color="primary" className="mb-4">
                See Report
              </Button>
            </Link>
            <div className="flex">
              <select
                value={SearchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="border-2 border-black border-r-0 w-[100px]"
              >
                {/* <option value="email">Email</option> */}
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
                filterDate={DateSorting}
                setdate={setDate}
                date={date}
                isAdmin={false}
                // handleToggleTable={handleToggleTable}
                // showNewTable={showNewTable}
                // setShowNewTable={setShowNewTable}
                // setShowUnassignedTable={setShowUnassignedTable}
              />
            </div>
          </div>
          <div className=" flex align-middle gap-2">
            <Button onClick={fetchData} disabled={activeButton === "assigned"}>
              Assigned Leads
            </Button>
            <Button
              onClick={fetchCollegeLeads}
              disabled={activeButton === "college"}
            >
              College Leads
            </Button>
            <h2 className="bg-gray-400 flex items-center text-white p-2 rounded-md">
              {activeButton === "assigned" ? "Assigned Leads" : "College Leads"}
            </h2>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S. No.
                </th>
                {columns.find((col) => col.visible && col.label === "name") && (
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Name
                      {/* <FaSort
                          onClick={() => handleSort("name")}
                          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                        /> */}
                    </div>
                  </th>
                )}
                {columns.find(
                  (col) => col.visible && col.label === "registeredOn"
                ) && (
                  <th scope="col" className="px-6 py-3">
                    <div className="flex gap-2 items-center">
                      Registered ON
                      {/* <FaSort
                            onClick={() => handleSort("createdAt")}
                            style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                          /> */}
                    </div>
                  </th>
                )}
                {columns.find(
                  (col) => col.visible && col.label === "neetScore"
                ) && (
                  <th scope="col" className="px-6 py-3">
                    <div className="flex gap-2 items-center">
                      Neet Score
                      {/* <FaSort
                            onClick={() => handleSort("neetScore")}
                            style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                          /> */}
                    </div>
                  </th>
                )}
                {columns.find(
                  (col) => col.visible && col.label === "DateToVisit"
                ) && (
                  <th scope="col" className="px-6 py-3">
                    <div className="flex gap-2 items-center">
                      Slot Date
                      {/* <FaSort
                            onClick={() => handleSort("DateToVisit")}
                            style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                          /> */}
                    </div>
                  </th>
                )}
                {columns.find(
                  (col) => col.visible && col.label === "state"
                ) && (
                  <th scope="col" className="px-6 py-3">
                    <div className="flex gap-2 items-center">
                      State
                      {/* <FaSort
                            onClick={() => handleSort("state")}
                            style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                          /> */}
                    </div>
                  </th>
                )}
                {columns.find(
                  (col) => col.visible && col.label === "course"
                ) && (
                  <th scope="col" className="px-6 py-3">
                    <div className="flex gap-2 items-center">
                      Course
                      {/* <FaSort
                            onClick={() => handleSort("courseSelected")}
                            style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                          /> */}
                    </div>
                  </th>
                )}
                {columns.find(
                  (col) => col.visible && col.label === "contactNo"
                ) && (
                  <th scope="col" className="px-6 py-3">
                    <div className="flex gap-2 items-center">
                      Contact No
                      {/* <FaSort
                            onClick={() => handleSort("contactNumber")}
                            style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                          /> */}
                    </div>
                  </th>
                )}
                {columns.find(
                  (col) => col.visible && col.label === "leadStatus"
                ) && (
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center relative">
                      Lead Status
                      {isLeadStatusDropdownOpen ? (
                        <FaChevronUp
                          onClick={toggleLeadStatusDropdown}
                          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                        />
                      ) : (
                        <FaChevronDown
                          onClick={toggleLeadStatusDropdown}
                          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                        />
                      )}
                      {isLeadStatusDropdownOpen && (
                        <ul className="absolute top-full left-0 mt-2 w-full border border-gray-300 bg-white rounded shadow-lg z-10">
                          <li
                            className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                            onClick={() => handleLeadStatusFilter("All")}
                          >
                            All
                          </li>
                          <li
                            className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                            onClick={() => handleLeadStatusFilter("Cold")}
                          >
                            Cold
                          </li>
                          <li
                            className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                            onClick={() => handleLeadStatusFilter("Hot")}
                          >
                            Hot
                          </li>
                          <li
                            className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                            onClick={() => handleLeadStatusFilter("Warm")}
                          >
                            Warm
                          </li>
                          <li
                            className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                            onClick={() =>
                              handleLeadStatusFilter("Paid Counselling")
                            }
                          >
                            Paid Counselling
                          </li>
                          <li
                            className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                            onClick={() =>
                              handleLeadStatusFilter("Associate College")
                            }
                          >
                            Associate College
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>
                )}
                <th scope="col" className="px-6 py-3">
                  Update Status
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {paginatedUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {console.log(user.remarks, "user.remarkls")}
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
                      state={{
                        id: `${user._id}`,
                        counsellorID: id,
                        page,
                        origin: "counsellorProfile",
                      }}
                    >
                      <Button variant="contained">Edit</Button>
                    </Link>
                  </td>
                </tr>
              ))} */}

              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">{index + 1}</div>
                    </td>

                    {columns.find(
                      (col) => col.visible && col.label === "name"
                    ) && (
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.name}
                      </th>
                    )}
                    {columns.find(
                      (col) => col.visible && col.label === "registeredOn"
                    ) && (
                      <td className="px-6 py-4">
                        {formatDate(user.createdAt)}
                      </td>
                    )}
                    {columns.find(
                      (col) => col.visible && col.label === "neetScore"
                    ) && <td className="px-6 py-4">{user.neetScore}</td>}
                    {columns.find(
                      (col) => col.visible && col.label === "DateToVisit"
                    ) && (
                      <td className="px-6 py-4">
                        {formatDate(user.DateToVisit)}
                      </td>
                    )}
                    {columns.find(
                      (col) => col.visible && col.label === "state"
                    ) && <td className="px-6 py-4">{user.state}</td>}
                    {columns.find(
                      (col) => col.visible && col.label === "course"
                    ) && <td className="px-6 py-4">{user.courseSelected}</td>}
                    {columns.find(
                      (col) => col.visible && col.label === "contactNo"
                    ) && <td className="px-6 py-4">{user.contactNumber}</td>}

                    {columns.find(
                      (col) => col.visible && col.label === "leadStatus"
                    ) && (
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
                    )}
                    <td className="px-6 py-4">
                      <Link
                        to={`/student/${user._id}`}
                        state={{
                          id: `${user._id}`,
                          counsellorID: id,
                          page,
                          origin: "counsellorProfile",
                        }}
                      >
                        <Button variant="contained">Edit</Button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <h1>No Data to Show</h1>
              )}
            </tbody>
          </table>
          <TablePagination
            component="div"
            count={filteredAndSortedUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
            // onRowsPerPageChange={handleChangeRowsPerPage}
            // disabled={paginationDisabled}
            nextIconButtonProps={{ disabled: paginationDisabled.next }}
            backButtonProps={{ disabled: paginationDisabled.previous }} // Ensure Previous button is always enabled
          />
        </div>
      </Box>
    </div>
  );
};

export default Table;
