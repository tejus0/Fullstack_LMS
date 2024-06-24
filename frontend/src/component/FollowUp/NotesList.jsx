import React, { useState, useEffect } from 'react';
import { Box,List, ListItem, ListItemText, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
    followUpOne,
    followUpTwo,
    followUpThree,
    associateCollegeOptions
  } from "../../data/followUpDropdown";
const baseUrl = import.meta.env.VITE_API;


const NotesList = ({FolloupStage,studentId, countaa}) => {

    // const [FolloupStage, setFolloupStage] = useState("FollowUp1");

    const [dropDown, setDropDown] = useState([]);
    const [SelectedOption, setSelectedOption] = useState("");
    const [haan, setHaan] = useState(0)
    const [notesByStage, setNotesByStage] = useState({
      FollowUp1: [],
      FollowUp2: [],
      FollowUp3: [],
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${baseUrl}/getTodos/${studentId}`);
            console.log(response,"res")
            setNotesByStage(response.data[0].remarks); // Update notesByStage with the fetched data
            console.log(notesByStage,"remarks");
          } catch (error) {
    
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch data. Please try again. hihihihihihi");
          }
        };
    
        fetchData(); // Call the fetchData function
    
        // Update dropdown based on FolloupStage
        switch (FolloupStage) {
          case "FollowUp1":
            setDropDown(followUpOne);
            break;
          case "FollowUp2":
            setDropDown(followUpTwo);
            break;
          case "FollowUp3":
            setDropDown(followUpThree);
            break;
          default:
            setDropDown(followUpOne);
            break;
        }
      }, [FolloupStage, countaa]); // Include FolloupStage and studentId in the dependency array

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Notes for {FolloupStage}</h3>
      <Box
        sx={{
          maxHeight: 200, // Adjust this value as needed
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: 2,
          borderRadius: 2
        }}
      >
      <List>
        {notesByStage[FolloupStage]?.length > 0 ? (
          notesByStage[FolloupStage].map((item, index) => {
            // console.log(item,"item in noteslist")
            if(FolloupStage=="FollowUp3"){
              return(
                
                // {console.log(additionalOption,"option")}
                <ListItemText
            primary={
                <Typography variant="subtitle1" className="font-bold">
                {index + 1}. Subject: {item.subject}
                </Typography>
            }
                secondary={
                <Typography variant="body2">
                Remarks: {item.additionalOption}
                <br />
                Prebook Amount: {item.preBookingAmount} {/* Replace with your prebook amount */}
                </Typography>
            } 
            />
          )
            }
            else{
            if(item.subject.includes('+')){
               var [subject,remarks] = item.subject.split('+');
            }
            else{
                var subject = item.subject
            }
            return (
            <ListItem key={index} className="mb-2">
            { FolloupStage=="FollowUp2" ?
            <ListItemText
            
            primary={
                <Typography variant="subtitle1" className="font-bold">
                {index + 1}. Subject: {subject}
                </Typography>
            }
                secondary={
                <Typography variant="body2">
                Remarks: {remarks}
                </Typography>
            } 
            /> : <ListItemText
            primary={
                <Typography variant="subtitle1" className="font-bold">
                {index + 1}. Subject: {item.subject}
                </Typography>
            }
            />}
            </ListItem>
            );
          }
})
        ) : (
          <Typography variant="body2">No notes available.</Typography>
        )}
      </List>
      </Box>
    </div>
  );
};

export default NotesList;
