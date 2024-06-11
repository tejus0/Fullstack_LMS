import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Button from '@mui/material/Button';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";

const Table = () => {
  const baseUrl = import.meta.env.VITE_API;
  const location = useLocation();
  const id = location.state.id;
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // change here for number of rows per page 
  const navigate = useNavigate();


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    return `${formattedDate}, ${formattedTime}`;
  };

  useEffect(() => {
    const fetchData = async () => {  //  this is wrong
      
      // const response = await axios.get(`${baseUrl}/getCounsellorDataList/${id}`).catch(err => {
      //   console.log(err, "error");
      // });
      const response = await axios.get(`${baseUrl}/dashboard`).catch(err => {
        console.log(err, "error");
      });
      setUsers(response.data);
    };

    fetchData();
  }, [id]);

  // const deleteUser = async (userId) => {
  //   await axios
  //     .delete(`${process.env.REACT_APP_BASE_URL}/delete/${userId}`)
  //     .then((response) => {
  //       setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  //       toast.success(response.data.msg, { position: "top-right" });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
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
    navigate(`/login`); // Adjust the path as needed
  };

  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Box className="flex">
        <div>
          <Tooltip title="Delete">
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="w-full p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">S. No.</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Registered ON</th>
                <th scope="col" className="px-6 py-3">Neet Score</th>
                <th scope="col" className="px-6 py-3">State</th>
                <th scope="col" className="px-6 py-3">Course</th>
                <th scope="col" className="px-6 py-3">Contact No</th>
                <th scope="col" className="px-6 py-3">Lead Status</th>
                <th scope="col" className="px-6 py-3">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr key={user._id} className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      {index + 1}
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                  <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4">{user.neetScore}</td>
                  <td className="px-6 py-4">{user.state}</td>
                  <td className="px-6 py-4">{user.courseSelected}</td>
                  <td className="px-6 py-4">{user.contactNumber}</td>
                  <td className="px-6 py-4"> {user.remarks.length > 0 ? user.remarks[user.remarks.length - 1].subject : "No remarks"}</td>
                  <td className="px-6 py-4">
                    <Button variant="contained">
                      <Link to={`/student/${user._id}`} state={{ id: `${user._id}` }}>Edit</Link>
                    </Button>
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
          />
        </div>
      </Box>
    </div>
  );
};

export default Table;
