// import mongoose from "mongoose";

// const counsellorDetail = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         email:{
//             type:String,
//             required:true
//         },
//         students:{

//         }

//         // Define other required fields
//     }, { timestamps: true }
// )

// const counsellorModal = mongoose.model('Counsellor', counsellorDetail)

// export default counsellorModal

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
  assignedStudents: [
    {
        type: Array,
        // ref: "Students",
        default:[]
    }
],
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
},{timestamps:true}
);

const counsellorModal = mongoose.model("Counsellor", counsellorDetail);
export default  counsellorModal;
