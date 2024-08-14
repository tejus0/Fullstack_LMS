import * as React from "react";
import { useState,useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { Button, Box } from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { OfficeDropDown } from "./Office";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/authSlice'

export default function SlotBooking({ studentId}) {
  const baseUrl = import.meta.env.VITE_API;
  console.log(studentId, "id in book slot frontend");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [office, setOffice] = useState("");
  const [dateError, setDateError] = useState(false); // Error state for date selection

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDates = async () => {
        try {
            const response = await axios.get(`${baseUrl}/getAdminAvailableDays`,{withCredentials:true});
            console.log(response.data,"in slot book karna hai")
            // if (response.data) {
                // setStartDate(new Date(response.data.startDate));
                // setEndDate(new Date(response.data.endDate));
            // }
          
            if (response.data) {


              if (office) { // If an office is already selected
                const datesKey = `${office.toLowerCase()}StartDate`; // "noidaStartDate" or "kanpurStartDate"
                const endDatesKey = `${office.toLowerCase()}EndDate`; // "noidaEndDate" or "kanpurEndDate"
                
                const fetchedStartDate = dayjs(response.data[datesKey]);
                const fetchedEndDate = dayjs(response.data[endDatesKey]);
                
                console.log(fetchedStartDate,fetchedEndDate,"dates in slot book")
        
               

              // Ensure the response data has valid dates
              // const fetchedStartDate = dayjs(response.data.startDate);
              // const fetchedEndDate = dayjs(response.data.endDate);

              // Check if the fetched dates are valid
              if (!isNaN(fetchedStartDate) && !isNaN(fetchedEndDate)) {
                  setStartDate(fetchedStartDate);
                  setEndDate(fetchedEndDate);
                  setSelectedDate(fetchedStartDate)
                  setDateError(false)
              } else {
                  console.error("Invalid date format received:", response.data);
              }
          }
        }
        } catch (error) {
          if(error?.response?.status == 401){
            dispatch(logout())
          }
            console.error("Error fetching dates:", error);
        }
    };
    fetchDates();
}, [office]);

  const handleDateChange = (newValue) => {
    //   if (isDateInRange(newValue)) {
    //       console.log("Selected date:", newValue.toLocaleDateString());
    //   } else {
    //       console.log("Selected date is out of range.");
    //   }
    // setSelectedDate(newValue);
    if(newValue.isValid()){
      if (isDateInRange(newValue)) {
        setDateError(false); // Clear error if date is valid
      } else {
        console.log("true kar diya")
        setDateError(true); // Set error if date is out of range
      }
      setSelectedDate(newValue);
    }
  };

  const isDateInRange = (date) => {
    // return date >= startDate && date <= endDate;
    console.log("startDAte , " , startDate , "endDate" , endDate , "date" , date)
    return date && startDate && endDate && date.isBetween(startDate, endDate, null, "[]");
};

const disableDates = (date) => {
  return date < startDate || date > endDate;
};

  const handleOfficeChange = (e) => {
    setOffice(e.target.value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const bookingData = {
    //   studentId,
    //   date: selectedDate.format(),
    // };
    console.log('error hai ya ni' , dateError , selectedDate)
    if (dateError) {
      toast.error("Please select a valid date.");
      return; // Prevent submission if date is invalid
    }

    try {
      // Make API call to submit the booking data
      const response = await axios.post(`${baseUrl}/slotBook`, {
        _id: studentId,
        visitDate: selectedDate,
        office: office,
        // followUpStage: FolloupStage,
      },{withCredentials:true});

      toast.success("Booking successful!");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Booking failed";
      toast.error(errorMessage);
      console.error("Error:", errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flexGrow: 1,
            "@media (max-width: 600px)": {
              flexDirection: "column",
            },
          }}
        >
          <Grid container spacing={2}>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Office</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={office}
                  label="Office"
                  onChange={handleOfficeChange}
                >
                  {OfficeDropDown.map((option, index) => (
                    <MenuItem key={index} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} margin={"2rem"} sm={6}>
            <DatePicker
    sx={{ width: "100%" }}
    onChange={handleDateChange}
    label="Select Date"
    value={selectedDate}
    minDate={startDate} // Ensure these are dayjs objects
    maxDate={endDate}
    disabled={!startDate || !endDate} // Disable if dates are not set
    error={dateError} // Show error state
                helperText={dateError ? "Invalid date selected." : ""}
/>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{ width: "100%" }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
      <Toaster />
    </>
  );
}
