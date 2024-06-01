// import { v4 } from "uuid";
import Todolist from "./TodoList";
import Todoform from "./Todoform";
// import Modal from "react-modal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Paper } from "@mui/material";
// Modal.setAppElement("#root");

export default function Followup() {
  const [todos, setTodos] = useState([]);
  const user_id = JSON.parse(localStorage.getItem("Id-data"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/v1/getTodos/${user_id}`
      );
      console.log(response.data);
      setTodos(response.data);
      console.log(todos, "list");
    };

    fetchData();
  }, []);

  const checkTodo = (id) => {
    console.log(id);
    setTodos(
      todos.map((todo) => {
        if (todo.id == id) todo.isCompleted = !todo.isCompleted;
        console.log(todo.isCompleted);
        return todo;
      })
    );
  };
  const deleteTodo = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/v1/deleteTodos/${id}`)
      .then((response) => {
        toast.success("task deleted successfully !", { position: "top-right" });
      })
      .catch((error) => console.log(error.message));
    setTodos(todos.filter((todo) => todo._id != id));
  };

  const addTodo = (text) => {
    const newTodo = {
      name: text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };
  return (
    <Paper elevation={20}>
      <Todoform addTodo={addTodo} />
      <Todolist todos={todos} checkTodo={checkTodo} deleteTodo={deleteTodo} />
    </Paper>
  );
}