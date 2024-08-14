// DateRangePicker.js
import React, { useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import Navbar from '../../component/navbar/Navbar';
import dayjs from "dayjs"
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';



const DaysAvaialble = ({ onDateRangeChange }) => {
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    // const [kanpurDate, setKanpurDate] = useState(null);
    // const [noidaDate, setNoidaDate] = useState(null);

    const [kanpurStartDate, setKanpurStartDate] = useState(null);
    const [kanpurEndDate, setKanpurEndDate] = useState(null);
    const [noidaStartDate, setNoidaStartDate] = useState(null);
    const [noidaEndDate, setNoidaEndDate] = useState(null);
    const baseUrl = import.meta.env.VITE_API;
    const dispatch = useDispatch();

    const isPreviousDate = (date) => {
        // const startOfWeek = dayjs().startOf('week');
        // const endOfWeek = dayjs().endOf('week');
        // return date.isBetween(startOfWeek, endOfWeek, "day", '[]'); // Inclusive
        return date < new Date();
    };

    const getDisabledDatesForNoida = () => {
        const disabledDates = [];
        
          // Add Kanpur selected range to disabled dates for Noida
          if (kanpurStartDate && kanpurEndDate) {
            let start = kanpurStartDate.startOf('day');
            let end = kanpurEndDate.endOf('day');
            while (start.isBefore(end) || start.isSame(end)) {
                disabledDates.push(start.format('YYYY-MM-DD'));
                start = start.add(1, 'day');
            }
        }

        return disabledDates;
    };

    const handleSubmit = async() => {

        if (!kanpurStartDate || !kanpurEndDate || !noidaStartDate || !noidaEndDate) {
            toast.error("Please select start and end dates for both locations.");
            return;
        }


        // if (!startDate || !endDate) {
        //     toast.error("Please select both start and end dates.");
        //     return;
        // }

        try {
            const response = await axios.post(`${baseUrl}/updateAdminAvailableDays`, {
                kanpurStartDate: kanpurStartDate.toISOString(),
                kanpurEndDate: kanpurEndDate.toISOString(),
                noidaStartDate: noidaStartDate.toISOString(),
                noidaEndDate: noidaEndDate.toISOString(),
            },{withCredentials:true});

            toast.success("Dates updated successfully!");
            console.log(response.data);
        } catch (error) {
            if(error?.response?.status == 401){
                dispatch(logout())
              }else{
                  const errorMessage = error.response?.data?.error || "Failed to update dates.";
                  toast.error(errorMessage);
                  console.error("Error updating dates:", errorMessage);
              }
        }

        // try {



        //     const start = startDate.toISOString(); // Convert to ISO string
        //     const end = endDate.toISOString(); // Convert to ISO string
        //     console.log("Sending dates:", {
        //         startDate: start,
        //         endDate: end
        //     });
    
        //     console.log("Sending dates:", { start, end });

        // const response = await axios.post(`${baseUrl}/updateAdminAvailableDays`, {
        //     startDate: start,
        //     endDate: end
        // });

        // toast.success("Dates updated successfully!");
        // console.log(response.data);
        // } catch (error) {
        //     const errorMessage = error.response?.data?.error || "Failed to update dates.";
        //     toast.error(errorMessage);
        //     console.error("Error updating dates:", errorMessage);
        // }
    };

    const handleReset = () => {

        setKanpurStartDate(null);
        setKanpurEndDate(null);
        setNoidaStartDate(null);
        setNoidaEndDate(null);
        toast.success("Date selection reset.");


        // setStartDate(null);
        // setEndDate(null);
        // toast.success("Date range reset.");
    };

    const disabledDatesForNoida = getDisabledDatesForNoida();


    return (
        <>
        <div className="ml-20">
                <Navbar />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <h1 className="text-2xl font-bold mb-4">Date Range Picker</h1>
                    <div className="flex flex-col space-y-4 p-4">
                        {/* Kanpur Date Range */}
                        <div className="flex flex-col">
                            <label className="block mb-1">Kanpur</label>
                            <div className="flex justify-between">
                                <div className="flex-1 mr-2">
                                    <label className="block mb-1">Start</label>
                                    <DatePicker
                                        value={kanpurStartDate}
                                        onChange={(date) => {
                                            if (!isPreviousDate(date)) {
                                                setKanpurStartDate(date);
                                                if (kanpurEndDate && date.isAfter(kanpurEndDate)) {
                                                    setKanpurEndDate(null);
                                                }
                                            } else {
                                                toast.error("Select an upcoming date");
                                            }
                                        }}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                                <div className="flex-1 ml-2">
                                    <label className="block mb-1">End</label>
                                    <DatePicker
                                        value={kanpurEndDate}
                                        onChange={(date) => {
                                            if (!isPreviousDate(date)) {
                                                setKanpurEndDate(date);
                                            } else {
                                                toast.error("Select an upcoming date");
                                            }
                                        }}
                                        minDate={kanpurStartDate}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Noida Date Range */}
                        <div className="flex flex-col">
                            <label className="block mb-1">Noida</label>
                            <div className="flex justify-between">
                                <div className="flex-1 mr-2">
                                    <label className="block mb-1">Start</label>
                                    <DatePicker
                                        value={noidaStartDate}
                                        onChange={(date) => {
                                            if (!isPreviousDate(date)) {
                                                setNoidaStartDate(date);
                                                if (noidaEndDate && date.isAfter(noidaEndDate)) {
                                                    setNoidaEndDate(null);
                                                }
                                            } else {
                                                toast.error("Select an upcoming date");
                                            }
                                        }}
                                        className="border p-2 rounded w-full"
                                        // Disable dates from Kanpur's selected range
                                        shouldDisableDate={(date) => disabledDatesForNoida.includes(date.format('YYYY-MM-DD'))}
                                    />
                                </div>
                                <div className="flex-1 ml-2">
                                    <label className="block mb-1">End</label>
                                    <DatePicker
                                        value={noidaEndDate}
                                        onChange={(date) => {
                                            if (!isPreviousDate(date)) {
                                                setNoidaEndDate(date);
                                            } else {
                                                toast.error("Select an upcoming date");
                                            }    
                                        }}
                                        minDate={noidaStartDate}
                                        className="border p-2 rounded w-full"
                                        // Disable dates from Kanpur's selected range
                                        shouldDisableDate={(date) => disabledDatesForNoida.includes(date.format('YYYY-MM-DD'))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="flex space-x-4">
                                <button 
                                    onClick={handleSubmit} 
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                                >
                                    Submit
                                </button>
                                <button 
                                    onClick={handleReset} 
                                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </LocalizationProvider>
            </div>

        {/* <div className="ml-20">
        <Navbar />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1 className="text-2xl font-bold mb-4">Date Range Picker</h1>
        <div className="flex flex-col space-y-4 p-4">
            <div className="flex justify-between">
                <div className="flex-1 mr-2">
                    <label className="block mb-1">From</label>
                    <DatePicker
                        value={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            if (endDate && date && date > endDate) {
                                setEndDate(null);
                            }
                        }}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="flex-1 ml-2">
                    <label className="block mb-1">To</label>
                    <DatePicker
                        value={endDate}
                        onChange={setEndDate}
                        minDate={startDate} // Only allow dates after the selected start date
                        className="border p-2 rounded w-full"
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex space-x-4">
                    <button 
                        onClick={handleSubmit} 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Submit
                    </button>
                    <button 
                        onClick={handleReset} 
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
        </LocalizationProvider>
        </div> */}
        </>
    );
};

export default DaysAvaialble;
