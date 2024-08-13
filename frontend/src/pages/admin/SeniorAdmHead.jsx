import React, { useEffect, useState } from "react";
import Select from "react-select";
import FolderTreeView from "../../component/FolderTreeView";
import LoadingBar from '../../assets/folder-loading.gif'
import Navbar from "../../component/navbar/Navbar";
import axios from "axios";
import { CollegeNames } from "../Registration/CollegeNames";
import toast from "react-hot-toast";

export default function SeniorAdmHead() {
  const [counsellors, setCounsellors] = useState([]);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [assignedColleges, setAssignedColleges] = useState([]);
  const [counsellorData, setCounsellorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const baseUrl = import.meta.env.VITE_API;


  const handleAssign = async () =>{
    const assignCollegeMapping = {
        counsellorID: selectedCounsellor,
        colleges: selectedColleges
    }
    try {
        setLoadingSubmit(true)
        const res = await axios.post(`${baseUrl}/assignCollegesSeniorAdmHead`, assignCollegeMapping, {withCredentials:true})
    } catch (error) {
        console.log(error);
        toast.error("Some Error occurred while assigning")
    }finally{
      setLoadingSubmit(false)
    }
  }

  const getCounsellorData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/getCounsellorInfo`, { withCredentials: true });
      setCounsellors(res.data.data);
    } catch (error) {
      console.log(error);
      setCounsellors([]);
    }
  };

  const counsellorOptions = counsellors?.map((element) => {
    return {value: element._id , label: element.name}
  })

  // const collegeOptions = CollegeNames.map((element) => {
  //   return {value: element.website, label: element.name}
  // })

  const fetchSeniorAdmHeadData = async()=>{
    try {
      setLoading(true)
      const res = await axios.get(`${baseUrl}/getAllSeniorAdmHeads` , {withCredentials:true})
      console.log(res.data)
      const finalData = res.data?.seniorAdmHeads?.map((item , i)=>{
        const collegeNameWithUrls = item.multiple_colleges.map(elem=>{
          const name = CollegeNames.filter(obj=>obj.website == elem)[0].name;
          return {
            name,
            type:'file',
            link:elem
          }
        });
        return {
          name: item.name,
          type:'folder',
          children : collegeNameWithUrls
        }
      });
      console.log(finalData)
      setCounsellorData(finalData)
    } catch (err) {
      console.log(err);
      
    }finally{
      setLoading(false)
    }
  }


  const fetchAssignedColleges = async () => {
    try {
      const res = await axios.get(`${baseUrl}/getAssignedColleges`, { withCredentials: true });
      setAssignedColleges(res.data.assignedColleges);
    } catch (error) {
      console.log(error);
      setAssignedColleges([])
    }
  };


  const filteredCollegeOptions = CollegeNames?.
  filter((college) => !assignedColleges?.includes(college.website))
  .map((element) => {
    return {value: element.website, label: element.name}
  })
  // const sampleData = [
  //   {
  //     name: 'Shivam Driwedi',
  //     type: 'folder',
  //     children: [
  //       { name: 'JKN Ayurvedic College', type: 'file', link: "#" },
  //       { name: 'MSB College', type: 'file', link: "#" },

  //     ]
  //   },
  //   {
  //     name: 'Rakesh Kumar',
  //     type: 'folder',
  //     children: [
  //       { name: 'Shri Babu Ram College', type: 'file', link: "#" },
  //       { name: 'Shakuntala Devi Ayurvedic College', type: 'file', link: "#" }
  //     ]
  //   },
  //   {
  //     name: 'Shivam Driwedi',
  //     type: 'folder',
  //     children: [
  //       { name: 'JKN Ayurvedic College', type: 'file', link: "#" },
  //       { name: 'MSB College', type: 'file', link: "#" },

  //     ]
  //   },
  //   {
  //     name: 'Rakesh Kumar',
  //     type: 'folder',
  //     children: [
  //       { name: 'Shri Babu Ram College', type: 'file', link: "#" },
  //       { name: 'Shakuntala Devi Ayurvedic College', type: 'file', link: "#" }
  //     ]
  //   },
  // ];


  useEffect(() => {
    getCounsellorData();
    fetchSeniorAdmHeadData();
    fetchAssignedColleges();
    // setLoading(true);
    // setTimeout(() => {
    //   setCounsellorData(sampleData)
    //   setLoading(false);
    // }, 4000);
  }, [])

  return (
    <div className="flex gap-9">
      <Navbar/>
      <div className="pl-16 p-9 flex flex-col gap-12 w-full">
        <div>
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
              options={filteredCollegeOptions}
              onChange={(selectedOptions) => setSelectedColleges(selectedOptions.map(option => option.value))}
              className="w-full"
            />
          </div>
          <button
              onClick={handleAssign}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
           {loadingSubmit ? "Asigning..." : "Assign"}
          </button>
        </div>
        {/* report */}
        <div className="flex flex-col gap-9">
          <p className="text-2xl font-bold">Report</p>
          <div className="p-9 bg-[#0e71e909] rounded-md shadow-2xl ">
            {
              !loading ?
                counsellorData.length ?
                  <FolderTreeView data={counsellorData} />
                  :
                  <p className="text-xl  text-center text-gray-500">
                    No Data Available
                  </p>

                :
                <div className="flex justify-center items-center">
                  <img src={LoadingBar} alt="loading" title="loading..." />
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
