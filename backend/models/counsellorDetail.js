

import mongoose from "mongoose";
const counsellorDetail = mongoose.Schema({
    counsellor_id: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    unique:true
    // required: true,
  },
  mobile: {
    type: Number,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  college_website:{
    type:String
  },
  // startDate:{type:String}, endDate:{type:String},
  kanpurStartDate:{type:String,default:""},
  kanpurEndDate:{type:String,default:""},
  noidaEndDate:{type:String,default:""},
  noidaStartDate:{type:String,default:""},
  is_admin: {
    type: Number,
    required: true,
    default: 0,
  },
  is_verified: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default: "",
  },
  who_am_i:{type:String,default:"Counsellor"}
},{timestamps:true}
);

const counsellorModal = mongoose.model("Counsellor", counsellorDetail);
export default  counsellorModal;
