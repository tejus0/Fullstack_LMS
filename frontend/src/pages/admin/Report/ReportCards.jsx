import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Box,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { useStateContext } from "../../../context/StateContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaSortAlphaDown } from "react-icons/fa";
import OfficeWiseTopPerformer from "../../../component/OfficeWiseTopPerformer";
import { HiOutlineDocumentReport } from "react-icons/hi";
import TableComponent from "../../../component/TableComponent";

const ReportCards = () => {
  const baseUrl = import.meta.env.VITE_API;
  const [allCounsData, setAllCounsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [CounstopPerformer, setCounsTopPerformer] = useState();
  // const { office, setOffice } = useStateContext();
  const [sortDes, setSortDes] = useState(true);
  const [searchBy, setSearchBy] = useState("all");
  const [data, setData] = useState();
  console.log(searchBy);
  const [loading, setLoading] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await toast.promise(
          axios.get(
           `${baseUrl}/getCounsellorsWithStudents`
         ),

         {
          loading: "Fetching Data ...",
          success: "Data fetched Successfully",
          error: "Failed to fetch Data"
        }

        )
        setAllCounsData(response.data);
        console.log(response.data,"all couns data in admin report table")
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

  console.log(filteredData);

  const countColdCallsByCounsellor = (students) => {
    let totalColdCalls = 0;
    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2.length>0) {
        if(student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1].subject.includes("Cold")){
          totalColdCalls+=1;
        }
      }
      // if (student.remarks.FollowUp2 && student.remarks.FollowUp2.length>0) {
      //   const lastFollowUp =
      //     student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1];
      //   if (lastFollowUp && lastFollowUp.subject.includes("Cold Call Done")) {
      //     totalColdCalls += 1;
      //   }
      // }
    });
    return totalColdCalls;
  };

  const countHotCallsByCounsellor = (students) => {
    let totalHotLeads = 0;
    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2.length>0) {
        if(student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1].subject.includes("Hot")){
          totalHotLeads+=1;
        }
        // const hotCallCount = student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1].subject.includes("Hot")
        // const hotCallCount = student.remarks.FollowUp2.reduce(
        //   (count, followup) => {
        //     if (followup.subject.includes("Lead")) {
        //       return count + 1;
        //     }
        //     return count;
        //   },
        //   0
        // );
        // totalHotLeads += hotCallCount;
      }
    });
    return totalHotLeads;
  };

  const countWarmCallsByCounsellor = (students) => {
    let totalWarmCalls = 0;
    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2.length>0) {
        if(student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1].subject.includes("Warm")){
          totalWarmCalls+=1;
        }
        // const warmCallCount = student.remarks.FollowUp2.reduce(
        //   (count, followup) => {
        //     if (followup.subject.includes("Warm")) {
        //       return count + 1;
        //     }
        //     return count;
        //   },
        //   0
        // );
        // totalWarmCalls += warmCallCount;
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
        if(student.remarks.FollowUp1[student.remarks.FollowUp1.length - 1].subject.includes("First")){
          totalCallsDone+=1;
        }
        // const totalCallsCount = student.remarks.FollowUp1.reduce(
        //   (count, followup) => {
        //     if (followup.subject.includes("First")) {
        //       return count + 1;
        //     }
        //     return count;
        //   },
        //   0
        // );
        // totalCallsDone += totalCallsCount;
      }
    });
    return totalCallsDone;
  };

  const noidaCounsData = filteredData.filter((item) => {
    return item.counsellor.counsellor_id.charAt(2).toLowerCase() === "n"
  }
  );
  const kanpurCounsData = filteredData.filter((item) =>{
    
    return item.counsellor.counsellor_id.charAt(2).toLowerCase() == 'k'
  }
);

useEffect(() => {
  topPerformer();
}, []);

