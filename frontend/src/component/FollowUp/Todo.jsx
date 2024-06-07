
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
const Todo = ({ key, title, date, id }) => {
  console.log(date,"date")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    return `${formattedDate}, ${formattedTime}`;
  };
  return (
    <div>
      <Container>
        <Card
          variant="outlined"
          style={{ width: "70vw",
            blockSize: "fit-content" , marginTop: 5, background: "lightgray" }}
        >
          <CardContent  >
            {/*Check Icon*/}
            <Typography > 
              {title}
            </Typography>
            <div >
              <Typography variant="caption">{date!=undefined ?formatDate(date):formatDate(new Date())}</Typography>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Todo;
