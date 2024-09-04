import * as React from "react";
import { useState, useEffect } from "react";
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
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { CollegeNames } from "../../pages/Registration/CollegeNames";

export default function SlotBooking({ studentId }) {
  console.log(studentId, "id in book slot frontend");
  
  const baseUrl = import.meta.env.VITE_API;

  const [category, setCategory] = useState("")
  
  const [office, setOffice] = useState("")
  const [college, setCollege] = useState("")

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [dateError, setDateError] = useState(false); // Error state for date selection

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDates = async () => {
      try {
        if (category === "Office" && office) {
          const response = await axios.get(`${baseUrl}/getAdminAvailableDays`, {
            withCredentials: true,
          });

          const datesKey = `${office.toLowerCase()}StartDate`;
          const endDatesKey = `${office.toLowerCase()}EndDate`;

          const fetchedStartDate = dayjs(response.data[datesKey]);
          const fetchedEndDate = dayjs(response.data[endDatesKey]);

          if (fetchedStartDate.isValid() && fetchedEndDate.isValid()) {
            setStartDate(fetchedStartDate);
            setEndDate(fetchedEndDate);
            setSelectedDate(fetchedStartDate);
            setDateError(false);
          } else {
            console.error("Invalid date format received:", response.data);
          }
        } else if (category === "College" && college) {
          const today = dayjs();
          setStartDate(today);
          setEndDate(null); // No end date restriction for college
          setSelectedDate(today);
          setDateError(false);
        }
      } catch (error) {
        if (error?.response?.status == 401) {
          dispatch(logout());
        }
        console.error("Error fetching dates:", error);
      }
    };
    fetchDates();
  }, [category, office, college]);

  const handleDateChange = (newValue) => {
    if (newValue.isValid()) {
      if (isDateInRange(newValue)) {
        setDateError(false); // Clear error if date is valid
      } else {
        console.log("true kar diya");
        setDateError(true); // Set error if date is out of range
      }
      setSelectedDate(newValue);
    }
  };

  const isDateInRange = (date) => {
    if (category === "College") {
      return date >= startDate; // Only check that the date is today or later
    }
    return date && startDate && endDate && date.isBetween(startDate, endDate, null, "[]");
  };

  // const disableDates = (date) => {
  //   return date < startDate || date > endDate;
  // };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setOffice("");
    setCollege("");
    setStartDate(null);
    setEndDate(null);
    setSelectedDate(dayjs());
    setDateError(false);
  };

  const handleOfficeChange = (e) => {
    setOffice(e.target.value);
  };

  const handleCollegeChange = (e) =>{
    setCollege(e.target.value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const location = category === "Office" ? office : college;

    if (dateError) {
      toast.error("Please select a valid date.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/slotBook`,
        {
          _id: studentId,
          visitDate: selectedDate,
          location: location,
        },
        { withCredentials: true }
      );

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
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="Office">Office</MenuItem>
                  <MenuItem value="College">College</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {category === "Office" && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="office-select-label">Office</InputLabel>
                  <Select
                    labelId="office-select-label"
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
            )}
            {category === "College" && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="college-select-label">College</InputLabel>
                  <Select
                    labelId="college-select-label"
                    value={college}
                    label="College"
                    onChange={handleCollegeChange}
                  >
                    {CollegeNames.map((option, index) => (
                      <MenuItem key={index} value={option.website}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} margin={"2rem"} sm={6}>
              <DatePicker
                sx={{ width: "100%" }}
                onChange={handleDateChange}
                label="Select Date"
                value={selectedDate}
                minDate={startDate}
                maxDate={category === "Office" ? endDate : undefined}
                disabled={!startDate}
                error={dateError}
                helperText={dateError ? "Invalid date selected." : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
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