const topPerformer = async () => {
  try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/getTopPerformer`);
      const totalPerformance = data.totalPerformance;
      const sortedPerformance = [...totalPerformance].sort(
        (a, b) => b.admission - a.admission
      );
      setCounsTopPerformer(sortedPerformance);
      setData(sortedPerformance);
      setLoading(false);
      console.log(sortedPerformance);
    } catch (error) {
      toast("Error in fetching");
    }
  };

  // const handleShowReport = (title) => {
  //   if (title === "Noida Office Leads") {
  //     setOffice("N");

  //   } else if (title === "Kanpur Office Leads") {
  //     setOffice("K");
  //   }
  // };

  const handleButtonClick = () => {
    if (searchBy === "all") {
      setCounsTopPerformer(data);
    } else {
      const prefix = searchBy === "noida" ? "ckn" : "ckk";
      console.log(prefix);
      const a = data.filter((item) => item.id.toLowerCase().startsWith(prefix));
      setCounsTopPerformer(a);
    }
  };

  useEffect(() => {
    console.log(CounstopPerformer);
  }, [CounstopPerformer]);

  // const renderTable = (data, title) => (
  //   <Box sx={{ my: 3 }}>
  //     {console.log(data)}
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //         bgcolor: "#f5f5f5",
  //         p: 1,
  //         borderRadius: 1,
  //       }}
  //     >
  //       <Typography variant="h5" component="div" sx={{ color: "#333" }}>
  //         {title}
  //       </Typography>

  //       <Link
  //         to={`/officeDashboard?office=${
  //           title === "Noida Office Leads" ? "N" : "K"
  //         }`}
  //       >
  //         <Button variant="contained" onClick={() => handleShowReport(title)}>
  //           {title === "Noida Office Leads" ? "Noida" : "Kanpur"} Office Report
  //         </Button>
  //       </Link>
  //     </Box>
  //     <TableContainer component={Paper} sx={{ mt: 2 }}>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>
  //               <Typography variant="h6">Name</Typography>
  //             </TableCell>
  //             <TableCell>
  //               <Typography variant="h6">Mobile</Typography>
  //             </TableCell>
  //             <TableCell>
  //               <Typography variant="h6">Email</Typography>
  //             </TableCell>
  //             <TableCell>
  //               <Typography variant="h6">Leads Unlocked</Typography>
  //             </TableCell>
  //             <TableCell>
  //               <Typography variant="h6">Total Calls Done</Typography>
  //             </TableCell>
  //             <TableCell>
  //               <Typography variant="h6">Hot Leads</Typography>
  //             </TableCell>
  //             <TableCell>
  //               <Typography variant="h6">Cold Leads</Typography>
  //             </TableCell>
  //             <TableCell>
  //               <Typography variant="h6">Warm Leads</Typography>
  //             </TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {data.map((item) => (
  //             <TableRow key={item.counsellor.counsellor_id}>
  //               <TableCell align="left">{item.counsellor.name}</TableCell>
  //               <TableCell align="left">{item.counsellor.mobile}</TableCell>
  //               <TableCell align="left">{item.counsellor.email}</TableCell>
  //               <TableCell align="center">{leadsUnlocked(item.students)}</TableCell>
  //               <TableCell align="center">{totalCallsDone(item.students)}</TableCell>
  //               <TableCell align="center">
  //                 {countHotCallsByCounsellor(item.students)}
  //               </TableCell>
  //               <TableCell align="center">
  //                 {countColdCallsByCounsellor(item.students)}
  //               </TableCell>
  //               <TableCell align="center">
  //                 {countWarmCallsByCounsellor(item.students)}
  //               </TableCell>
  //               <TableCell align="center">
  //                 <Link to={`/counsellorDashboard/${item.counsellor._id}`}>
  //                   <HiOutlineDocumentReport
  //                     fontSize={30}
  //                     color="blue"
  //                     className="cursor-pointer"
  //                     title="Overall Summary"
  //                   />
  //                 </Link>
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   </Box>
  // );

  return (
    <Box sx={{ display: "flex", p: 0, height: "100vh" }}>
      <Box
        sx={{
          width: "300px",
          mr: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Paper
          sx={{
            p: 2,
            bgcolor: "#f5f5f5",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            height: "100%",
            overflowY: "hidden",
            overflowX: "hidden",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            textAlign="center"
            sx={{ mb: 2, color: "#333" }}
          >
            Top Performers
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            textAlign="center"
            display="flex"
            alignItems="center"
            sx={{ mb: 2, color: "#333" }}
          >
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              name=""
              id=""
              className="p-2"
            >
              <option value="all">All</option>
              <option value="noida">Noida</option>
              <option value="kanpur">Kanpur</option>
            </select>
            <button
              onClick={handleButtonClick}
              className="text-sm bg-blue-800 text-white p-2"
            >
              Filter
            </button>
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ height: "calc(100% - 48px)" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell
                    display="flex"
                    align="left"
                    justifyContent="center"
                    padding="0px"
                    cursor="pointer"
                    alignItems="center"
                  >
                    Addmission
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="cursor-pointer">
                {loading
                  ? "Loading...."
                  : CounstopPerformer?.map((performer, index) => (
                      // <Link to={`/counsellorDashboard/${performer.id}`}>
                        <TableRow key={index} onClick={() => navigate(`/counsellorDashboard/${performer.objectId}`)}>
                          <TableCell>{performer.name}</TableCell>
                          <TableCell align="left">
                            {performer.admission}
                          </TableCell>
                        </TableRow>
                      // </Link>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <TextField
          label="Search by Counsellor Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{
            mb: 2,
            bgcolor: "#e0e0e0",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
          }}
        />
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          textAlign="center"
          sx={{ bgcolor: "#f5f5f5", p: 1, borderRadius: 1, color: "#333" }}
        >
          Report
        </Typography>
        <Box sx={{ overflowY: "auto", maxHeight: "calc(100% - 128px)" }}>
          {/* {renderTable(noidaCounsData, "Noida Office Leads")}
          {renderTable(kanpurCounsData, "Kanpur Office Leads")} */}
          <TableComponent
            data={noidaCounsData}
            title="Noida Office Leads"
            leadsUnlocked={leadsUnlocked}
            totalCallsDone={totalCallsDone}
            countHotCallsByCounsellor={countHotCallsByCounsellor}
            countColdCallsByCounsellor={countColdCallsByCounsellor}
            countWarmCallsByCounsellor={countWarmCallsByCounsellor}
          />
          <TableComponent
            data={kanpurCounsData}
            title="Kanpur Office Leads"
            leadsUnlocked={leadsUnlocked}
            totalCallsDone={totalCallsDone}
            countHotCallsByCounsellor={countHotCallsByCounsellor}
            countColdCallsByCounsellor={countColdCallsByCounsellor}
            countWarmCallsByCounsellor={countWarmCallsByCounsellor}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ReportCards;
