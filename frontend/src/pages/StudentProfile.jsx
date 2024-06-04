import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Followup from '../component/FollowUp/Followup';
import { useLocation } from 'react-router-dom';

const StudentProfile = () => {
  const baseUrl = import.meta.env.VITE_API
  const location = useLocation();
  console.log(location.state);

    // TODO :- all this bunch of cluster will be removed and added to redux slice 
    const [studentData, setStudentData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const student = await axios.get(`${baseUrl}${location.pathname}`);
                const fetchedData = student.data.data[0];
                console.log(fetchedData);
                setStudentData(fetchedData);
                console.log(studentData);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [])
  return (
    <>
    <div className='flex w-100'>
      <div className='bg-blue-300 p-5 rounded-lg'>
        <h1>Student Name: {studentData.name}</h1>
        <h1>Contact Number: {studentData.contactNumber}</h1>
        <h1>Email: {studentData.email}</h1>
        <h1>Whatsapp Number: {studentData.whatsappNumber}</h1>
      </div>
      <div>Student Details</div>
    </div>
      <div className='flex justify-center'>
        <Followup id={studentData._id} />
      </div>
    </>
  )
}

export default StudentProfile