import React from "react";
import Todo from "./Todo";



const todolist=({todos,checkTodo, deleteTodo})=>{
    // console.log(user_id);
    return(
        <div>
            {
            todos.map((todo,index) =>
            (
            <Todo key={index+1}  title={todo.name} checkTodo={checkTodo} id={todo._id} isCompleted={todo.isCompleted} deleteTodo={deleteTodo}/>
            ))
            }
        {/* <Todo /> */}
        </div>
    );
};
export default todolist;