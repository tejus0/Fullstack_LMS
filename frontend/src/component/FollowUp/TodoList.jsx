import React from "react";
import Todo from "./Todo";



const todolist=({todos})=>{
    console.log(todos,"todod");
    return(
        <div>
            {
                todos.map((todo,index) =>
            (        
            <Todo key={index+1} date={todo.updatedAt} title={todo.subject} id={todo._id} />
            // console.log("up", todo.updatedAt);
            )
        )
            }
        {/* <Todo /> */}
        </div>
    );
};
export default todolist;