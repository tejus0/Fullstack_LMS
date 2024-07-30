// ModalComponent.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MaterialTable from './MaterialTable';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow:"auto",
  p: 4,
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

const ModalComponent = ({ open, handleClose, title, data }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {/* <MaterialTable rows={data}/> */}


        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {/* {data.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
              <p>{item.value}</p>
              </div>
            ))} */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S. No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Name
                        {/* <FaSort
                          onClick={() => handleSort("name")}
                          f
                          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                        /> */}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Registered ON
                        {/* <FaSort
                          onClick={() => handleSort("createdAt")}
                          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                        /> */}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Neet Score
                        {/* <FaSort
                          onClick={() => handleSort("neetScore")}
                          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                        /> */}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Slot Date
                        {/* <FaSort
                          onClick={() => handleSort("DateToVisit")}
                          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                        /> */}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        State
                        {/* <FaSort
                          onClick={() => handleSort("state")}
                          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                        /> */}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Course
                        {/* <FaSort
                          onClick={() => handleSort("courseSelected")}
                          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                        /> */}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Contact No
                        {/* <FaSort
                          onClick={() => handleSort("contactNumber")}
                          style={{ cursor: "pointer", marginLeft: "0.5rem" }}
                        /> */}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center relative">
                        Lead Status
                        {/* {isLeadStatusDropdownOpen ? (
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
                          // <div className="absolute z-10 top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                          //   <button
                          //     onClick={() => {
                          //       setLeadStatusFilter("All");
                          //       toggleLeadStatusDropdown();
                          //       setPage(0);
                          //     }}
                          //     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          //   >
                          //     All
                          //   </button>
                          //   <button
                          //     onClick={() => {
                          //       setLeadStatusFilter("Hot Lead");
                          //       toggleLeadStatusDropdown();
                          //       setPage(0);
                          //     }}
                          //     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          //   >
                          //     Hot Leads
                          //   </button>
                          //   <button
                          //     onClick={() => {
                          //       setLeadStatusFilter("Warm");
                          //       toggleLeadStatusDropdown();
                          //       setPage(0);
                          //     }}
                          //     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          //   >
                          //     Warm
                          //   </button>
                          //   <button
                          //     onClick={() => {
                          //       setLeadStatusFilter("Cold Call Done");
                          //       toggleLeadStatusDropdown();
                          //       setPage(0);
                          //     }}
                          //     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          //   >
                          //     Cold Call Done
                          //   </button>
                          // </div>
    
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
                          </ul>
                        )} */}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Update Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, index) => (
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
                      {/* <td className="px-6 py-4"> {object.keys(user.remarks).length > 0 ? user.remarks[user.remarks.length - 1].subject : "No remarks"}</td> */}
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
                        //   state={{ id: `${user._id}`, counsellorID: id, page, origin: 'counsellorProfile'}}
                        >
                          <Button variant="contained">Edit</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
