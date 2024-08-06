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
import { toast } from "react-hot-toast";
import Modal from '@mui/material/Modal';
// import TextField from "@mui/material";
// import MenuItem from "@mui/material";
// import Select from "@mui/material";
// import InputLabel from "@mui/material";
// import FormControl from "@mui/material";
// import FormControlLabel from "@mui/material";




import { FaSort, FaChevronDown, FaChevronUp } from "react-icons/fa";




const ShowUnassignedLeads = () => {
    console.log("first in show unassigned Leads")
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
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [page, setPage] = useState(location.state?.page || 0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // change here for number of rows per page
  const navigate = useNavigate();

  const [search, setsearch] = useState("");
  const [SearchBy, setSearchBy] = useState("name");
  const [filter, setfilter] = useState([]);

  const [leadStatusFilter, setLeadStatusFilter] = useState("All");
  const [isLeadStatusDropdownOpen, setIsLeadStatusDropdownOpen] =
    useState(false);

  const [counsellors, setCounsellors] = useState([]);

  const [showNewTable, setShowNewTable] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);


  const [modalOpen, setModalOpen] = useState(false);
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [selectedCounsellor, setSelectedCounsellor] = useState('');

  const [allCouncellors, setAllCouncellors] = useState([]);
  const [loading, setLoading] = useState(true);




  const handleRowSelect = (rowId) => {
    setSelectedRows(prevSelectedRows =>
      prevSelectedRows.includes(rowId)
        ? prevSelectedRows.filter(id => id !== rowId)
        : [...prevSelectedRows, rowId]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedUsers.map(user => user._id));
    }
    setIsAllSelected(!isAllSelected);
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
    console.log(page, "unassigned page in all leads");

    const fetchData = async () => {
      //  this is wrong

      //   const response = await axios.get(${baseUrl}/getCounsellorDataList/${id}).catch(err => {
      //     console.log(err, "error");
      //   });
      const response = await axios.get(`${baseUrl}/getUnassignedLeads`).catch((err) => {
        console.log(err, "error");
      });
      console.log(response.data, "unassigned leads");
      setUsers(response.data.data);
      setfilter(response.data.data);
    };

    console.log(users);

    const fetchCounsellors = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getCounsellorNames`);
        console.log(response.data, "all counsellors")
        setAllCouncellors(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching counsellors names:', error);
      }
    };

    fetchCounsellors();

    fetchData();
  }, [selectedCounsellor]);

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
        // <<<<<<< Updated upstream
        // else {
        //     setUsers(sortedUsers.filter((item) => item[SearchBy].toLowerCase().includes(e.target.value.toLowerCase())))
        // =======
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
          // >>>>>>> Stashed changes
        }
        return 0;
      });
    }

    return sortableUsers;
  }, [users, sortConfig]);




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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


  const isAllChecked = paginatedUsers.length > 0 && paginatedUsers.every(user => selectedRows.includes(user._id));

  const handleAssignLeads = async () => {
    console.log(rangeStart, "start", rangeEnd, "end")
    // const endIndex = rangeEnd ? filteredUsers.length - 1 : parseInt(rangeEnd, 10);

    if (rangeEnd >= filteredUsers.length) {
      toast.error("End value exceeds the maximum limit of the table.");
      return;
    }
    // Extract the subset of users from sortedUsers
    const usersToAssign = sortedUsers.slice(parseInt(rangeStart, 10) - 1, parseInt(rangeEnd, 10));
    console.log(usersToAssign, "assin")

    // Prepare the data to be sent in the API request
    const dataToSend = usersToAssign.map(user => ({
      id: user._id, // Assuming `_id` is the unique identifier
      // assignedCouns: selectedCounsellor // The new value for `assignedCouns`
    }));

    try {
      // Make the API request to update the users
      const response = await axios.post(`${baseUrl}/assignOfflineLeadsToCouncellor`, { dataToSend, selectedCounsellor });

      if (response.status === 200) {
        toast.success(`Leads successfully assigned`);
      } else {
        toast.error("Failed to assign leads. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while assigning leads.");
      console.error("Error assigning leads:", error);
    }

    console.log(`Assign leads from index ${rangeStart} to ${rangeEnd}`);
    // Implement assignment logic here
    setModalOpen(false);
  };


  

  return (
    <div>
      {/* Modal */}
      {modalOpen && (

        
        <div className="fixed inset-0 flex items-center justify-center z-50">

          
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Assign Leads to Counsellors</h2>
            <div className="mb-4">
              <label htmlFor="rangeStart" className="block text-sm font-medium text-gray-700">Start Index:</label>
              <input
                type="number"
                id="rangeStart"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rangeEnd" className="block text-sm font-medium text-gray-700">End Index:</label>
              <input
                type="number"
                id="rangeEnd"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">Select Option:</label>
              <select
                id="dropdown"
                value={selectedCounsellor}
                onChange={(e) => setSelectedCounsellor(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                disabled={loading}
              >
                <option value="" disabled>Select an option</option>
                {allCouncellors.map(option => (
                  <option key={option.value} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {loading && <p>Loading options...</p>}
            </div>
            <div className="flex justify-end">
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


      {/* new table */}
      <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">


          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={isAllChecked}
                  onChange={handleSelectAll}
                />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
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
          </tr>
        </thead>
        <tbody className={`${!paginatedUsers.length ? "h-screen w-screen flex justify-center items-center" : ""}`}>
          {paginatedUsers.length > 0 ? paginatedUsers.map((user, index) => (
            <tr key={user._id} className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-${user._id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={selectedRows.includes(user._id)}
                    onChange={() => handleRowSelect(user._id)}
                  />
                  <label htmlFor={`checkbox-table-${user._id}`} className="sr-only">checkbox</label>
                </div>
              </td>
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
                  <Link to={`/student/${user._id}`} state={{ id: `${user._id}`, page, origin: 'showAllLeads' }}> Edit </Link>
                </Button>
              </td>
            </tr>
          )) : <h1>No Data to Show</h1>}
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
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        className="mb-4"
      >
        Assign Leads to Counsellors
      </Button>
    </div>
  )
}

export default ShowUnassignedLeads;
