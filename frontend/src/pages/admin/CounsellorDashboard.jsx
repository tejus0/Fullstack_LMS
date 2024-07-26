import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import MaterialTable, { createData } from '../../component/MaterialTable';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { ArrowUpward } from '@mui/icons-material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MaterialPieChart from '../../component/MaterialPieChart';

const baseUrl = import.meta.env.VITE_API;

const CounsellorDashboard = () => {
    const counsellorId = useParams().counsellorId;
    const [revenue, setRevenue] = useState({ totalRevenue: 0, thisMonthRevenue: 0 });
    const [counsellorName, setCounsellorName] = useState("Counsellor");
    const [coursesCounselled, setCoursesCounselled] = useState([]);
    const [counsellorLeadDetails, setCounsellorLeadDetails] = useState({ totalLeads: 0, completedLeads: 0, firstCallDone: 0, hotLeads: 0, warmLeads: 0, coldLeads: 0, paidCounselling: 0, associateCollege: 0 });
    const [pendingAmountTableData, setPendingAmountTableData] = useState([]);
    const rows = [
        createData('First Call Done', counsellorLeadDetails.firstCallDone),
    ];
    const rows2 = [
        createData('Hot Leads', counsellorLeadDetails.hotLeads),
        createData('Warm Leads', counsellorLeadDetails.warmLeads),
        createData('Cold Leads', counsellorLeadDetails.coldLeads),
    ];
    const rows3 = [
        createData('Paid Counselling', counsellorLeadDetails.paidCounselling),
        createData('Associate College', counsellorLeadDetails.associateCollege),
    ];

    const revenueDetails = [
        {
            label: "Total Leads Assigned",
            value: revenue.totalRevenue
        },
        {
            label: "Total Admissions",
            value: revenue.thisMonthRevenue
        },
        {
            label: "Total Revenue",
            value: revenue.totalRevenue
        },
        {
            label: "This Month Revenue",
            value: revenue.thisMonthRevenue
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
        { id: 0, value: counsellorLeadDetails.completedLeads, caption: "Completed Leads" },
        { id: 1, value: counsellorLeadDetails.totalLeads, caption: "Total Leads" },
    ];
    const tableData = [
        {
            "row": rows,
            caption: "FollowUp 1"
        },
        {
            "row": rows2,
            caption: "FollowUp 2"
        },
        {
            "row": rows3,
            caption: "FollowUp 3"
        },
    ]

    const fetchRevenueDetails = async () => {
        try {
            let revenueDetails = await axios.get(`${baseUrl}/getCounsellorRevenueDetails/${counsellorId}`);
            revenueDetails = revenueDetails.data;
            setRevenue({ totalRevenue: revenueDetails.data.totalRevenue, thisMonthRevenue: revenueDetails.data.thisMonthRevenue });
            setCounsellorName(revenueDetails.data.counsellorName)
        } catch (err) {
            console.log(err);
        }

    }

    const fetchCoursesCounselled = async () => {
        try {
            let res = await axios.get(`${baseUrl}/getCoursesCounselled/${counsellorId}`);
            res = res.data;
            setCoursesCounselled(res.data);

        } catch (err) {
            console.log(err);

        }
    }

    const fetchCounsellorLeadDetails = async () => {
        try {
            let res = await axios.get(`${baseUrl}/getCounsellorLeadDetails/${counsellorId}`);
            res = res.data;
            setCounsellorLeadDetails({ ...res, firstCallDone: res.stage1Obj.firstCallDone, hotLeads: res.stage2Obj.hotLeads, coldLeads: res.stage2Obj.coldLeads, warmLeads: res.stage2Obj.warmLeads, paidCounselling: res.stage3Obj.paidCounselling, associateCollege: res.stage3Obj.associateCollege });
        } catch (err) {
            console.log(err)
        }
    }

    const fetchPendingAmountDetails = async () => {
        try {
            let res = await axios.get(`${baseUrl}/getCounsellorPendingAmount/${counsellorId}`);
            let data = res.data.data;
            data = data.map((elem, i) => ({
                name: elem.name,
                value: elem.pendingAmount
            }))
            setPendingAmountTableData(data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRevenueDetails();
        fetchCoursesCounselled();
        fetchCounsellorLeadDetails();
        fetchPendingAmountDetails();
    }, [])

    return (
        <div className="">
            <div className="flex flex-col gap-2 justify-between p-0">
                <div className="p-9 text-2xl font-semibold flex flex-col gap-9">
                    {/* Name Container */}
                    <div className="w-full text-purple-500">
                        <p>Hi {counsellorName}</p>
                    </div>
                    {/* Revenue Card Container */}
                    <div className="w-full flex gap-24">
                        {/* card */}
                        {
                            revenueDetails.map((elem, i) => (
                                <div className="border-[1px] p-5 rounded-lg cursor-pointer px-12 hover:bg-purple-300 bg-purple-100 shadow-purple-400 shadow-2xl flex flex-col gap-4" key={i}>
                                    <p className="font-extralight text-lg">{elem.label}</p>
                                    <div className='flex gap-5 items-center text-lg'>
                                        <p>{elem.value}</p>
                                        <ArrowUpward color='success' />
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                    {/* chart container */}
                    <div className='w-full p-5 bg-purple-50 rounded-lg flex shadow-purple-400 shadow-2xl border-[0.1px]'>
                        <div className='flex flex-col gap-4'>
                            <p>Daily Report</p>
                            {/* <PieChart
                                series={[
                                    {
                                        arcLabel: (item) => `${item.caption}`,
                                        arcLabelMinAngle: 45,
                                        data: leadsChartsData,
                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        
                                    },
                                ]}
                                sx={{
                                    [`& .${pieArcLabelClasses.root}`]: {
                                        fill: 'white',
                                        fontWeight: 'bold',
                                        fontSize: "10px"
                                    },
                                }}
                                width={400}
                                height={200}

                            /> */}
                            <MaterialPieChart />
                        </div>
                        <div className='flex gap-4 flex-col'>
                            {
                                tableData.map((elem, i) => (
                                    <MaterialTable rows={elem.row} caption={elem.caption} key={i} bgColor='purple' />
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex justify-between gap-12 w-full'>
                        {/* Pending Amount Table Container */}
                        <div className='flex-1 w-full p-5 bg-purple-50 rounded-lg flex shadow-purple-400 shadow-2xl border-[0.1px] flex-col gap-4'>
                            <p>Pending Amount</p>
                            <MaterialTable rows={pendingAmountTableData} bgColor='purple' />
                        </div>
                        <div className="flex-1 bg-purple-50 rounded-lg shadow-purple-400 shadow-xl p-5 px-4">
                            {/* Heading */}
                            <div>
                                <p className="font-semibold text-xl text-start">Courses Counselled</p>
                            </div>
                            {/* College list container */}
                            <div className="p-5 flex flex-col gap-5 overflow-y-auto">
                                {
                                    coursesCounselled.map((elem, i) => (
                                        <div className="flex gap-4 text-sm font-light">
                                            <p>
                                                <AccountBalanceIcon color={"secondary"} />
                                            </p>
                                            <p>{elem.course}</p>
                                            <p>{elem.count}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}


export default CounsellorDashboard;