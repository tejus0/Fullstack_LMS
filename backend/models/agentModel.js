import mongoose from "mongoose";
const agentSchema = mongoose.Schema({
    name:{type:String},
    password:{type:String}
},{timestamp:true})

const agentModal = mongoose.model('Agent', agentSchema)

export default agentModal;