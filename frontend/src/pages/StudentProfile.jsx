<<<<<<< HEAD
import React from 'react'
import Followup from '../component/FollowUp/Followup'

const StudentProfile = () => {
  return (
    <div>
        <div>Student Profile</div>
        <div className='flex justify-center'>
            <Followup />
        </div>
    </div>

=======
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Followup from '../component/FollowUp/Followup';

const StudentProfile = (id) => {
  const baseUrl = import.meta.env.VITE_API
  const studentId = {id};
  console.log(studentId);

    // TODO :- all this bunch of cluster will be removed and added to redux slice 
    const [data, setdata] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/students/${studentId}`);
                const fetchedData = res.data.data;
                console.log(fetchedData);
                setdata(fetchedData);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [])

  return (
    <div>
      <div>Student Name</div>
      <div>Student Details</div>
      <div className='flex justify-center'>
        <Followup />
      </div>
    </div>
    
>>>>>>> 56769224778602c10ce766678286fd18c03251d4
  )
}

export default StudentProfile