import * as React from 'react';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button, Box } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function SlotBooking({ studentId }) {
  const baseUrl = import.meta.env.VITE_API;
  console.log(studentId,"id in book slot frontend")
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
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
        // followUpStage: FolloupStage,
      });

      toast.success('Booking successful!');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Booking failed';
      toast.error(errorMessage);
      console.error('Error:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    //   <Box component="form" onSubmit={handleSubmit}>
    //     <DemoContainer components={['DateTimePicker']}>
    //       <DateTimePicker
    //         label="Basic date time picker"
    //         value={selectedDate}
    //         onChange={handleDateChange}
    //       />
    //     </DemoContainer>
    //     <Button type="submit" variant="contained" color="primary">
    //       Submit
    //     </Button>
    //   </Box>
    // </LocalizationProvider>

    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={handleSubmit}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              label="Basic date time picker"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </DemoContainer>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </LocalizationProvider>
      <Toaster />
    </>
  );
}
