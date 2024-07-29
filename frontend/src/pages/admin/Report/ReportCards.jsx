import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Box, Grid, Paper } from '@mui/material';
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

  const getTopPerformers = (data) => {
    return data
      .map(item => ({
        name: item.counsellor.name,
        // leads: leadsUnlocked(item.students) + totalCallsDone(item.students)  // Example metric
      }))
      .slice(0, 10);  
  };

  const topPerformers = getTopPerformers(filteredData);

  const renderTable = (data, title) => (
    <Box sx={{ my: 3 }}>
      <Typography variant="h5" component="div" sx={{ bgcolor: "#f5f5f5", p: 1, borderRadius: 1, textAlign: 'center', color: '#333' }}>
        {title}
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Name</Typography></TableCell>
              <TableCell><Typography variant="h6">Mobile</Typography></TableCell>
              <TableCell><Typography variant="h6">Email</Typography></TableCell>
              <TableCell><Typography variant="h6">Leads Unlocked</Typography></TableCell>
              <TableCell><Typography variant="h6">Total Calls Done</Typography></TableCell>
              <TableCell><Typography variant="h6">Hot Leads</Typography></TableCell>
              <TableCell><Typography variant="h6">Cold Leads</Typography></TableCell>
              <TableCell><Typography variant="h6">Warm Leads</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.counsellor.counsellor_id}>
                <TableCell>{item.counsellor.name}</TableCell>
                <TableCell>{item.counsellor.mobile}</TableCell>
                <TableCell>{item.counsellor.email}</TableCell>
                <TableCell>{leadsUnlocked(item.students)}</TableCell>
                <TableCell>{totalCallsDone(item.students)}</TableCell>
                <TableCell>{countHotCallsByCounsellor(item.students)}</TableCell>
                <TableCell>{countColdCallsByCounsellor(item.students)}</TableCell>
                <TableCell>{countWarmCallsByCounsellor(item.students)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', p: 2 }}>
      <Box sx={{ width: '250px', mr: 2, flexShrink: 0 }}>
        <Paper sx={{ p: 2, bgcolor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '100%' }}>
          <Typography variant="h6" gutterBottom textAlign="center" sx={{ mb: 2, color: '#333' }}>
            Top Performers
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: '400px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topPerformers.map((performer, index) => (
                  <TableRow key={index}>
                    <TableCell>{performer.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Box sx={{ flex: 1 }}>
        <TextField
          label="Search by Counsellor Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ mb: 2, bgcolor: "#e0e0e0", boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}
        />
        <Typography variant="h4" component="div" gutterBottom textAlign="center" sx={{ bgcolor: "#f5f5f5", p: 1, borderRadius: 1, color: '#333' }}>
          Report
        </Typography>
        {renderTable(noidaCounsData, 'Noida Office Leads')}
        {renderTable(kanpurCounsData, 'Kanpur Office Leads')}
      </Box>
    </Box>
  );
};

export default ReportCards;
