import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const formattedDate = date.toLocaleDateString(undefined, dateOptions);
  const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
  return `${formattedDate}, ${formattedTime}`;
};

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
          <Typography>{isNaN(resp.sourceId) ? resp.source : resp.source + " " + resp.sourceId}

          </Typography>
                  <p className='mr-4'>Submitted At: {formatDate(resp.submitedAt)}</p>
        </AccordionSummary>
        <AccordionDetails>
          <div className='flex gap-20'>

          <div>
                  <p>Name: {resp.name}</p>
                  <p>Contact Number: {resp.contactNumber}</p>
                  <p>WhatsApp Number: <span className="text-green-600">{resp.whatsappNumber}</span></p>

          </div>
          <div>
                  <p>Email: {resp.email}</p>
                  <p>Course Selected: {resp.courseSelected}</p>

                  {/* <p>Source: {resp.source}</p> */}
                  {/* <p>Source Id: {resp.sourceId}</p> */}
                  <p>Preffered College: {resp.preferredCollege}</p>
          </div>
          <div>
                  <p>NeetAIR: {resp.neetAIR}</p>
                  <p>Neet Score: {resp.neetScore}</p>

          </div>
          </div>
        </AccordionDetails>
      </Accordion>
      ))}
      {/* ): <p>No data</p> } */}
    </div>
  );
}
