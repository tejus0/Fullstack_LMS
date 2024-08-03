import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TableComponent from "../../component/TableComponent";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Link } from "react-router-dom";

export const AdmissionHeadCounsellor = () => {
  const baseUrl = import.meta.env.VITE_API;
  const [admissionHeadCouns, setAdmissionHeadCouns] = useState([]);
  const location = useLocation();
  console.log(location)
  const id = location.state?.id;


  
  const getAdmissionHeadCounsellorsWithStudents = async () => {
    try {
      const res = await axios.get(`${baseUrl}/getAdmissionHeadCounsellorsWithStudents/${id}`);
      setAdmissionHeadCouns(res.data.data);
    } catch (error) {
      console.log(error);
      setAdmissionHeadCouns([]);
    }
  };

  
  useEffect(() => {
        getAdmissionHeadCounsellorsWithStudents();
  }, []);

  return (
    <div className="container mx-auto p-4">
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
              {/* <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Warm Leads</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Cold Leads</th> */}
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
                {/* <td className="px-4 py-2 text-sm text-center">{counsellorData.warmLeadCount}</td>
                <td className="px-4 py-2 text-sm text-center">{counsellorData.coldLeadCount}</td> */}
                <td className="px-4 py-2 text-sm cursor-pointer">
                  <Link to={`/counsellorDashboard/${counsellorData.counsellor._id}`} state={{state: id}}>
                  <HiOutlineDocumentReport fontSize={30} color="blue" title="Overall Summary"/>
                  </Link>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};
