import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function AccordionExpandIcon({otherResp}) {
    console.log(otherResp,"response")
  return (
    <div>
        {/* {otherResp !=[] ? ( */}
        {otherResp.map((resp,index)=>(
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{resp.sourceId}</Typography>
        </AccordionSummary>
        <AccordionDetails>
                  <p>Name: {resp.name}</p>
                  <p>Mobile: <span className="text-green-600">{resp.whatsappNumber}</span></p>
                  <p>Course Selected: {resp.courseSelected}</p>
                  <p>Source: {resp.source}</p>
                  <p>Source Id: {resp.sourceId}</p>
                  <p>Preffered College: {resp.preferredCollege}</p>
                  <p>Contact Number: {resp.contactNumber}</p>
                  <p>Email: {resp.email}</p>
                  <p>Submitted At: {resp.submitedAt}</p>
        </AccordionDetails>
      </Accordion>
      ))}
      {/* ): <p>No data</p> } */}
    </div>
  );
}
