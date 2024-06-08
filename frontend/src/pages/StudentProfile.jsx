import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Followup from '../component/FollowUp/Followup';
import Todolist from "../component/FollowUp/TodoList";
import Todoform from "../component/FollowUp/Todoform";
import { Box, Paper, Button } from "@mui/material";
import SimpleAccordion from '../component/Accordion';

const StudentProfile = ({counsellor_id}) => {
  const [todos, setTodos] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const baseUrl = import.meta.env.VITE_API;
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;

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
        const response = await axios.get(`${baseUrl}/getTodos/${id}`);
        setTodos(response.data[0].remarks);
        const studData = await axios.get(`${baseUrl}/student/${id}`);
        setStudentData(studData.data.data[0]);
        console.log(studentData.otherResponse,"data")
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id, baseUrl]);

  const addTodo = (text) => {
    const newTodo = {
      subject: text,
      date: new Date(),
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleGoToLeads = () => {
    navigate(`/counsellor-profile/${studentData.assignedCouns}`, {state:{id:studentData.assignedCouns}}); // Adjust the path as needed
  };

  return (
    <>
      <Box sx={{ padding: '16px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoToLeads}
          sx={{ marginBottom: '16px' }}
        >
          Go To Leads
        </Button>
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
                  <p>Whatsapp Number: <span className="text-green-600">{studentData.whatsappNumber}</span></p>
                  <p>Father name: {studentData.guardianName}</p>
                  <p>City: {studentData.district}</p>
                  <p>State: {studentData.state}</p>
                  <p>Course Selected: {studentData.courseSelected}</p>
                  <p>Preferred College: {studentData.preferredCollege}</p>
                  <p>Source: {studentData.source}</p>
                  <p>Neet Score: {studentData.neetScore}</p>
                  <p>Neet AIR: {studentData.neetAIR}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4 mb-4">
              {studentData.otherResponse && studentData.otherResponse.length > 0 ? (
                <SimpleAccordion otherResp={studentData.otherResponse} />
              ) : (
                <p>No data</p>
              )}
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <Paper style={{ maxHeight: "50vh", overflow: 'auto' }} elevation={20}>
            <Todoform addTodo={addTodo} id={studentData._id} />
            <Todolist todos={todos} />
          </Paper>
        </div>
      </Box>
    </>
  );
};

export default StudentProfile;
