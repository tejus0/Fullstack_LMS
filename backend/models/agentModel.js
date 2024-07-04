import mongoose from "mongoose";
const agentSchema = mongoose.Schema({
    name:{type:String},
    password:{type:String}
})

const agentModal = mongoose.model('Agent', agentSchema)

export default agentModal;