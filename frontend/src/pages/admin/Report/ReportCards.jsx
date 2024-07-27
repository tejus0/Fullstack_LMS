import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, TextField, Box, Grid } from '@mui/material';
import axios from 'axios';

const ReportCards = () => {
  const baseUrl = import.meta.env.VITE_API;
  const [allCounsData, setAllCounsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getCounsellorsWithStudents`);
        setAllCounsData(response.data);
        console.log(response.data, "every counsellor and their students");
      } catch (err) {
        console.log(err, "error");
      }
    };

    fetchData();
  }, [baseUrl]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = allCounsData.filter((item) =>
    item.counsellor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const countColdCallsByCounsellor = (students) => {
    let totalColdCalls = 0;
    students.forEach((student) => {
      if (student.remarks.FollowUp2 && student.remarks.FollowUp2.length) {
        const lastFollowUp = student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1];
        if (lastFollowUp && lastFollowUp.subject.includes('Cold Call Done')) {
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
        const hotCallCount = student.remarks.FollowUp2.reduce((count, followup) => {
          if (followup.subject.includes('Lead')) {
            return count + 1;
          }
          return count;
        }, 0);
        totalHotLeads += hotCallCount;
      }
    });
    return totalHotLeads;
  };

  const countWarmCallsByCounsellor = (students) => {
    let totalWarmCalls = 0;
    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2) {
        const warmCallCount = student.remarks.FollowUp2.reduce((count, followup) => {
          if (followup.subject.includes('Warm')) {
            return count + 1;
          }
          return count;
        }, 0);
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
      if (student.remarks && student.remarks.FollowUp1 && student.remarks.FollowUp1.length > 0) {
        const totalCallsCount = student.remarks.FollowUp1.reduce((count, followup) => {
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

  const noidaCounsData = filteredData.filter(item => item.counsellor.counsellor_id.toLowerCase().includes('n'));
  const kanpurCounsData = filteredData.filter(item => item.counsellor.counsellor_id.toLowerCase().includes('k'));

  const renderCards = (data) => {
    return (
      <Grid container spacing={2} justifyContent="center">
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.counsellor.counsellor_id}>
            <Card sx={{
              minWidth: 275,
              boxShadow: '0 0 8px 0 teal',
              margin: '10px',
              borderRadius: 2,
              '&:hover': {
                boxShadow: '0 8px 16px 0 teal',
              }
            }}>
              <CardContent>
                <Typography sx={{ fontSize: 18 , fontWeight: 700 }} color="teal" gutterBottom>
                  {item.counsellor.name.toUpperCase()}
                </Typography>
                <Typography sx={{ fontSize: 14}} color="teal" gutterBottom>
                  {item.counsellor.mobile}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="teal" gutterBottom>
                  {item.counsellor.email}
                </Typography>
                <hr />
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Leads Unlocked: {leadsUnlocked(item.students)}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Total Calls Done: {totalCallsDone(item.students)}
                </Typography>
                <Typography  sx={{ fontSize: 14 }}variant="h6" component="div">
                  Hot Leads: {countHotCallsByCounsellor(item.students)}
                </Typography>
                <Typography sx={{ fontSize: 14 }} variant="h6" component="div">
                  Cold Leads: {countColdCallsByCounsellor(item.students)}
                </Typography>
                <Typography sx={{ fontSize: 14 }} variant="h6" component="div">
                  Warm Leads: {countWarmCallsByCounsellor(item.students)}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Search by Counsellor Name"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        sx={{ mb: 2, bgcolor: "skyblue", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: 2 }}
      />
      <Typography variant="h4" component="div" gutterBottom textAlign="center" sx={{ bgcolor: "darkOrange", p: 1, borderRadius: 1 }}>
        Report
      </Typography>
      <Typography variant="h5" component="div" sx={{ mt: 3 }}>
        Noida
      </Typography>
      {renderCards(noidaCounsData)}
      <Typography variant="h5" component="div" sx={{ mt: 3 }}>
        Kanpur
      </Typography>
      {renderCards(kanpurCounsData)}
    </Box>
  );
};

export default ReportCards;
