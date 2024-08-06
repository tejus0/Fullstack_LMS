import React from "react";
import { Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { HiOutlineDocumentReport } from "react-icons/hi";

const TableComponent = ({ data, title, leadsUnlocked, totalCallsDone, countHotCallsByCounsellor, countColdCallsByCounsellor, countWarmCallsByCounsellor }) => {
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
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>
                <Typography variant="h6">S. No.</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Mobile</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Leads Unlocked</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Total Calls Done</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Hot Leads</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Cold Leads</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Warm Leads</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item,index) => (
              <TableRow key={item.counsellor.counsellor_id}>
                <TableCell align="left">{index+1}</TableCell>
                <TableCell align="left">{item.counsellor.name}</TableCell>
                <TableCell align="left">{item.counsellor.mobile}</TableCell>
                <TableCell align="left">{item.counsellor.email}</TableCell>
                <TableCell align="center">{leadsUnlocked(item.students)}</TableCell>
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
