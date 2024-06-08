
import Todolist from "./TodoList";
import Todoform from "./Todoform";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Paper } from "@mui/material";

export default function Followup(props) {
  const baseUrl = import.meta.env.VITE_API;
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${baseUrl}/getTodos/${props.id}`
      )
      setTodos(response.data[0].remarks);
      console.log(response.data[0].remarks,"follwup");
      
      console.log(todos, "list");
    };

    fetchData();
  }, []);

  const addTodo = (text) => {
    const newTodo = {
      subject: text,
      date:new Date(),
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };
  return (
    <Paper elevation={20}>
      <Todoform addTodo={addTodo} id = {props.id}/>
      <Todolist todos={todos} />
    </Paper>
  );
}