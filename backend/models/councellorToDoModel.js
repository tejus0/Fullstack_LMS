import mongoose from "mongoose";
const TodoSchema= mongoose.Schema({
    employee_id:{type:String},
    name: {type:String},
    completed:{type: Boolean, default:0},
});

export default  mongoose.model("Todo", TodoSchema);