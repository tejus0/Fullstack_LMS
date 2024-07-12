// DateRangePicker.js
import React, { useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';

const DaysAvaialble = ({ onDateRangeChange }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const baseUrl = import.meta.env.VITE_API;

    const handleSubmit = async() => {
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates.");
            return;
        }

        try {
            const start = startDate.toISOString(); // Convert to ISO string
            const end = endDate.toISOString(); // Convert to ISO string
            console.log("Sending dates:", {
                startDate: start,
                endDate: end
            });
    
            console.log("Sending dates:", { start, end });

        const response = await axios.post(`${baseUrl}/updateAdminAvailableDays`, {
            startDate: start,
            endDate: end
        });

        toast.success("Dates updated successfully!");
        console.log(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Failed to update dates.";
            toast.error(errorMessage);
            console.error("Error updating dates:", errorMessage);
        }
        //  // Ensure the dates are valid Date objects before formatting
        //  const start = new Date(startDate);
        //  const end = new Date(endDate);

        //   // Notify parent component about the date range
        // onDateRangeChange(startDate, endDate);

        // toast.success(`Selected Date Range: ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`);
    };

    const handleReset = () => {
        setStartDate(null);
        setEndDate(null);
        toast.success("Date range reset.");
    };


    return (
        <>
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
        </>
    );
};

export default DaysAvaialble;
