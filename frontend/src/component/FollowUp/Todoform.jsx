import React, { useState,useEffect } from "react";
import { FormControl, Container, TextField, Button, Paper } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

const TodoForm = ({ addTodo, id }) => {

const [userId, setUserId] = useState("")

const location = useLocation();   // abhigya has used location.hostname
  const studId = id;

// useEffect(() => {
//     // const Id = JSON.parse(localStorage.getItem("Id-data"));
//     // if (Id) {
//       setUserId(studId);
//     // }
//   }, []);
  const [text, setText] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(text==""){
      toast.error("Enter text first !");
    }
    else{
    console.log(text, "text is here");
    await axios
      .post(`http://localhost:4000/api/v1/createTodos`, {_id:studId, name: text })
      .then((response) => {
        toast.success("task added successfully !", { position: "top-right" });
        console.log()
        addTodo(text);
        setText("");
      })
      .catch((error) => console.log(error));
    }
  };
return (
    <Paper >
      <form>
        <FormControl fullWidth={true}>
          <TextField
            label="I will do this*"
            required={true}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            style={{ margin: 5 }}
          >
            ADD
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
};
export default TodoForm;