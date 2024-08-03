import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TableComponent from "../../component/TableComponent";

export const AdmissionHeadCounsellor = () => {
  const baseUrl = import.meta.env.VITE_API;
  const [admissionHeadCouns, setAdmissionHeadCouns] = useState([]);
  const location = useLocation();
  console.log(location)
  const id = location.state?.id;


  const countColdCallsByCounsellor = (students) => {
    let totalColdCalls = 0;
    students.forEach((student) => {
      if (student.remarks.FollowUp2 && student.remarks.FollowUp2.length) {
        const lastFollowUp =
          student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1];
        if (lastFollowUp && lastFollowUp.subject.includes("Cold Call Done")) {
          totalColdCalls += 1;
        }
      }
    });
    return totalColdCalls;
  };

  const countHotCallsByCounsellor = (students) => {
    let totalHotLeads = 0;
    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2) {
        const hotCallCount = student.remarks.FollowUp2.reduce(
          (count, followup) => {
            if (followup.subject.includes("Lead")) {
              return count + 1;
            }
            return count;
          },
          0
        );
        totalHotLeads += hotCallCount;
      }
    });
    return totalHotLeads;
  };

  const countWarmCallsByCounsellor = (students) => {
    let totalWarmCalls = 0;
    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2) {
        const warmCallCount = student.remarks.FollowUp2.reduce(
          (count, followup) => {
            if (followup.subject.includes("Warm")) {
              return count + 1;
            }
            return count;
          },
          0
        );
        totalWarmCalls += warmCallCount;
      }
    });
    return totalWarmCalls;
  };

  const leadsUnlocked = (students) => {
    let totalLeadsUnlocked = 0;
    students.forEach((student) => {
      if (student.remarks.FollowUp1 && student.remarks.FollowUp1.length > 0) {
        totalLeadsUnlocked += 1;
      }
    });
    return totalLeadsUnlocked;
  };

  const totalCallsDone = (students) => {
    let totalCallsDone = 0;
    students.forEach((student) => {
      if (
        student.remarks &&
        student.remarks.FollowUp1 &&
        student.remarks.FollowUp1.length > 0
      ) {
        const totalCallsCount = student.remarks.FollowUp1.reduce(
          (count, followup) => {
            if (followup.subject.includes("First")) {
              return count + 1;
            }
            return count;
          },
          0
        );
        totalCallsDone += totalCallsCount;
      }
    });
    return totalCallsDone;
  };
  
  const getAdmissionHeadCounsellors = async () => {
    try {
      const res = await axios.get(`${baseUrl}/getAdmissionHeadCounsellors/${id}`);
      setAdmissionHeadCouns(res.data);
    } catch (error) {
      console.log(error);
      setAdmissionHeadCouns([]);
    }
  };

  useEffect(() =>{

  }, )
  
  useEffect(() => {
        getAdmissionHeadCounsellors();
  }, []);

  return (
        <div>
            <TableComponent
            data={[]}
            title="Noida Office Leads"
            leadsUnlocked={leadsUnlocked}
            totalCallsDone={totalCallsDone}
            countHotCallsByCounsellor={countHotCallsByCounsellor}
            countColdCallsByCounsellor={countColdCallsByCounsellor}
            countWarmCallsByCounsellor={countWarmCallsByCounsellor}
          />
          {/* hey */}
        </div>
    );
};
