import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Button from '@mui/material/Button';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterDrawer from "../../component/FilterDrawer";

const ShowAllleads = () => {
    // change made by Pankaj in line 22  and 40 

    const [columns, setColumns] = useState([
        { visible: true, label: 'name' },
        { visible: true, label: 'registeredOn' },
        { visible: true, label: 'neetScore' },
        { visible: true, label: 'state' },
        { visible: true, label: 'course' },
        { visible: true, label: 'contactNo' },
        { visible: true, label: 'leadStatus' }
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
    // const id = location.state.id;
    const [users, setUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); // change here for number of rows per page 
    const navigate = useNavigate();


    // search 
    const [search, setsearch] = useState("")
    const [SearchBy, setSearchBy] = useState("name")
    const [filter, setfilter] = useState([])

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

            //   const response = await axios.get(${baseUrl}/getCounsellorDataList/${id}).catch(err => {
            //     console.log(err, "error");
            //   });
            const response = await axios.get(`${baseUrl}/dashboard`).catch(err => {
                console.log(err, "error");
            });
            setUsers(response.data.data);
            setfilter(response.data.data)
        };

        fetchData();
    }, []);


    // const deleteUser = async (userId) => {
    //   await axios
    //     .delete(${process.env.REACT_APP_BASE_URL}/delete/${userId})
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
        navigate(`/login`);
    };

    const handelChange = (e) => {
        setsearch(e.target.value)

        if (e.target.value === "") {
            setUsers(filter)
        }
        else {
            setUsers(sortedUsers.filter((item) => item[SearchBy].toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }

    const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const paginationDisabled = paginatedUsers.some(item => item.remarks.length === 0)

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };



    return (
        <div>

            <Box className="flex">

                <div>
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
                <div className="w-full p-4 relative overflow-x-auto shadow-md sm:rounded-lg">



                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">


                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">S. No.</th>
                                {columns.find(col => col.visible && col.label === 'name') && <th scope="col" className="px-6 py-3">Name</th>}
                                {columns.find(col => col.visible && col.label === 'registeredOn') && <th scope="col" className="px-6 py-3">Registered ON</th>}
                                {columns.find(col => col.visible && col.label === 'neetScore') && <th scope="col" className="px-6 py-3">Neet Score</th>}
                                {columns.find(col => col.visible && col.label === 'state') && <th scope="col" className="px-6 py-3">State</th>}
                                {columns.find(col => col.visible && col.label === 'course') && <th scope="col" className="px-6 py-3">Course</th>}
                                {columns.find(col => col.visible && col.label === 'contactNo') && <th scope="col" className="px-6 py-3">Contact No</th>}
                                {columns.find(col => col.visible && col.label === 'leadStatus') && <th scope="col" className="px-6 py-3">Lead Status</th>}
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
                                    {columns.find(col => col.visible && col.label === 'name') && <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>}
                                    {columns.find(col => col.visible && col.label === 'registeredOn') && <td className="px-6 py-4">{formatDate(user.createdAt)}</td>}
                                    {columns.find(col => col.visible && col.label === 'neetScore') && <td className="px-6 py-4">{user.neetScore}</td>}
                                    {columns.find(col => col.visible && col.label === 'state') && <td className="px-6 py-4">{user.state}</td>}
                                    {columns.find(col => col.visible && col.label === 'course') && <td className="px-6 py-4">{user.courseSelected}</td>}
                                    {columns.find(col => col.visible && col.label === 'contactNo') && <td className="px-6 py-4">{user.contactNumber}</td>}
                                    {columns.find(col => col.visible && col.label === 'leadStatus') && <td className="px-6 py-4"> {user.remarks.length > 0 ? user.remarks[user.remarks.length - 1].subject : "No remarks"}</td>}
                                    <td className="px-6 py-4">
                                        <Button variant="contained">
                                            <Link to={`/student/${user._id}`} state={{ id: `${user._id}` }}> Edit </Link>
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
            </Box >

        </div >
    );
};

export default ShowAllleads;