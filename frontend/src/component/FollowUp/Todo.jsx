import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { Check, Delete } from "@mui/icons-material";
import { green } from "@mui/material/colors";
const todo = ({ key, title, checkTodo, id, isCompleted, deleteTodo }) => {
  const markComplete = () => checkTodo(id);
  const delTodo = () => deleteTodo(id);
  const todoStyle = isCompleted
    ? { textDecoration: "line-through" }
    : { textDecoration: "none" };
  return (
    <div>
      <Container>
        <Card
          variant="outlined"
          style={{ maxHeight: 38, marginTop: 5, background: "lightgray" }}
        >
          <CardContent style={{ margin:6, padding: 3 }}>
            {/*Check Icon*/}
            <Typography style={todoStyle}>
              <IconButton onClick={markComplete}>
                <Check style={{ color: "green" }} />
              </IconButton>
              {key}
              {title}
              <IconButton style={{ float: "right" }} onClick={delTodo}>
                <Delete style={{ color: "red" }} />
              </IconButton>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
export default todo;