import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TableComponent from "../../component/TableComponent";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const AdmissionHeadCounsellor = () => {
  const baseUrl = import.meta.env.VITE_API;
  const [admissionHeadCouns, setAdmissionHeadCouns] = useState([]);
  const location = useLocation();
  console.log(location)
  const id = location.state?.id;


  
  const getAdmissionHeadCounsellorsWithStudents = async () => {
    try {
      const res = await toast.promise(
        axios.get(
          `${baseUrl}/getAdmissionHeadCounsellorsWithStudents/${id}`
        ), 
        {
          loading: "Fetching Data ...",
          success: "Data Fetched Successfully",
          error: "Failed to fetch data"
        }
        
      )
      setAdmissionHeadCouns(res.data.data);
    } catch (error) {
      console.log(error);
      setAdmissionHeadCouns([]);
    }
  };

  
  useEffect(() => {
        getAdmissionHeadCounsellorsWithStudents();
  }, []);

  const topPerformers = [...admissionHeadCouns]
    .sort((a, b) => b.totalAdmissions - a.totalAdmissions)
    .slice(0, 5); // Change the number to display more/less top performers

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-4">Admission Head Counsellors Report</h1>
    //   <div className="overflow-x-auto">
    //     <table className="min-w-full bg-white border border-gray-200">
    //       <thead className="bg-gray-100 border-b">
    //         <tr>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Mobile No</th>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total Leads</th>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total Calls Done</th>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total Revenue</th>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total Admissions</th>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Paid Counselling</th>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Associate College</th>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Hot Leads</th>
    //           {/* <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Warm Leads</th>
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Cold Leads</th> */}
    //           <th className="px-4 py-2 text-left text-sm font-medium text-gray-600"></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {admissionHeadCouns.map((counsellorData, index) => (
    //           <tr key={index} className="border-b">
    //             <td className="px-4 py-2 text-sm">{counsellorData.counsellor.name}</td>
    //             <td className="px-4 py-2 text-sm">{counsellorData.counsellor.email}</td>
    //             <td className="px-4 py-2 text-sm">{counsellorData.counsellor.mobile}</td>
    //             <td className="px-4 py-2 text-sm text-center">{counsellorData.totalLeads}</td>
    //             <td className="px-4 py-2 text-sm text-center">{counsellorData.totalCallsDone}</td>
    //             <td className="px-4 py-2 text-sm text-center">{counsellorData.totalRevenue}</td>
    //             <td className="px-4 py-2 text-sm text-center">{counsellorData.totalAdmissions}</td>
    //             <td className="px-4 py-2 text-sm text-center">{counsellorData.paidCounselingCount}</td>
    //             <td className="px-4 py-2 text-sm text-center">{counsellorData.associateCollegeCount}</td>
    //             <td className="px-4 py-2 text-sm text-center">{counsellorData.hotLeadCount}</td>
    //             {/* <td className="px-4 py-2 text-sm text-center">{counsellorData.warmLeadCount}</td>
    //             <td className="px-4 py-2 text-sm text-center">{counsellorData.coldLeadCount}</td> */}
    //             <td className="px-4 py-2 text-sm cursor-pointer">
    //               <Link to={`/counsellorDashboard/${counsellorData.counsellor._id}`} state={{state: id}}>
    //               <HiOutlineDocumentReport fontSize={30} color="blue" title="Overall Summary"/>
    //               </Link>
    //               </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

    <div className="container mx-auto p-4 flex">
      {/* Top Performers Section */}
      <div className="w-1/4 pr-4">
        <h2 className="text-xl font-bold mb-4">Top Performers</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between border-b pb-2 mb-2">
            <span className="font-semibold">Name</span>
            <span className="font-semibold">Admissions</span>
          </div>
          {topPerformers.map((performer, index) => (
            <div key={index} className="flex justify-between py-2 border-b">
              <span>{performer.counsellor.name}</span>
              <span>{performer.totalAdmissions}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Report Section */}
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">Admission Head Counsellors Report</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Mobile No</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total Leads</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total Calls Done</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total Revenue</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total Admissions</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Paid Counselling</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Associate College</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Hot Leads</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Warm Leads</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Cold Leads</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {admissionHeadCouns.map((counsellorData, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 text-sm">{counsellorData.counsellor.name}</td>
                  <td className="px-4 py-2 text-sm">{counsellorData.counsellor.email}</td>
                  <td className="px-4 py-2 text-sm">{counsellorData.counsellor.mobile}</td>
                  <td className="px-4 py-2 text-sm text-center">{counsellorData.totalLeads}</td>
                  <td className="px-4 py-2 text-sm text-center">{counsellorData.totalCallsDone}</td>
                  <td className="px-4 py-2 text-sm text-center">{counsellorData.totalRevenue}</td>
                  <td className="px-4 py-2 text-sm text-center">{counsellorData.totalAdmissions}</td>
                  <td className="px-4 py-2 text-sm text-center">{counsellorData.paidCounselingCount}</td>
                  <td className="px-4 py-2 text-sm text-center">{counsellorData.associateCollegeCount}</td>
                  <td className="px-4 py-2 text-sm text-center">{counsellorData.hotLeadCount}</td>
                  <td className="px-4 py-2 text-sm text-center">{counsellorData.warmLeadCount}</td>
                  <td className="px-4 py-2 text-sm text-center">{counsellorData.coldLeadCount}</td>
                  <td className="px-4 py-2 text-sm text-center">
                    <Link to={`/counsellorDashboard/${counsellorData.counsellor._id}`} state={{ state: id }}>
                      <HiOutlineDocumentReport fontSize={30} color="blue" title="Overall Summary" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};
