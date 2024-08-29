import React from "react";
import { Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { HiOutlineDocumentReport } from "react-icons/hi";

const TableComponent = ({ data, title, touchedLeads, untouchedLeads, counsellorReport, countFollowUp3, paidCounselling, associateCollege, totalCallsDone, countHotCallsByCounsellor, countColdCallsByCounsellor, countWarmCallsByCounsellor }) => {
  return (
    <Box sx={{ my: 3 }}>
        {console.log(data)}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          p: 1,
          borderRadius: 1,
        }}
      >
        <Typography variant="h5" component="div" sx={{ color: "#333" }}>
          {title}
        </Typography>

        <Link
          to={`/officeDashboard?office=${
            title === "Noida Office Leads" ? "N" : "K"
          }`}
        >
          <Button variant="contained">
            {title === "Noida Office Leads" ? "Noida" : "Kanpur"} Office Report
          </Button>
        </Link>
      </Box>
      <TableContainer  component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">S. No.</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Mobile</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Email</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Total Leads Assigned</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Touched Leads</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Untouched Leads</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Total Admissions</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Total FollowUp3</Typography>
              </TableCell>
              {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Paid Counselling</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Associate College</Typography>
              </TableCell> */}
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Total Calls Done</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Hot Leads</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Cold Leads</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Warm Leads</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.counsellor.counsellor_id}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{item.counsellor.name}</TableCell>
                <TableCell align="left">{item.counsellor.mobile}</TableCell>
                <TableCell align="left">{item.counsellor.email}</TableCell>
                <TableCell align="center">{item.students.length}</TableCell>
                <TableCell align="center">{touchedLeads(item.students)}</TableCell>
                <TableCell align="center">{untouchedLeads(item.students)}</TableCell>
                <TableCell align="center">{countFollowUp3(item.students)?.totalAdmissions}</TableCell>
                <TableCell align="center">{countFollowUp3(item.students)?.totalFollowUp3}</TableCell>
                {/* <TableCell align="center">{paidCounselling(item.students)}</TableCell>
                <TableCell align="center">{associateCollege(item.students)}</TableCell> */}
                <TableCell align="center">{totalCallsDone(item.students)}</TableCell>
                <TableCell align="center">
                  {countHotCallsByCounsellor(item.students)}
                </TableCell>
                <TableCell align="center">
                  {countColdCallsByCounsellor(item.students)}
                </TableCell>
                <TableCell align="center">
                  {countWarmCallsByCounsellor(item.students)}
                </TableCell>
                <TableCell align="center">
                  <Link to={`/counsellorDashboard/${item.counsellor._id}`}>
                    <HiOutlineDocumentReport
                      fontSize={30}
                      color="blue"
                      className="cursor-pointer"
                      title="Overall Summary"
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
