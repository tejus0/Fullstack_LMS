import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { json, Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import Navbar from "../../component/navbar/Navbar";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterDrawer from "../../component/FilterDrawer";
import { useReactToPrint } from "react-to-print";
import OrganicTableLeads from "./OrganicTableLeads";
import { MdCloudUpload } from "react-icons/md";

import { FaSort, FaChevronDown, FaChevronUp, FaPowerOff } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import ShowUnassignedLeads from "./ShowUnassignedLeads";
import { requiredFields } from "../../data/requiredFieldBulk";
import BulkUpload from "../../component/BulkUpload";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const ShowAllleads = () => {
  // const dispatch = useDispatch();

  const [columns, setColumns] = useState([
    { visible: true, label: "name" },
    { visible: true, label: "registeredOn" },
    { visible: true, label: "neetScore" },
    { visible: true, label: "state" },
    { visible: true, label: "course" },
    { visible: true, label: "contactNo" },
    { visible: true, label: "leadStatus" },
    { visible: true, label: "counsillor" },
  ]);

  const handleSelectRow = (key) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.label === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const componentToPdf = useRef();
  const baseUrl = import.meta.env.VITE_API;
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [page, setPage] = useState(location.state?.page || 0);
  // console.log(page);
  const [rowsPerPage, setRowsPerPage] = useState(10); // change here for number of rows per page
  const navigate = useNavigate();

  const [search, setsearch] = useState("");
  const [SearchBy, setSearchBy] = useState("name");
  const [filter, setfilter] = useState([]);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [leadStatusFilter, setLeadStatusFilter] = useState("All");
  const [isLeadStatusDropdownOpen, setIsLeadStatusDropdownOpen] =
    useState(false);

  const [counsellors, setCounsellors] = useState([]);

  const [showNewTable, setShowNewTable] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [selectedCounsellor, setSelectedCounsellor] = useState("");

  const [allCouncellors, setAllCouncellors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showUnassignedTable, setShowUnassignedTable] = useState(false);
  const [bulkOpen, setbulkOpen] = useState(false);
  const dispatch = useDispatch();

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

  const fetchData = async () => {
    //  this is wrong

    //   const response = await axios.get(${baseUrl}/getCounsellorDataList/${id}).catch(err => {
    //     console.log(err, "error");
    //   });
   try {
     const response = await toast.promise(
       axios.get(`${baseUrl}/dashboard`,{withCredentials:true}).catch((err) => {
        if(err?.response?.status == 401){
          dispatch(logout())
        }
         console.log(err.response.status, "error");
       }),
 
       {
         loading: "Fetching Data ...",
         success: "Data fetched Successfully",
         error: "Failed to fetch Data",
       }
     );
     setUsers(response.data.data);
     setAllUsers(response.data.data);
     setfilter(response.data.data);
   } catch (err) {
    if(err?.response?.status == 401){
      dispatch(logout())
    }
    console.log(err.response.status)
   }
  };

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getCounsellorNames`,{withCredentials:true});
        // console.log(response.data, "all counsellors")
        setAllCouncellors(response.data);
        setLoading(false);
      } catch (error) {
        if(error?.response?.status == 401){
          dispatch(logout())
        }
        console.error("Error fetching counsellors names:", error);
      }
    };

    fetchCounsellors();

    fetchData();
  }, []);

  const getCounsellorData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/getCounsellorInfo`,{withCredentials:true});
      setCounsellors(res.data.data);
    } catch (error) {
      if(error?.response?.status == 401){
        dispatch(logout())
      }
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
  }, [users, sortConfig, allUsers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleLogout = async() => {
    window.localStorage.clear();
    // navigate(`/login`);
    await axios.get(`${baseUrl}/logout`,{withCredentials:true});
    dispatch(logout())
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
    } else if (SearchBy === "assignedCouns") {
      //   const enteredCouns=  counsellors.find(counsellor =>  counsellor.name.toLowerCase().includes(e.target.value));
      // console.log(enteredCouns._id,"enteredcouns")
      //   setUsers(
      //     sortedUsers.filter((item) =>
      //       // {counsellors.find(counsellor =>  e.target.value === counsellor.name) }
      //     enteredCouns._id === item[SearchBy]

      //     )
      //   );
      const searchValue = e.target.value;
      // Find counsellor IDs that match the search input
      const matchedCounsellors = counsellors.filter((counsellor) =>
        counsellor.name.toLowerCase().includes(searchValue)
      );

      // Extract IDs of matched counsellors
      const matchedCounsellorIds = matchedCounsellors.map(
        (counsellor) => counsellor._id
      );

      // Filter users based on matched counsellor IDs
      setUsers(
        sortedUsers.filter((user) =>
          matchedCounsellorIds.includes(user[SearchBy])
        )
      );
    } else {
      setUsers(
        sortedUsers.filter((item) =>
          item[SearchBy].toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const DateSorting = async () => {
    try {
      const data = await toast.promise(
        axios.post(`${baseUrl}/sortondate`, {
          start: date.startDate,
          end: date.endDate,
        },{withCredentials:true}),
        {
          loading: "Fetching Data ...",
          success: "Data fetched Successfully",
          error: "Failed to fetch Data",
        }
      );
      if (data.data.students.length === 0) {
        toast.error("No data found");
        setUsers([]);
        setAllUsers([]);
        return;
      }
      setUsers(data.data.students);
      setAllUsers(data.data.students);
      setPage(0);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(users);

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

  let paginatedUsers;
  if (search != "") {
    paginatedUsers = filteredUsers;
  } else {
    paginatedUsers = allUsers.slice(
      page * Math.abs(rowsPerPage),
      page * Math.abs(rowsPerPage) + Math.abs(rowsPerPage)
    );
  }

  // const paginatedUsers = filteredUsers.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  

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

  // const generatePDF = useReactToPrint({
  //   content: () => componentToPdf.current,
  //   documentTitle: "UserData",
  //   onAfterPrint: ()=>alert("Data saved in PDF")
  // });
  // console.log(users,"uders in all leads"  );

  const triggerFileInput = () => {
    setbulkOpen(!bulkOpen);
    // document.getElementById("file-input").click();
  };

  const handleAssignLeads = async () => {
    console.log(rangeStart, "start", rangeEnd, "end");
    // const endIndex = rangeEnd ? filteredUsers.length - 1 : parseInt(rangeEnd, 10);

    if (rangeEnd > filteredUsers.length) {
      toast.error("End value exceeds the maximum limit of the table.");
      return;
    }
    // Extract the subset of users from sortedUsers
    const usersToAssign = sortedUsers.slice(
      parseInt(rangeStart, 10) - 1,
      parseInt(rangeEnd, 10)
    );
    console.log(usersToAssign, "assin");

    // Prepare the data to be sent in the API request
    const dataToSend = usersToAssign.map((user) => ({
      id: user._id, // Assuming `_id` is the unique identifier
      // assignedCouns: selectedCounsellor // The new value for `assignedCouns`
    }));

    try {
      // Make the API request to update the users
      const response = await axios.post(
        `${baseUrl}/assignOfflineLeadsToCouncellor`,
        { dataToSend, selectedCounsellor }
      ,{withCredentials:true});

      if (response.status === 200) {
        toast.success(`Leads successfully assigned`);
      } else {
        toast.error("Failed to assign leads. Please try again.");
      }
    } catch (error) {
      if(error?.response?.status == 401){
        dispatch(logout())
      }
      toast.error("An error occurred while assigning leads.");
      console.error("Error assigning leads:", error);
    }

    console.log(`Assign leads from index ${rangeStart} to ${rangeEnd}`);
    setModalOpen(false);
  };

  return (
    <div>
      <Box className="flex">
        <Navbar />

        <div className="w-full p-4 relative overflow-x-auto shadow-md sm:rounded-lg sm:ml-20 ">
          <div className="flex justify-end gap-12 items-center">
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setModalOpen(true)}
                className="mb-4"
              >
                Assign Leads to Counsellors
              </Button>
            </div>
            {/* <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleToggleTable}
                style={{ marginBottom: '16px' }}
              >
                {showNewTable ? 'Show Old Table' : 'Show Visits'}
              </Button>
            </div> */}
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
                <option value="assignedCouns">councellor</option>
              </select>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handelChange}
              />
            </div>
            <div className="flex justify-end items-center">
              <MdCloudUpload
                fontSize={30}
                className="cursor-pointer"
                title="File Upload"
                onClick={triggerFileInput}
              />
              <BulkUpload open={bulkOpen} onClose={triggerFileInput} />
              {/* < input
                type="file"
                id="file-input"
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              /> */}
              <Tooltip title="Logout">
                <IconButton onClick={handleLogout}>
                  <RiLogoutBoxLine />
                </IconButton>
              </Tooltip>

              <div title="Filter">
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
                  handleToggleTable={handleToggleTable}
                  showNewTable={showNewTable}
                  setShowNewTable={setShowNewTable}
                  setShowUnassignedTable={setShowUnassignedTable}
                  isAdmin={true}
                  resetUser={fetchData}
                />
              </div>
            </div>
          </div>

          {showUnassignedTable ? (
            <ShowUnassignedLeads />
          ) : !showNewTable ? (
            <div>
              {/* Modal */}
              {modalOpen && (
                <div
                  className="fixed inset-0 flex items-center justify-center z-[9999] bg-[#0d131fad]"
                  onClick={() => setModalOpen(false)}
                >
                  <div
                    className="bg-white p-6 rounded shadow-lg w-96"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-lg font-semibold mb-4">
                      Assign Leads to Counsellors
                    </h2>
                    <div className="mb-4">
                      <label
                        htmlFor="rangeStart"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Start Index:
                      </label>
                      <input
                        type="number"
                        id="rangeStart"
                        value={rangeStart}
                        onChange={(e) => setRangeStart(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="rangeEnd"
                        className="block text-sm font-medium text-gray-700"
                      >
                        End Index:
                      </label>
                      <input
                        type="number"
                        id="rangeEnd"
                        value={rangeEnd}
                        onChange={(e) => setRangeEnd(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="dropdown"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Select Option:
                      </label>
                      <select
                        id="dropdown"
                        value={selectedCounsellor}
                        onChange={(e) => setSelectedCounsellor(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        disabled={loading}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {allCouncellors.map((option) => (
                          <option key={option.value} value={option._id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      {loading && <p>Loading options...</p>}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAssignLeads}
                      >
                        Assign
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setModalOpen(false)}
                        className="ml-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <table className=" w-full text-sm text-left rtl:text-right text-black-500 dark:text-black-400 border-gray-400 border-2">
                <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-700 dark:text-gray-200 border-b-2">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-black dark:text-white"
                    >
                      S. No.
                    </th>
                    {columns.find(
                      (col) => col.visible && col.label === "name"
                    ) && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white"
                        >
                          <div className="flex items-center">
                            Name
                            <FaSort
                              onClick={() => handleSort("name")}
                              className="ml-2 cursor-pointer text-gray-500 dark:text-gray-300"
                            />
                          </div>
                        </th>
                      )}
                    {columns.find(
                      (col) => col.visible && col.label === "registeredOn"
                    ) && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white"
                        >
                          <div className="flex items-center">
                            Registered ON
                            <FaSort
                              onClick={() => handleSort("createdAt")}
                              className="ml-2 cursor-pointer text-gray-500 dark:text-gray-300"
                            />
                          </div>
                        </th>
                      )}
                    {columns.find(
                      (col) => col.visible && col.label === "neetScore"
                    ) && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white"
                        >
                          <div className="flex items-center">
                            Neet Score
                            <FaSort
                              onClick={() => handleSort("neetScore")}
                              className="ml-2 cursor-pointer text-gray-500 dark:text-gray-300"
                            />
                          </div>
                        </th>
                      )}
                    {columns.find(
                      (col) => col.visible && col.label === "DateToVisit"
                    ) && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white"
                        >
                          <div className="flex items-center">
                            Slot Date
                            <FaSort
                              onClick={() => handleSort("DateToVisit")}
                              className="ml-2 cursor-pointer text-gray-500 dark:text-gray-300"
                            />
                          </div>
                        </th>
                      )}
                    {columns.find(
                      (col) => col.visible && col.label === "state"
                    ) && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white"
                        >
                          <div className="flex items-center">
                            State
                            <FaSort
                              onClick={() => handleSort("state")}
                              className="ml-2 cursor-pointer text-gray-500 dark:text-gray-300"
                            />
                          </div>
                        </th>
                      )}
                    {columns.find(
                      (col) => col.visible && col.label === "course"
                    ) && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white"
                        >
                          <div className="flex items-center">
                            Course
                            <FaSort
                              onClick={() => handleSort("courseSelected")}
                              className="ml-2 cursor-pointer text-gray-500 dark:text-gray-300"
                            />
                          </div>
                        </th>
                      )}
                    {columns.find(
                      (col) => col.visible && col.label === "contactNo"
                    ) && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white"
                        >
                          <div className="flex items-center">
                            Contact No
                            <FaSort
                              onClick={() => handleSort("contactNumber")}
                              className="ml-2 cursor-pointer text-gray-500 dark:text-gray-300"
                            />
                          </div>
                        </th>
                      )}
                    {columns.find(
                      (col) => col.visible && col.label === "counsillor"
                    ) && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white"
                        >
                          <div className="flex items-center">Counsellor</div>
                        </th>
                      )}
                    {columns.find(
                      (col) => col.visible && col.label === "leadStatus"
                    ) && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-black dark:text-white relative"
                        >
                          <div className="flex items-center">
                            Lead Status
                            {isLeadStatusDropdownOpen ? (
                              <FaChevronUp
                                onClick={toggleLeadStatusDropdown}
                                className="ml-2 cursor-pointer text-gray-500 dark:text-gray-300"
                              />
                            ) : (
                              <FaChevronDown
                                onClick={toggleLeadStatusDropdown}
                                className="ml-2 cursor-pointer text-gray-500 dark:text-gray-300"
                              />
                            )}
                          </div>
                          {isLeadStatusDropdownOpen && (
                            <div className="absolute z-10 top-full left-0 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
                              <button
                                onClick={() => {
                                  setLeadStatusFilter("All");
                                  toggleLeadStatusDropdown();
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                All
                              </button>
                              <button
                                onClick={() => {
                                  setLeadStatusFilter("Hot Lead");
                                  toggleLeadStatusDropdown();
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                Hot Leads
                              </button>
                              <button
                                onClick={() => {
                                  setLeadStatusFilter("Warm");
                                  toggleLeadStatusDropdown();
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                Warm
                              </button>
                              <button
                                onClick={() => {
                                  setLeadStatusFilter("Cold Call Done");
                                  toggleLeadStatusDropdown();
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                Cold Call Done
                              </button>
                              <button
                                onClick={() => {
                                  setLeadStatusFilter("Paid Counselling");
                                  toggleLeadStatusDropdown();
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                Paid Counselling
                              </button>
                              <button
                                onClick={() => {
                                  setLeadStatusFilter("Associate College");
                                  toggleLeadStatusDropdown();
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                              >
                                Associate College
                              </button>
                            </div>
                          )}
                        </th>
                      )}
                    <th
                      scope="col"
                      className="px-6 py-3 text-black dark:text-white"
                    >
                      <div className="flex items-center">Update Status</div>
                    </th>
                  </tr>
                </thead>

                <tbody
                  className={`${!paginatedUsers.length
                    ? "h-screen w-screen flex justify-center items-center"
                    : ""
                    }`}
                >
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center text-black dark:text-white">
                            {index + 1}
                          </div>
                        </td>

                        {columns.find(
                          (col) => col.visible && col.label === "name"
                        ) && (
                            <td className="px-6 py-4 font-medium text-black dark:text-white whitespace-nowrap">
                              {user.name}
                            </td>
                          )}
                        {columns.find(
                          (col) => col.visible && col.label === "registeredOn"
                        ) && (
                            <td className="px-6 py-4 text-black dark:text-white">
                              {formatDate(user.createdAt)}
                            </td>
                          )}
                        {columns.find(
                          (col) => col.visible && col.label === "neetScore"
                        ) && (
                            <td className="px-6 py-4 text-black dark:text-white">
                              {user.neetScore}
                            </td>
                          )}
                        {columns.find(
                          (col) => col.visible && col.label === "DateToVisit"
                        ) && (
                            <td className="px-6 py-4 text-black dark:text-white">
                              {formatDate(user.DateToVisit)}
                            </td>
                          )}
                        {columns.find(
                          (col) => col.visible && col.label === "state"
                        ) && (
                            <td className="px-6 py-4 text-black dark:text-white">
                              {user.state}
                            </td>
                          )}
                        {columns.find(
                          (col) => col.visible && col.label === "course"
                        ) && (
                            <td className="px-6 py-4 text-black dark:text-white">
                              {user.courseSelected}
                            </td>
                          )}
                        {columns.find(
                          (col) => col.visible && col.label === "contactNo"
                        ) && (
                            <td className="px-6 py-4 text-black dark:text-white">
                              {user.contactNumber}
                            </td>
                          )}
                        {columns.find(
                          (col) => col.visible && col.label === "counsillor"
                        ) && (
                            <td className="px-6 py-4 text-black dark:text-white">
                              {counsellors.find(
                                (counsellor) =>
                                  counsellor._id === user.assignedCouns
                              )?.name || "N/A"}
                            </td>
                          )}
                        {columns.find(
                          (col) => col.visible && col.label === "leadStatus"
                        ) && (
                            <td className="px-6 py-4 text-black dark:text-white">
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
                                    : "No Remarks"}
                            </td>
                          )}
                        <td className="px-6 py-4 text-black dark:text-white">
                          <Link
                            to={`/student/${user._id}`}
                            state={{
                              id: `${user._id}`,
                              page,
                              origin: "showAllLeads",
                            }}
                          >
                            <Button
                              variant="contained"
                              className="bg-blue-500 text-white hover:bg-blue-700"
                            >
                              Edit
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h1 className="text-black dark:text-white">
                      No Data to Show
                    </h1>
                  )}
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
                rowsPerPageOptions={[10, 25, 50,100, { label: "All", value: sortedUsers.length }]} // Adding the 'All' option
                labelDisplayedRows={({ from, to, count }) =>
                  rowsPerPage === -1
                    ? `Showing ${count} of ${count}`
                    : `${from}-${to} of ${count}`
                }
              />
            </div>
          ) : (
            <OrganicTableLeads />
          )}
          {/* <div>
        <Button variant="contained" onClick={generatePDF}>
          PDF
        </Button>
        </div> */}
        </div>
      </Box>
    </div>
  );
};

export default ShowAllleads;
