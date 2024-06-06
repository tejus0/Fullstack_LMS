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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const Table = () => {
  const location = useLocation();
  const id = location.state.id;
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:4000/api/v1/getCounsellorDataList/${id}`).catch(err => {
        // Handle error
        console.log(err, "error");
      });
      setUsers(response.data);
    };

    fetchData();
  }, [id]);

  const deleteUser = async (userId) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/delete/${userId}`)
      .then((response) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              {/* <img src={logout}></img> */}
            </div>
        <div className="w-full p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                <th scope="col" className="px-6 py-3">S. No.</th>
                  {/* <div className="flex items-center">
                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                  </div> */}
                </th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Registerd ON</th>
                <th scope="col" className="px-6 py-3">Neet Score</th>
                <th scope="col" className="px-6 py-3">State</th>
                <th scope="col" className="px-6 py-3">Course</th>
                <th scope="col" className="px-6 py-3">Contact No</th>
                <th scope="col" className="px-6 py-3">Lead Status</th>
                <th scope="col" className="px-6 py-3">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user,index) => (
                <React.Fragment key={user._id}>
                {user.otherResponse.length == 0 ? (
                <tr className=" w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      {index+1}
                      {/* <input id={`checkbox-table-search-${user._id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor={`checkbox-table-search-${user._id}`} className="sr-only">checkbox</label> */}
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                  <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4">{user.neetScore}</td>
                  <td className="px-6 py-4">{user.state}</td>
                  <td className="px-6 py-4">{user.courseSelected}</td>
                  <td className="px-6 py-4">{user.contactNumber}</td>
                  <td className="px-6 py-4">{user.state}</td>
                  <td className="px-6 py-4">
                  <Button variant="contained">
                    <Link to={`/student/${user._id}`} state={{ id:`${user._id}`}}>Edit</Link>
                    </Button>
                  </td>
                </tr>
                ) : (
                  <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${user._id}-content`}
                    id={`panel-${user._id}-header`}
                  >
                    <tr className=" w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      {index+1}
                      {/* <input id={`checkbox-table-search-${user._id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor={`checkbox-table-search-${user._id}`} className="sr-only">checkbox</label> */}
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                  <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4">{user.neetScore}</td>
                  <td className="px-6 py-4">{user.state}</td>
                  <td className="px-6 py-4">{user.courseSelected}</td>
                  <td className="px-6 py-4">{user.contactNumber}</td>
                  <td className="px-6 py-4">{user.state}</td>
                  <td className="px-6 py-4">
                  <Button variant="contained">
                    <Link to={`/student/${user._id}`} state={{ id:`${user._id}`}}>Edit</Link>
                    </Button>
                  </td>
                </tr>
                  </AccordionSummary>
                  <AccordionDetails>
                  {paginatedUsers.otherResponse.map((otheruser,index) => (
                <React.Fragment key={otheruser._id}>
                  <tr className=" w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      {index+1}
                      {/* <input id={`checkbox-table-search-${user._id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor={`checkbox-table-search-${user._id}`} className="sr-only">checkbox</label> */}
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                  <td className="px-6 py-4">{formatDate(otheruser.createdAt)}</td>
                  <td className="px-6 py-4">{otheruser.neetScore}</td>
                  <td className="px-6 py-4">{otheruser.state}</td>
                  <td className="px-6 py-4">{otheruser.courseSelected}</td>
                  <td className="px-6 py-4">{otheruser.contactNumber}</td>
                  <td className="px-6 py-4">{otheruser.state}</td>
                  <td className="px-6 py-4">
                  <Button variant="contained">
                    <Link to={`/student/${otheruser._id}`} state={{ id:`${otheruser._id}`}}>Edit</Link>
                    </Button>
                  </td>
                </tr>
                    {/* <Typography>Registered On: {formatDate(otheruser.submitedAt)}</Typography>
                    <Typography>Neet Score: {otheruser.neetScore}</Typography>
                    <Typography>State: {otheruser.state}</Typography>
                    <Typography>Course: {otheruser.courseSelected}</Typography>
                    <Typography>Contact No: {otheruser.contactNumber}</Typography>
                    <Typography>Lead Status: {otheruser.state}</Typography>
                    <Button variant="contained">
                      <Link to={`/student/${otheruser._id}`} state={{ id: `${otheruser._id}` }}>Edit</Link>
                    </Button>
                    <ul>
                      {user.otherResponse.map((response, i) => (
                        <li key={i}>{response}</li>
                      ))}
                    </ul> */}
                    </React.Fragment>
              ))}
                  </AccordionDetails>
                </Accordion>
              )}
            </React.Fragment>
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
          />
        </div>
      </Box>
    </div>
  );
}

export default Table;
