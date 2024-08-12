import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { CollegeNames } from "../Registration/CollegeNames";

export default function SeniorAdmHead() {
    const [counsellors, setCounsellors] = useState([]);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [selectedColleges, setSelectedColleges] = useState([]);

  const baseUrl = import.meta.env.VITE_API;


  const handleAssign = async () =>{
    const assignCollegeMapping = {
        counsellorID: selectedCounsellor,
        colleges: selectedColleges
    }
    try {
        const res = await axios.post(`${baseUrl}/assignCollegesSeniorAdmHead`, assignCollegeMapping, {withCredentials:true})
    } catch (error) {
        console.log(error);
    }
  }

  const getCounsellorData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/getCounsellorInfo`,{withCredentials:true});
      setCounsellors(res.data.data);
    } catch (error) {
      console.log(error);
      setCounsellors([]);
    }
  };

  const counsellorOptions = counsellors?.map((element) => {
    return {value: element._id , label: element.name}
  })

  const collegeOptions = CollegeNames.map((element) => {
    return {value: element.website, label: element.name}
  })

  useEffect(() =>{
    getCounsellorData();
  }, [])


  useEffect(() =>{
    console.log(selectedCounsellor, selectedColleges);
  }, [selectedCounsellor, selectedColleges])

    
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Assign Senior Admission Head</h1>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Select Counsellor</label>
      <Select
        options={counsellorOptions}
        onChange={(selectedOption) => setSelectedCounsellor(selectedOption?.value)}
        className="w-full"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Select Colleges</label>
      <Select
        isMulti
        options={collegeOptions}
        onChange={(selectedOptions) => setSelectedColleges(selectedOptions.map(option => option.value))}
        className="w-full"
      />
    </div>
    <button
      onClick={handleAssign}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Assign
    </button>
  </div>
  );
}
