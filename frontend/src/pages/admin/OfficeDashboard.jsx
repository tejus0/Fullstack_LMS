import React, { useEffect, useState } from 'react'
import StyledCard from '../../component/StyledCard'
import NivoPieChart from '../../component/NivoPieChart';
import axios from 'axios';
import useQuery from '../../hooks/useQuery';
import { baseUrl } from './CounsellorDashboard';
import { IoSchool } from 'react-icons/io5';
import { FaMoneyBill1, FaPeopleGroup, FaTrophy } from 'react-icons/fa6';
import { SiConvertio } from 'react-icons/si';
import MaterialTable from '../../component/MaterialTable';

const OfficeDashboard = () => {
    let office = useQuery().get("office") ?? "k";
    // console.log(office , office.search.split("=") , " query parameter")
    const [students, setStudents] = useState([]);
    const [officeReportDetails, setOfficeReportDetails] = useState({ totalAdmissions: 0, totalCounsellors: 0, totalRevenue: 0, conversionExpected: 0 })
    const [followUp_1_data, setFollowUp_1_data] = useState({
        "totalFollowUp1": 0,
        "switchOff": 0,
        "notReachable": 0,
        "disconnect": 0,
        "networkIssue": 0,
        "firstCallDone": 0
    })
    const [followUp_2_data, setFollowUp_2_data] = useState({ hotLead: 0, warmLead: 0, coldLead: 0, totalFollowUp2: 0 })
    const [followUp_3_data, setFollowUp_3_data] = useState({
        "totalFollowUp3": 0,
        "paidCounselling": 0,
        "associateCollege": 0
    });
    const [pendingAmountData, setPendingAmountData] = useState([])
    const [topPerformer, setTopPerformer] = useState([])
    const cards = [
        {
            label: "Total Admissions",
            value: officeReportDetails.totalAdmissions,
            icon: <IoSchool fontSize={30} color="purple" />
        },
        {
            label: "Total Revenue",
            value: officeReportDetails.totalRevenue,
            icon: <FaMoneyBill1 fontSize={30} color="purple" />
        },
        {
            label: "Total Counsellors",
            value: officeReportDetails.totalCounsellors,
            icon: <FaPeopleGroup fontSize={30} color="purple" />
        },
        {
            label: "Total Conversion",
            value: officeReportDetails.conversionExpected,
            icon: <SiConvertio fontSize={30} color="purple" />
        },
    ]

    const followUp_3 = [
        {
            id: "Paid Counselling",
            label: "Paid Counselling",
            value: (
                (followUp_3_data.paidCounselling / followUp_3_data.totalFollowUp3) *
                100
            ).toFixed(2),
            // value: followUp_3_data.paidCounselling,
            color: "hsl(127, 70%, 50%)",
        },
        {
            id: "Associate College",
            label: "Associate College",
            value: (
                (followUp_3_data?.associateCollege / followUp_3_data.totalFollowUp3) *
                100
            ).toFixed(2),
            // value: followUp_3_data.associateCollege
            color: "hsl(239, 70%, 50%)",
        },
    ];

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
    const followUp_1 = [
        {
            id: "Switch Off",
            label: "Switch Off",
            value: (
                (followUp_1_data?.switchOff / followUp_1_data.totalFollowUp1) *
                100
            ).toFixed(2),
            // value: followUp_1_data?.switchOff,
            color: "hsl(127, 70%, 50%)",
        },
        {
            id: "Not Reachable",
            label: "Not Reachable",
            value: (
                (followUp_1_data?.notReachable / followUp_1_data.totalFollowUp1) *
                100
            ).toFixed(2),
            // value: followUp_1_data?.notReachable,
            color: "hsl(239, 70%, 50%)",
        },
        {
            id: "Disconnect",
            label: "Disconnect",
            value: (
                (followUp_1_data?.disconnect / followUp_1_data.totalFollowUp1) *
                100
            ).toFixed(2),
            // value: followUp_1_data?.disconnect,
            color: "hsl(239, 70%, 50%)",
        },
        {
            id: "Network Issue",
            label: "Network Issue",
            value: (
                (followUp_1_data?.networkIssue / followUp_1_data.totalFollowUp1) *
                100
            ).toFixed(2),
            // value: followUp_1_data?.networkIssue,
            color: "hsl(239, 70%, 50%)",
        },
        {
            id: "First Call Done",
            label: "First Call Done",
            value: (
                (followUp_1_data?.firstCallDone / followUp_1_data.totalFollowUp1) *
                100
            ).toFixed(2),
            // value: followUp_1_data?.firstCallDone,
            color: "hsl(239, 70%, 50%)",
        },
    ];


    const chartData = [
        {
            label: "FollowUp 3",
            total: followUp_3_data.totalFollowUp3,
            data: followUp_3,
            data2: followUp_3_data
        },
        {
            label: "FollowUp 2",
            total: followUp_2_data.totalFollowUp2,
            data: followUp_2,
            data2: followUp_2_data
        },
        {
            label: "FollowUp 1",
            total: followUp_1_data.totalFollowUp1,
            data: followUp_1,
            data2: followUp_1_data
        },

    ]

    const pendingAmountTableData = [
        {
            name: "Akash",
            value: 2000
        },
        {
            name: "Akash",
            value: 2000
        },
        {
            name: "Akash",
            value: 2000
        },
        {
            name: "Akash",
            value: 2000
        },
    ]
    // const topPerformer = [
    //     "Rahul",
    //     "Amir",
    //     "Jalandar",
    //     "Rakesh"
    // ]

    const fetchReportDetails = async () => {
        try {
            const res = await axios.get(`${baseUrl}/getOfficeReport?office=${office}`);
            setOfficeReportDetails(res.data)
            setStudents(res.data.students)
            setFollowUp_1_data(res.data.followUp1)
            setFollowUp_2_data(res.data.followUp2)
            setFollowUp_3_data(res.data.followUp3)
            const data = res.data.pendingAmounts.map((item) => ({
                name: item.name,
                value: item.pendingAmount
            }))
            setPendingAmountData(data)
            console.log("Data is: ", res.data)
        } catch (err) {
            console.error(err)
        }
    }


    const fetchTopPerformer = async () => {
        try {
            const res = await axios.get(`${baseUrl}/getTopPerformer`);
            const filterTopPerformer = res.data.totalPerformance.filter((element) => element.id.charAt(2) === office.toUpperCase())
            setTopPerformer(filterTopPerformer)
            console.log(res.data)
        } catch (err) {
            console.error(err)
        }
    }


    useEffect(() =>{
        console.log(topPerformer)
    }, [topPerformer])



    useEffect(() => {
        fetchReportDetails();
        fetchTopPerformer();
    }, [])
    return (
        <div className='flex flex-col '>
            {/* Page Title  */}
            <div className='p-9 text-center md:text-start'>
                <p className='text-4xl font-semibold text-purple-400'>{office.toLowerCase() == 'k' ? 'Kanpur' : 'Noida'} Report</p>
            </div>
            {/* Card containers */}
            <div className='flex flex-col md:flex-row justify-center items-center gap-12 p-9'>
                {
                    cards.map((item, i) => (
                        <StyledCard label={item.label} value={item.value} icon={item.icon} key={i} />
                    ))
                }
            </div>

            {/* Daily Reports */}
            <div className='w-full flex justify-around flex-col items-center md:flex-row mt-9    '>
                {/* Follow Up Report */}
                {
                    chartData.map((item, i) => (
                        <div className='flex  flex-col  gap-4 w-[30%]' key={i}>
                            <p className='text-lg md:text-2xl font-semibold flex gap-5 justify-center'>
                                <span>{item.label}</span>
                                <span className=' bg-gray-400 px-4 rounded-sm text-white'>{item.total}</span>
                            </p>
                            {students.length ? Object.values(item.data2).every((val) => val == 0) ?
                                <p className='bg-purple-50 rounded-lg p-12 shadow-purple-400 shadow-2xl w-full h-[150px] flex justify-center items-center text-lg font-medium text-gray-700'>No Data Available</p>

                                :
                                <div
                                    className="bg-purple-50 rounded-lg p-12 shadow-purple-400 shadow-2xl w-auto border-[1px] border-gray-100"
                                    style={{ height: "300px" }}
                                >
                                    <NivoPieChart data={item.data} students={students} />
                                </div>
                                : "Chart is loading..."}
                        </div>
                    ))
                }
            </div>

            {/* Performance tables */}
            <div className="flex p-9 gap-9 flex-col md:flex-row">
                {/* Pending Amount Table Container */}
                <div className="flex-1 w-full p-5 bg-purple-50 rounded-lg flex shadow-purple-400 shadow-2xl border-[0.1px] flex-col gap-4">
                    <p className='text-xl font-semibold'>Pending Amount</p>
                    {pendingAmountData.length ? <MaterialTable rows={pendingAmountData} bgColor="purple" /> :
                        <div className='w-full h-[150px] flex justify-center items-center'>
                            <p className='text-xl text-gray-500'>No Data Available</p>
                        </div>
                    }
                </div>
                <div className="flex-1 bg-purple-50 rounded-lg shadow-purple-400 shadow-xl p-5 px-4 flex flex-col gap-5">
                    <p className='text-xl font-semibold'>Top Performer</p>
                    {topPerformer.length ? <div className='flex flex-col gap-5 p-9 overflow-y-auto h-[250px] border-[10px] rounded-lg border-purple-400'>
                        {
                            topPerformer.map((item, i) => (

                                <p key={i} className='cursor-pointer rounded-md hover:bg-purple-300 p-2 flex gap-4 items-center' title={`Admissions ${item.admission}`}>
                                    {i == 0 ? <FaTrophy size={30} color='orange' /> : ""}
                                    <span>{item.name}</span>
                                </p>

                            ))
                        }
                    </div> :
                        <div className='w-full h-[150px] flex justify-center items-center'>
                            <p className='text-xl text-gray-500'>No Data Available</p>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default OfficeDashboard