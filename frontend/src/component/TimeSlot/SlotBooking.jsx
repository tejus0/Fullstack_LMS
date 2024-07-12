import * as React from "react";
import { useState,useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
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

export default function SlotBooking({ studentId}) {
  const baseUrl = import.meta.env.VITE_API;
  console.log(studentId, "id in book slot frontend");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [office, setOffice] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchDates = async () => {
        try {
            const response = await axios.get(`${baseUrl}/getAdminAvailableDays`);
            console.log(response.data,"in slot book karna hai")
            // if (response.data) {
                // setStartDate(new Date(response.data.startDate));
                // setEndDate(new Date(response.data.endDate));
            // }
          
            if (response.data) {
              // Ensure the response data has valid dates
              const fetchedStartDate = dayjs(response.data.startDate);
              const fetchedEndDate = dayjs(response.data.endDate);

              // Check if the fetched dates are valid
              if (!isNaN(fetchedStartDate) && !isNaN(fetchedEndDate)) {
                  setStartDate(fetchedStartDate);
                  setEndDate(fetchedEndDate);
              } else {
                  console.error("Invalid date format received:", response.data);
              }
          }
        } catch (error) {
            console.error("Error fetching dates:", error);
        }
    };
    fetchDates();
}, []);

  const handleDateChange = (newValue) => {
      if (isDateInRange(newValue)) {
          console.log("Selected date:", newValue.toLocaleDateString());
      } else {
          console.log("Selected date is out of range.");
      }
    setSelectedDate(newValue);
  };

  const isDateInRange = (date) => {
    return date >= startDate && date <= endDate;
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

    try {
      // Make API call to submit the booking data
      const response = await axios.post(`${baseUrl}/slotBook`, {
        _id: studentId,
        visitDate: selectedDate,
        office: office,
        // followUpStage: FolloupStage,
      });

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
            <Grid item xs={12} margin={"2rem"} sm={6}>
              {/* <DatePicker
                label="Basic date time picker"
                value={selectedDate}
                onChange={handleDateChange}
                sx={{
                  width: "100%",
                }}
              /> */}
               {/* <DatePicker
               sx={{
                width: "100%",
              }}
                onChange={handleDateChange}
                label="Basic date time picker"
                value={selectedDate}
                minDate={startDate}
                maxDate={endDate}
                className="border p-2 rounded w-full"
                disabled={disableDates} // Disable if dates are not set
            /> */}
            <DatePicker
    sx={{ width: "100%" }}
    onChange={handleDateChange}
    label="Select Date"
    value={selectedDate}
    minDate={startDate} // Ensure these are dayjs objects
    maxDate={endDate}
    disabled={!startDate || !endDate} // Disable if dates are not set
/>
            </Grid>
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
