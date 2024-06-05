
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
const Todo = ({ key, title, date, id }) => {
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
              <Typography variant="caption">Posted on : {date}</Typography>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Todo;
