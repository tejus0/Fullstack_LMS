import React from "react";
import { Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { HiOutlineDocumentReport } from "react-icons/hi";

const TableComponent = ({ data, title, counsellorReport}) => {
  const totals = data.reduce((acc, item) => {
    const report = counsellorReport(item.students);
    acc.totalLeads += item.students.length;
    acc.touchedLeads += report.touchedLeads;
    acc.untouchedLeads += report.untouchedLeads;
    acc.totalAdmissions += report.totalAdmissions;
    acc.totalFollowUp3 += report.totalFollowUp3;
    acc.totalFollowUp2 += report.totalFollowUp2;
    acc.totalFollowUp1 += report.totalFollowUp1;
    acc.firstCallDone += report.firstCallDone;
    return acc;
  }, {
    totalLeads: 0,
    touchedLeads: 0,
    untouchedLeads: 0,
    totalAdmissions: 0,
    totalFollowUp3: 0,
    totalFollowUp2: 0,
    totalFollowUp1: 0,
    firstCallDone: 0,

  });

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
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Total FollowUp2</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Total FollowUp1</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">First Call Done</Typography>
              </TableCell>
              {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Paid Counselling</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Associate College</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Hot Leads</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Cold Leads</Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6">Warm Leads</Typography>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              const report = counsellorReport(item.students)
              return (
              <TableRow key={item.counsellor.counsellor_id}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{item.counsellor.name}</TableCell>
                <TableCell align="left">{item.counsellor.mobile}</TableCell>
                <TableCell align="left">{item.counsellor.email}</TableCell>
                <TableCell align="center">{item.students.length}</TableCell>
                <TableCell align="center">{report.touchedLeads}</TableCell>
                <TableCell align="center">{report.untouchedLeads}</TableCell>
                <TableCell align="center">{report.totalAdmissions}</TableCell>
                <TableCell align="center">{report.totalFollowUp3}</TableCell>
                <TableCell align="center">{report.totalFollowUp2}</TableCell>
                <TableCell align="center">{report.totalFollowUp1}</TableCell>
                <TableCell align="center">{report.firstCallDone}</TableCell>
                {/* <TableCell align="center">{touchedLeads(item.students)}</TableCell>
                <TableCell align="center">{untouchedLeads(item.students)}</TableCell>
                <TableCell align="center">{countFollowUp3(item.students)?.totalAdmissions}</TableCell>
                <TableCell align="center">{countFollowUp3(item.students)?.totalFollowUp3}</TableCell>
                <TableCell align="center">{paidCounselling(item.students)}</TableCell>
                <TableCell align="center">{associateCollege(item.students)}</TableCell>
                <TableCell align="center">{totalCallsDone(item.students)}</TableCell>
                <TableCell align="center">
                  {countHotCallsByCounsellor(item.students)}
                </TableCell>
                <TableCell align="center">
                  {countColdCallsByCounsellor(item.students)}
                </TableCell>
                <TableCell align="center">
                  {countWarmCallsByCounsellor(item.students)}
                </TableCell> */}
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
              )
            })}
            <TableRow>
              <TableCell colSpan={4} align="center"><Typography variant="h6">Total</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">{totals.totalLeads}</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">{totals.touchedLeads}</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">{totals.untouchedLeads}</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">{totals.totalAdmissions}</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">{totals.totalFollowUp3}</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">{totals.totalFollowUp2}</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">{totals.totalFollowUp1}</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">{totals.firstCallDone}</Typography></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
