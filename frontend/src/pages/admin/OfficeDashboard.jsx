import React, { useEffect, useState } from 'react'
import StyledCard from '../../component/StyledCard'
import NivoPieChart from '../../component/NivoPieChart';
import axios from 'axios';
import useQuery from '../../hooks/useQuery';
import { baseUrl } from './CounsellorDashboard';

const OfficeDashboard = () => {
    let office = useQuery().get("office") ?? "k";
    // console.log(office , office.search.split("=") , " query parameter")
    const [students , setStudents] = useState([]);
    const [followUp_1_data , setFollowUp_1_data]  = useState({
        "totalFollowUp1": 0,
        "switchOff": 0,
        "notReachable": 0,
        "disconnect": 0,
        "networkIssue": 0,
        "firstCallDone": 0
    })
    const [followUp_2_data , setFollowUp_2_data]  = useState({hotLead:0 , warmLead: 0 , coldLead: 0 , totalFollowUp2: 0})
    const [followUp_3_data , setFollowUp_3_data]  = useState({
        "totalFollowUp3": 0,
        "paidCounselling": 0,
        "associateCollege": 0
    })
    const cards = [
        {
            label: "Total Admissions",
            value: "20000",
            icon: "ljdlkf"
        },
        {
            label: "Total Admissions",
            value: "20000",
            icon: "ljdlkf"
        },
        {
            label: "Total Admissions",
            value: "20000",
            icon: "ljdlkf"
        },
        {
            label: "Total Admissions",
            value: "20000",
            icon: "ljdlkf"
        },
    ]
    const followUp_2 = [
        {
          id: "Hot Lead",
          label: "Hot Lead",
          value: (followUp_2_data.hotLead / followUp_2_data?.totalFollowUp2 * 100).toFixed(
            2
          ),
          color: "hsl(127, 70%, 50%)",
        },
        {
          id: "Warm",
          label: "Warm",
          value: (
            (followUp_2_data.warmLead / followUp_2_data.totalFollowUp2) *
            100
          ).toFixed(2),
          color: "hsl(239, 70%, 50%)",
        },
        {
          id: "Cold Call Done",
          label: "Cold Call Done",
          value: (
            (followUp_2_data.coldLead / followUp_2_data.totalFollowUp2) *
            100
          ).toFixed(2),
          color: "hsl(239, 70%, 50%)",
        },
      ];


    const chartData = [
        
    ]

    const fetchReportDetails = async ()=>{
        try {
            const res = await axios.get(`${baseUrl}/getOfficeReport?office=${office}`);
            setStudents(res.data.students)
            setFollowUp_2_data(res.data.followUp2)
            console.log("Data is: " , res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(()=>{
        fetchReportDetails();
    },[])
    return (
        <div className='flex flex-col '>
            {/* Page Title  */}
            <div className='p-9'>
                <p className='text-2xl font-normal'>Office Report</p>
            </div>
            {/* Card containers */}
            <div className='flex gap-12 p-9'>
                {
                    cards.map((item, i) => (
                        <StyledCard label={item.label} value={item.value} icon={item.icon} key={i} />
                    ))
                }
            </div>

            {/* Daily Reports */}
            <div className='flex p-12 m-9 rounded-lg bg-purple-100 shadow-purple-300 shadow-2xl'>
                {/* Follow Up 1 Report */}
                <div className='flex flex-col gap-5 h-96'>
                    <p className='text-2xl font-semibold flex gap-5'>
                        <span>FollowUp 2</span>
                        <span className=' bg-gray-400 px-4 rounded-sm text-white'>{followUp_2_data.totalFollowUp2}</span>
                    </p>
                   {students.length ? <NivoPieChart data={followUp_2} students={students}/> : "Chart is loading..."}
                </div>
            </div>

        </div>
    )
}

export default OfficeDashboard