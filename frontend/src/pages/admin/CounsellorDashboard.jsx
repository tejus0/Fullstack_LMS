import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import MaterialTable, { createData } from "../../component/MaterialTable";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { ArrowUpward } from "@mui/icons-material";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import MaterialPieChart from "../../component/NivoPieChart";
import NivoPieChart from "../../component/NivoPieChart";
import { SiGoogleads } from "react-icons/si";
import { IoSchool } from "react-icons/io5";
import { FaMoneyBill1 } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa6";
import StyledCard from "../../component/StyledCard";

export const baseUrl = import.meta.env.VITE_API;

const CounsellorDashboard = () => {
  const counsellorId = useParams().counsellorId;
  const [revenue, setRevenue] = useState({
    totalRevenue: 0,
    thisMonthRevenue: 0,
  });
  const [counsellorName, setCounsellorName] = useState("Counsellor");
  const [coursesCounselled, setCoursesCounselled] = useState([]);
  const [counsellorLeadDetails, setCounsellorLeadDetails] = useState({
    totalLeads: 0,
    completedLeads: 0,
    firstCallDone: 0,
    switchOff: 0,
    disconnect: 0,
    networkIssue: 0,
    notReachable: 0,
    hotLeads: 0,
    warmLeads: 0,
    coldLeads: 0,
    paidCounselling: 0,
    associateCollege: 0,
    incomingNotAvailable: 0,
    notReceived: 0
  });
  const [pendingAmountTableData, setPendingAmountTableData] = useState([]);
  const [totalFollowUp1, setTotalFollowUp1] = useState(0);
  const [totalFollowUp2, setTotalFollowUp2] = useState(0);
  const [totalFollowUp3, setTotalFollowUp3] = useState(0);

  const [assignedStudents, setAssignedStudents] = useState([]);
  const {state} = useLocation();
  // const state = {admissionHeadId : '66aa1bfb3cbc36b246e236b3'}

  const rows = [
    createData("First Call Done", counsellorLeadDetails.firstCallDone),
  ];
  const rows2 = [
    createData("Hot Leads", counsellorLeadDetails.hotLeads),
    createData("Warm Leads", counsellorLeadDetails.warmLeads),
    createData("Cold Leads", counsellorLeadDetails.coldLeads),
  ];
  const rows3 = [
    createData("Paid Counselling", counsellorLeadDetails.paidCounselling),
    createData("Associate College", counsellorLeadDetails.associateCollege),
  ];

  const revenueDetails = [
    {
      label: "Total Leads Assigned",
      value: counsellorLeadDetails.totalLeads,
      icon: <SiGoogleads fontSize={30} color="purple" />,
    },
    {
      label: "Total Admissions",
      value: counsellorLeadDetails.completedLeads,
      icon: <IoSchool fontSize={30} color="purple" />,
    },
    {
      label: "Total Revenue",
      value: revenue.totalRevenue,
      icon: <FaMoneyBill1 fontSize={30} color="purple" />,
    },
    {
      label: "This Month Revenue",
      value: revenue.thisMonthRevenue,
      icon: <FaMoneyCheck fontSize={30} color="purple" />,
    },
  ];
  // const coursesCounselled = [
  //     {
  //         name: "BAMS",
  //         count: 22
  //     },
  //     {
  //         name: "MBBS",
  //         count: 22
  //     },
  //     {
  //         name: "JEE",
  //         count: 22
  //     },
  //     {
  //         name: "NEET",
  //         count: 22
  //     },
  // ];
  const leadsChartsData = [
    {
      id: 0,
      value: counsellorLeadDetails.completedLeads,
      caption: "Completed Leads",
    },
    { id: 1, value: counsellorLeadDetails.totalLeads, caption: "Total Leads" },
  ];
  const tableData = [
    {
      row: rows,
      caption: "FollowUp 1",
    },
    {
      row: rows2,
      caption: "FollowUp 2",
    },
    {
      row: rows3,
      caption: "FollowUp 3",
    },
  ];

  const fetchRevenueDetails = async () => {
    try {
      let revenueDetails = await axios.get(
        `${baseUrl}/getCounsellorRevenueDetails/${counsellorId}${state && state.admissionHeadId ? `?admissionHeadId=${state.admissionHeadId}` : ''}`
      );
      revenueDetails = revenueDetails.data;
      setRevenue({
        totalRevenue: revenueDetails.data.totalRevenue,
        thisMonthRevenue: revenueDetails.data.thisMonthRevenue,
      });
      setCounsellorName(revenueDetails.data.counsellorName);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCoursesCounselled = async () => {
    try {
      let res = await axios.get(
        `${baseUrl}/getCoursesCounselled/${counsellorId}${state && state.admissionHeadId ? `?admissionHeadId=${state.admissionHeadId}` : ''}`
      );
      res = res.data;
      setCoursesCounselled(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCounsellorLeadDetails = async () => {
    try {
      let res = await axios.get(
        `${baseUrl}/getCounsellorLeadDetails/${counsellorId}${state && state.admissionHeadId ? `?admissionHeadId=${state.admissionHeadId}` : ''}`
      );
      res = res.data;
      const stage1Total = Object.values(res.stage1Obj).reduce(
        (acc, val) => acc + val,
        0
      );
      const stage2Total = Object.values(res.stage2Obj).reduce(
        (acc, val) => acc + val,
        0
      );
      const stage3Total = Object.values(res.stage3Obj).reduce(
        (acc, val) => acc + val,
        0
      );

      setTotalFollowUp1(stage1Total);
      setTotalFollowUp2(stage2Total);
      setTotalFollowUp3(stage3Total);

      setCounsellorLeadDetails({
        ...res,
        firstCallDone: res.stage1Obj.firstCallDone,
        switchOff: res.stage1Obj.switchOff,
        notReachable: res.stage1Obj.notReachable,
        disconnect: res.stage1Obj.disconnect,
        networkIssue: res.stage1Obj.networkIssue,
        incomingNotAvailable: res.stage1Obj.incomingNotAvailable,
        notReceived: res.stage1Obj.notReceived,
        hotLeads: res.stage2Obj.hotLeads,
        coldLeads: res.stage2Obj.coldLeads,
        warmLeads: res.stage2Obj.warmLeads,
        paidCounselling: res.stage3Obj.paidCounselling,
        associateCollege: res.stage3Obj.associateCollege,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(totalFollowUp1, totalFollowUp2, totalFollowUp3);

  const fetchPendingAmountDetails = async () => {
    try {
      let res = await axios.get(
        `${baseUrl}/getCounsellorPendingAmount/${counsellorId}${state && state.admissionHeadId ? `?admissionHeadId=${state.admissionHeadId}` : ''}`
      );
      let data = res.data.data;
      data = data.map((elem, i) => ({
        name: elem.name,
        value: elem.pendingAmount,
      }));
      setPendingAmountTableData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRevenueDetails();
    fetchCoursesCounselled();
    fetchCounsellorLeadDetails();
    fetchPendingAmountDetails();
  }, []);

  const followUp_3 = [
    {
      id: "Paid Counselling",
      label: `Paid Counselling (${counsellorLeadDetails.paidCounselling})`,
      value: (
        (counsellorLeadDetails.paidCounselling / totalFollowUp3) *
        100
      ).toFixed(2),
      color: "hsl(127, 70%, 50%)",
    },
    {
      id: "Associate College",
      label: `Associate College (${counsellorLeadDetails?.associateCollege})`,
      value: (
        (counsellorLeadDetails?.associateCollege / totalFollowUp3) *
        100
      ).toFixed(2),
      color: "hsl(239, 70%, 50%)",
    },
  ];

  const followUp_2 = [
    {
      id: "Hot Lead",
      label: `Hot Lead (${counsellorLeadDetails?.hotLeads})`,
      value: ((counsellorLeadDetails?.hotLeads / totalFollowUp2) * 100).toFixed(
        2
      ),
      color: "hsl(127, 70%, 50%)",
    },
    {
      id: "Warm",
      label: `Warm (${counsellorLeadDetails?.warmLeads})`,
      value: (
        (counsellorLeadDetails?.warmLeads / totalFollowUp2) *
        100
      ).toFixed(2),
      color: "hsl(239, 70%, 50%)",
    },
    {
      id: "Cold Call Done",
      label: `Cold Call Done (${counsellorLeadDetails?.coldLeads})`,
      value: (
        (counsellorLeadDetails?.coldLeads / totalFollowUp2) *
        100
      ).toFixed(2),
      color: "hsl(239, 70%, 50%)",
    },
  ];

  const followUp_1 = [
    {
      id: "Switch Off",
      label: `Switch Off (${counsellorLeadDetails?.switchOff})`,
      value: (
        (counsellorLeadDetails?.switchOff / totalFollowUp1) *
        100
      ).toFixed(2),
      color: "hsl(127, 70%, 50%)",
    },
    {
      id: "Not Reachable",
      label: `Not Reachable (${counsellorLeadDetails?.notReachable})`,
      value: (
        (counsellorLeadDetails?.notReachable / totalFollowUp1) *
        100
      ).toFixed(2),
      color: "hsl(239, 70%, 50%)",
    },
    {
      id: "Disconnect",
      label: `Disconnect (${counsellorLeadDetails?.disconnect})`,
      value: (
        (counsellorLeadDetails?.disconnect / totalFollowUp1) *
        100
      ).toFixed(2),
      color: "hsl(239, 70%, 50%)",
    },
    {
      id: "Network Issue",
      label: `Network Issue (${counsellorLeadDetails?.networkIssue})`,
      value: (
        (counsellorLeadDetails?.networkIssue / totalFollowUp1) *
        100
      ).toFixed(2),
      color: "hsl(239, 70%, 50%)",
    },
    {
      id: "First Call Done",
      label: `First Call Done (${counsellorLeadDetails?.firstCallDone})`,
      value: (
        (counsellorLeadDetails?.firstCallDone / totalFollowUp1) *
        100
      ).toFixed(2),
      color: "hsl(239, 70%, 50%)",
    },
    {
      id: "Not Received",
      label: `Not Received (${counsellorLeadDetails?.notReceived})`,
      value: (
        (counsellorLeadDetails?.notReceived / totalFollowUp1) *
        100
      ).toFixed(2),
      color: "hsl(239, 70%, 50%)",
    },
    {
      id: "Incoming Not Available",
      label: `Incoming Not Available (${counsellorLeadDetails?.incomingNotAvailable})`,
      value: (
        (counsellorLeadDetails?.incomingNotAvailable / totalFollowUp1) *
        100
      ).toFixed(2),
      color: "hsl(239, 70%, 50%)",
    },
  ];

  const getAssignedStudents = async () => {
    // try {
    //     const res = await toast.promise(
    //         axios.get(
    //             `${baseUrl}/getAssignedCounsellorStudents/${counsellorId}`
    //         )
    //         console.log(res.data)
    //     )
    // } catch (error) {
    //     console.log(error)
    // }
    try {
      const res = await axios.get(
        `${baseUrl}/getAssignedCounsellorStudents/${counsellorId}${state && state.admissionHeadId ? `?admissionHeadId=${state.admissionHeadId}` : ''}`
      );

      setAssignedStudents(res.data.data);
    } catch (error) { }
  };

  useEffect(() => {
    console.log(assignedStudents);
  }, [assignedStudents]);

  useEffect(() => {
    getAssignedStudents();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col gap-2 justify-between p-0">
        <div className="p-4 md:p-9 text-2xl font-semibold flex flex-col gap-9">
          {/* Name Container */}
          <div className="w-full text-purple-500 flex justify-center md:justify-start text-2xl md:text-4xl">
            <p>Hi {counsellorName}</p>
          </div>
          {/* Revenue Card Container */}
          <div className="w-full flex gap-12 p-3 md:p-0 md:gap-24 flex-wrap justify-center">
            {/* card */}
            {revenueDetails.map((elem, i) => (
                <StyledCard icon={elem.icon} label={elem.label} value={elem.value} key={i}/>
            ))}
          </div>

          {/* New Section with NivoPieCharts */}
          <div className="w-full flex gap-12 flex-col md:flex-row">
            <div className="flex-1 flex flex-col gap-4">
              <p className="font-semibold text-xl md:text-start text-center">
                FollowUp 3: <span className="p-1 rounded-lg px-3 bg-gray-400 text-white">{totalFollowUp3}</span>
              </p>
              <div
                  className="bg-purple-50 rounded-lg shadow-purple-400 shadow-2xl w-full md:w-auto flex justify-center items-center"
                  style={{ height: "300px" }}
                >
                <NivoPieChart data={followUp_3} students={assignedStudents} />
                {/* <div className="text-center">Total FollowUp3 : {totalFollowUp3}</div> */}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <p className="font-semibold text-xl text-center md:text-start">
                FollowUp 2: <span className="p-1 rounded-lg px-3 bg-gray-400 text-white">{totalFollowUp2}</span>
              </p>
              <div
                  className="bg-purple-50 rounded-lg shadow-purple-400 shadow-2xl w-full md:w-auto flex justify-center items-center"
                  style={{ height: "300px" }}
                >
                <NivoPieChart data={followUp_2} students={assignedStudents} />
                {/* <div className="text-center">Total FollowUp2 : {totalFollowUp2}</div> */}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <p className="font-semibold text-xl text-center md:text-start">
                FollowUp 1: <span className="p-1 rounded-lg px-3 bg-gray-400 text-white">{totalFollowUp1}</span>
              </p>
              <div
                  className="bg-purple-50 rounded-lg shadow-purple-400 shadow-2xl w-full md:w-auto flex justify-center items-center"
                  style={{ height: "300px" }}
                >
                <NivoPieChart data={followUp_1} students={assignedStudents} />
                {/* <div className="text-center">Total FollowUp1 : {totalFollowUp1}</div> */}
              </div>
            </div>
          </div>




          <div className="flex justify-between gap-12 w-full flex-col md:flex-row">
            {/* Pending Amount Table Container */}
            <div className="flex-1 w-full p-5 bg-purple-50 rounded-lg flex shadow-purple-400 shadow-2xl border-[0.1px] flex-col gap-4">
              <p>Pending Amount</p>
              <MaterialTable rows={pendingAmountTableData} bgColor="purple" />
            </div>
            <div className="flex-1 bg-purple-50 rounded-lg shadow-purple-400 shadow-xl p-5 px-4">
              {/* Heading */}
              <div>
                <p className="font-semibold text-xl text-start">
                  Courses Counselled
                </p>
              </div>
              {/* College list container */}
              <div className="p-5 flex flex-col gap-5 overflow-y-auto">
                {coursesCounselled.map((elem, i) => (
                  <div className="flex gap-4 text-sm font-light">
                    <p>
                      <AccountBalanceIcon color={"secondary"} />
                    </p>
                    <p>{elem.course}</p>
                    <p>{elem.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorDashboard;
