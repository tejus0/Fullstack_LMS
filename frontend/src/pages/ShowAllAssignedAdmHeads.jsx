import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar/Navbar';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse, Box } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import axios from 'axios';
import { baseUrl } from './admin/CounsellorDashboard';
import LoadingBar from '../assets/folder-loading.gif'
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const ShowAllAssignedAdmHeads = () => {
    const [open, setOpen] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataDeleted , setDataDeleted] = useState(false);
    const dispatch = useDispatch();

    const toggleRow = (index) => {
        setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
    };

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${baseUrl}/getAllSeniorAdmHeads`, { withCredentials: true });
            const arr = res.data.seniorAdmHeads;
            const finalData = [];
            for (let i = 0; i < arr.length; i++) {
                const elem = arr[i];
                const dt = await axios.get(`${baseUrl}/getSeniorAdmHeadReport?seniorAdmHeadID=${elem._id}`, { withCredentials: true });
                const formattedColleges = dt.data.reportData.map(college => ({
                    Name: college.college,
                    TotalRevenue : college.totalRevenue,
                    TotalAdmissions : college.totalAdmissions,
                    TotalCounsellors: college.totalCounsellors, // Assuming TotalCalls is the totalCounsellors
                    HotLeads: college.followUp2.hotLead,
                    WarmLeads: college.followUp2.warmLead,
                    PaidCounselling: college.followUp3.paidCounselling
                }));
                finalData.push({
                    name: elem.name,
                    id: elem._id,
                    colleges: formattedColleges
                });
            }
            setData(finalData);
        } catch (err) {
            if(err?.response?.status == 401){
                dispatch(logout())
              }else{
                  toast.error("Something Went Wrong");
                  console.error(err);
              }
        } finally {
            setLoading(false)
        }
    };

    const handleDelete = async(seniorAdmHeadID,college)=>{
        try {
          const res = await axios.post(`${baseUrl}/removeAssignedCollege`,{
            seniorAdmHeadID,college
          },{withCredentials:true});
          toast.success("Successfully Removed College From Senior Admission Head")
          setDataDeleted(!dataDeleted)
        } catch (err) {
            toast.error("Something Went Wrong While Deleting..");
            console.error(err)
        }
    }

    const handleSeniorAdmHeadDelete = async (id) =>{
        try {
            const res = await toast.promise(
                axios.delete(`${baseUrl}/removeCounsellor/${id}`, {withCredentials: true}),
                {
                    loading: "Deleteing Senior Adm Head ...",
                    success: "Senior Adm Head Deleted Successfully.",
                    error: "Failed to delete senior adm head"
                }

            )
            setDataDeleted(!dataDeleted)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [dataDeleted]);

    return (
        <div className='flex gap-24'>
            <Navbar />
            <div className='flex flex-col flex-1 p-4'>
                <p className='text-4xl font-bold'>Report</p>
                {
                    !loading ?
                        data.length ?
                            <TableContainer component={Paper} sx={{ marginTop: 5 }}>
                                <Table sx={{ minWidth: 650 }} className='border-[1px] border-gray-400'>
                                    <TableHead>
                                        <TableRow className='bg-[#4b34c98a]'>
                                            <TableCell />
                                            <TableCell>Senior Admission Head</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {console.log(data)}
                                        {data.map((head, index) => (
                                            <React.Fragment key={index}>
                                                <TableRow>
                                                    <TableCell>
                                                        <IconButton
                                                            aria-label="expand row"
                                                            size="small"
                                                            onClick={() => toggleRow(index)}
                                                        >
                                                            {open[index] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>{head.name}</TableCell>
                                                    <TableCell>
                                                        <button className='bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700' onClick={() => handleSeniorAdmHeadDelete(head.id)}>Delete</button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                                            <Box margin={1} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                                                <p className='font-semibold text-lg mt-4'>Colleges assigned to {head.name}</p>
                                                                <Table size='small'>
                                                                    <TableHead className='bg-gray-300'>
                                                                        <TableRow>
                                                                            <TableCell>Name</TableCell>
                                                                            <TableCell>Total Counsellors</TableCell>
                                                                            <TableCell>Total Revenue</TableCell>
                                                                            <TableCell>Total Admissions</TableCell>
                                                                            <TableCell>Hot Leads</TableCell>
                                                                            <TableCell>Warm Leads</TableCell>
                                                                            <TableCell>Paid Counselling</TableCell>
                                                                            <TableCell>Actions</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody className='flex flex-col' >
                                                                        {head.colleges.length ? head.colleges.map((college, idx) => (
                                                                            <TableRow key={idx} className='cursor-pointer'>
                                                                                <TableCell className='hover:text-blue-700'>
                                                                                    <Link to={`/officeDashboard?url='${college.Name}'`}>
                                                                                        {college.Name}
                                                                                    </Link>
                                                                                </TableCell>
                                                                                <TableCell>{college.TotalCounsellors}</TableCell>
                                                                                <TableCell>{college.TotalRevenue}</TableCell>
                                                                                <TableCell>{college.TotalAdmissions}</TableCell>
                                                                                <TableCell>{college.HotLeads}</TableCell>
                                                                                <TableCell>{college.WarmLeads}</TableCell>
                                                                                <TableCell>{college.PaidCounselling}</TableCell>
                                                                                <TableCell>
                                                                                    <MdDelete size={22} className='text-red-500 hover:text-red-700' onClick={()=>handleDelete(head.id , college.Name)}/>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )) : 
                                                                            <TableRow className='text-center text-gray-400 p-9 w-full'>
                                                                               <TableCell colSpan={9} className='flex justify-center'>
                                                                               <p className='text-center p-9 text-gray-500'> No Data Available</p>
                                                                                </TableCell> 
                                                                            </TableRow>
                                                                        }
                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> :
                            <p className='text-center text-gray-400'>
                                No Data Available
                            </p>
                        :
                        <div className="flex justify-center items-center">
                            <img src={LoadingBar} alt="loading" title="loading..." />
                        </div>

                }
            </div>
        </div>
    );
};

export default ShowAllAssignedAdmHeads;
