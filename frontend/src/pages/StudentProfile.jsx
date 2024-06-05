import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Followup from '../component/FollowUp/Followup';
import { useLocation } from 'react-router-dom';
import Todolist from "../component/FollowUp/TodoList";
import Todoform from "../component/FollowUp/Todoform";
// import Modal from "react-modal";
// import toast from "react-hot-toast";
import { Box, Paper } from "@mui/material";

const StudentProfile = () => {
  // console.log(props,"props")
  const [todos, setTodos] = useState([]);

  const baseUrl = import.meta.env.VITE_API
  const location = useLocation();
  const id = location.state.id;
  console.log(location.state.id);

    // TODO :- all this bunch of cluster will be removed and added to redux slice 
    const [studentData, setStudentData] = useState([])

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
            try {
              const response = await axios.get(
                `http://localhost:4000/api/v1/getTodos/${id}`
              )
              setTodos(response.data[0].remarks)
              // console.log(response.data[0].remarks,"follwup")
            // );
                const studData= await axios.get(`${baseUrl}/student/${id}`);
                setStudentData(studData.data.data[0])
                // const fetchedData = student.data.data[0];
                // console.log(studentData,"data")
                ;
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [])
    const addTodo = (text) => {
      const newTodo = {
        subject: text,
        date:new Date(),
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
    };
  return (
    <>
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="border p-4 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                S
              </div>
              <div className="ml-4">
                <h2 className="font-bold text-xl">{studentData.name}</h2>
                <span className="text-blue-600">{formatDate(studentData.createdAt)}</span>
              </div>
            </div>
            <div className="mb-4">
              <p>Email: {studentData.email}</p>
              <p>Mobile: <span className="text-green-600">{studentData.contactNumber}</span></p>
              <p>Father name : {studentData.fatherName}</p>
              <p>City: {studentData.city}</p>
              <p>State: {studentData.state}</p>
              <p>Course Selected: {studentData.courseSelected}</p>
              <p>Preffered College: {studentData.preffredCollege}</p>
              <p>Neet Score: {studentData.neetScore}</p>
              {/* <p>Last Active: 05 Jun 2024 10:15 AM</p> */}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 mb-4">
          <div className="border p-4 rounded-lg shadow-lg">
            <div className="mb-4">
              <h2 className="font-bold text-xl">Communication Status</h2>
              {/* <p>Email Sent - 1</p>
              <p>SMS Sent - 1</p> */}
              <p>Whatsapp Number : {studentData.whatsappNumber}</p>
            </div>
            <div className="mb-4">
              <h2 className="font-bold text-xl">Telephony Status</h2>
              <p>Inbound Call - 0</p>
              <p>Outbound Call - 1</p>
            </div>
            <div className="mb-4">
              <h2 className="font-bold text-xl">Assigned Counsellor</h2>
              <p>CAREERKICK SERVICES <span className="text-blue-600">+1</span></p>
            </div>
            <div className="mb-4">
              <h2 className="font-bold text-xl">Lead Source</h2>
              <p>****************************</p>
            </div>
            <div className="mb-4">
              <h2 className="font-bold text-xl">Upcoming Followup</h2>
              <p>NA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className='flex justify-center'>
        {/* <Followup id={studentData._id} /> */}
        <Paper style={{maxHeight: "50vh", overflow: 'auto'}} elevation={20}>
      <Todoform addTodo={addTodo} id = {studentData._id}/>
      <Todolist todos={todos} />
    </Paper>
      </div>
    </>
  )
}

export default StudentProfile