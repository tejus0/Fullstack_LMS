import { IconButton, Tooltip } from '@mui/material'
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { FaPeopleGroup } from "react-icons/fa6";
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';


const SideBar = () => {
    const location = useParams();
    const id = location.counsellorId;
    const navigate = useNavigate();
    const handleLogout = () => {
        window.localStorage.clear();
        navigate(`/login`); // Adjust the path as needed
      };
  return (
    <div className="flex flex-col bg-gray-200 p-1">
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
          <Tooltip title="Bulk Upload">
            <IconButton>
              <Link to={`/?counsId=${id}`} target="_blank">
                <GroupAddIcon />
              </Link>
              {/* <a href={`http://localhost:5173/?counsId=${id}`}><GroupAddIcon /></a> */}
              {/* <a href={`http://localhost:5173/?counsId=${id}`}><GroupAddIcon /></a> */}
            </IconButton>
          </Tooltip>
          <Tooltip title="Counsellors Report">
            <IconButton>
              <Link to={`/showCounsellorReport`} state={{id}}>
              <FaPeopleGroup />
              </Link>
              {/* <a href={`http://localhost:5173/?counsId=${id}`}><GroupAddIcon /></a> */}
              {/* <a href={`http://localhost:5173/?counsId=${id}`}><GroupAddIcon /></a> */}
            </IconButton>
          </Tooltip>
        </div>
  )
}

export default SideBar