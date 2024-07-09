import * as React from "react";
import { useState } from "react";
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

export default function SlotBooking({ studentId }) {
  const baseUrl = import.meta.env.VITE_API;
  console.log(studentId, "id in book slot frontend");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [office, setOffice] = useState("");

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
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
              <DatePicker
                label="Basic date time picker"
                value={selectedDate}
                onChange={handleDateChange}
                sx={{
                  width: "100%",
                }}
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
