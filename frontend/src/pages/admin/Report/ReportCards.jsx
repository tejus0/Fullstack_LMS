import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';


const ReportCards = () => {
    const baseUrl = import.meta.env.VITE_API;
  const [allCounsData, setAllCounsData] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`${baseUrl}/getCounsellorsWithStudents`).catch((err) => {
        console.log(err, "error");
      })
      setAllCounsData(response.data)

      console.log(response.data,"every counsellor and their students");
  }, []);

   // Function to count total students with "Cold Call Done" in FollowUp2 for each counsellor
  const countColdCallsByCounsellor = (students,counsellor) => {
    let totalColdCalls = 0;

    students.forEach((student) => {
      if ( student.remarks.FollowUp2.length) {
        const lastFollowUp = student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1];
        console.log(lastFollowUp,"lastfool.oowup2",counsellor)
        // Check if the lastFollowUp exists and its subject includes 'Cold Call Done'
        if (lastFollowUp && lastFollowUp.subject && lastFollowUp.subject.includes('Cold Call Done')) {
          totalColdCalls += 1;
        }
      }
    });
    return totalColdCalls;
  }; 
  const countHotCallsByCounsellor = (students,counsellorname) => {
    let totalHotLeads = 0;
    
    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2) {
        const hotCallCount = student.remarks.FollowUp2.reduce((count, followup) => {
          if (followup.subject.includes('Lead')) {
            return count + 1;
          }
          return count;
        }, 0);
        
        totalHotLeads += hotCallCount;
      }
    });
    
    console.log(totalHotLeads,"hot cLLLS",counsellorname)
    return totalHotLeads;
  };
   const countWarmCallsByCounsellor = (students) => {
    let totalWarmCalls = 0;

    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2) {
        const WarmCallCount = student.remarks.FollowUp2.reduce((count, followup) => {
          if (followup.subject.includes('Warm')) {
            return count + 1;
          }
          return count;
        }, 0);

        totalWarmCalls += WarmCallCount;
      }
    });

    return totalWarmCalls;
  };

  
  const leadsUnlocked = (students) => {
    let totalLeadsUnlocked = 0;

    students.forEach((student) => {
      if (student.remarks.FollowUp1.length>0) {
        totalLeadsUnlocked +=1;
      }
    });
    return totalLeadsUnlocked;
  }; 
   const totalCallsDone = (students) => {
    let totalCallsDone = 0;

    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp1.length>0) {
        const totalCallsCount = student.remarks.FollowUp1.reduce((count, followup) => {
          console.log(followup.subject,"subject as per sir")
          if (followup.subject.includes('First')) {
            return count + 1;
          }
          return count;
        }, 0);

        totalCallsDone += totalCallsCount;
      }
    });

    return totalCallsDone;
  };

//   const leadsUnlocked= (student)=>{
//     const Unlocked= student.remarks.FollowUp1.length>0 ? true : false;
//     return Unlocked; 
//   }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* all and all */}
      {allCounsData.map(item => (
        <Card key={item.id} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Leads unLocked : {leadsUnlocked(item.students)}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Total Calls Done : {totalCallsDone(item.students,item.counsellor.name)}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {item.counsellor.name}
            </Typography>
            <Typography variant="h5" component="div">
              {item.counsellor.email}
            </Typography>
            <Typography variant="h6" component="div">
            <Typography variant="h6" component="div">
            Hot Call: {countHotCallsByCounsellor(item.students,item.counsellor.name)}
            </Typography><Typography variant="h6" component="div">
             Cold Call: {countColdCallsByCounsellor(item.students,item.counsellor.name)}
             </Typography>
            Warm Call: {countWarmCallsByCounsellor(item.students)}
            </Typography><Typography variant="h6" component="div">
              {item.counsellor.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ReportCards;
