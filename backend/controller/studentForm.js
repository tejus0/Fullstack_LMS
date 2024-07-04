import studentModal from '../models/studentDetail.js'
import Todo from '../models/councellorToDoModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import counsellorModal from '../models/counsellorDetail.js';
import agentModal from '../models/agentModel.js';
// import nodemailer from "nodemailer";
import { sessionSecret, emailUser, emailPass } from "../config/config.js";
import councellorToDoModel from '../models/councellorToDoModel.js';
import assignmentConfigModal from '../models/lastAssignedCounsellor.js';

export const loginLoad = async (req, res) => {
  try {
    res.json("this is working");
  } catch (error) {
    console.log(error.message, "error");
  }
};

export async function createStudentProfile(req, res) {
  try {
    const data = await req.body;
    const user = await studentModal.findOne({ $or: [{ email: data.email }, { contactNumber: data.contactNumber }] });
    // console.log(user,"otherresp");
    console.log(data ,"ersponase on otherresponsew")
    if (user) {

      const isMail = user.email == data.email

      const isOtherResponseExist = user.otherResponse.find(x => x.courseSelected == data.courseSelected && x.preferredCollege == data.preferredCollege)

      if (user.courseSelected == data.courseSelected && user.preferredCollege == data.preferredCollege) {

        const sameDetail = isMail ? "Email" : "Contact Number"
        return res.status(400).json(
          {
            sucess: false,
            msg: `Same Detail With Same ${sameDetail} Already Exist`,

          }
        )
      }

      
      const anotherResponse = {
        guardianName:data.guardianName,
        district:data.district,
        state:data.state,
        name: data.name,
        whatsappNumber: data.whatsappNumber,
        courseSelected: data.courseSelected,
        source: data.source,
        sourceId: data.sourceId,
        preferredCollege: data.preferredCollege,
        contactNumber: data.contactNumber,
        email: data.email,
        neetScore:data.neetScore,
        neetAIR: data.neetAIR
      }
      user.otherResponse.push(anotherResponse)
      await user.save()
      return res.status(200).json(
        {
          sucess: true,
          msg: "Form Submitted Succesfully",
        }
      )
    }

    else {
      console.log(data.AssignedCouns,"nhi hoga")
        if(data.AssignedCouns==""){
      await studentModal.create(data);
      return res.status(201).json(
        {
          sucess: true,
          msg: "Form Submitted Succesfully",
        }
      )
    }
    else{
      
      data.assignedCouns= data.AssignedCouns;

      await studentModal.create(data);
      return res.status(201).json({
        success: true,
        msg: "Form Submitted Successfully",
      });
    }
    }

  } catch (error) {
    return res.status(500).json(
      {
        sucess: false,
        message: error.message
      })
  }

}


export const insertAgent= async(req,res)=>{
  const agent_data= req.params;
  console.log(agent_data,"button click of agent");

await agentModal.create(agent_data);
      return res.status(201).json({
        success: true,
        msg: "Agent Created Successfully",
      });

}




// gettiing all data for dashboard

export async function getAllStudentProfile(req, res) {
  try {

    // const { limit, page } = req.query

    const student = await studentModal.find();

    // if (limit && page) {
    //   const starting = (page - 1) * limit
    //   const ending = (page) * limit


    //   const data = student.slice(starting, ending)

    //   return res.status(200).json(
    //     {
    //       sucess: true,
    //       msg: "Sucessfull Fetched",
    //       data
    //     }
    //   )
    // }


    return res.status(200).json(
      {
        sucess: true,
        msg: "Sucessfull Fetched",
        data: student
      }
    )

  } catch (error) {
    return res.status(500).json(
      {
        sucess: false,
        message: error.message
      })
  }
}

export async function getStudentProfile(req, res) {
  console.log(req.body)
  try {
    const studentId = req.params.id;

    const student = await studentModal.find({ _id: studentId });

    // const data = student

    return res.status(200).json(
      {
        sucess: true,
        msg: "Sucessfull Fetched",
        data: student
      }
    )

  } catch (error) {
    return res.status(500).json(
      {
        sucess: false,
        message: error.message
      })
  }
}

export const getTodos = async (req, res) => {
  //    const todos = await Todo.find();
  const id = req.params.id;
  console.log(id,"id in gettodos")
  try {
    const todos = await studentModal.find({ _id: id });
    if (!todos) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createTodos = async (req, res) => {
  console.log(req.body, "params");

  try {
    const { _id, name, followUpStage } = req.body;

const todo = await studentModal.updateOne(
  { "_id": _id },
  { 
    $push: { 
      [`remarks.${followUpStage}`]: { "subject": name, "updatedAt": new Date()} 
    } 
  }
);
    res.status(200).json(todo);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
};

export const createFollowUp3 = async (req, res) => {
  console.log(req.body, "params");

  try {
    const { _id,
      name,
      followUpStage,
      additionalOption, // Include additionalOption in API call
      preBookingAmount } = req.body;
      console.log(preBookingAmount,"amount")

    const todo = await studentModal.updateOne(
      { "_id": _id },
      {
        $push: {
          [`remarks.${followUpStage}`]: {
            "subject": name,
            "updatedAt": new Date(),
            "additionalOption": additionalOption,
            "preBookingAmount": preBookingAmount
          }
        }
      }
    );
    res.status(200).json(todo);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
};

export const deleteTodos = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id, "id in cpntroller");
    // Todo.deleteOne({_id:id}).then(console.log("listaddedsuccess"))
    // const userExist = await Todo.findById(id);
    const findTodo = await Todo.findByIdAndDelete(id);
    res.status(200).json({ msg: "ToDo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "servererror" });
  }
};

export const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

export const sendVerifyMail = async (name, email, user_id) => {
  console.log("Top line - ", user_id);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "Verification mail .",
      html:
        "<p>Hi " +
        name +
        ', please click <a href="http://127.0.0.1:7000/api/verify?id=' +
        user_id +
        '">Here</a> to verify your mail .</p>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully - ", info.response);
        console.log(user_id);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const insertUser = async (req, res) => {
  console.log("Reached");
  try {

    const mobileNo = req.body.mobile;
    const olduser = await counsellorModal.findOne({ mobile: mobileNo });
    if (olduser) {
      return res.send({ error: "User Exists !" });
    }

    const spassword = await securePassword(req.body.password);
    console.log(spassword);

    const user = new counsellorModal({
      counsellor_id: req.body.employee_id,
      name: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      // image: "image",
      password: spassword,
      is_admin: 0,
    });

    const userData = await user.save();
    console.log(userData);
    res.send(userData);

    if (userData) {
      // sendVerifyMail(req.body.username, req.body.email, userData._id);
      alert("Your registration is successfull, Kindly verify your mail !");
    } else {
      alert("Registration failed!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyLogin = async (req, res) => {
  try {
    const mobileInput = req.body.mobile;
    const passwordInput = req.body.password;
    // const email = req.body.email;
    // console.log(email,"email is here");

    const userData = await counsellorModal.findOne({
      // employee_id: employee_id,
      // email: email,
      mobile: mobileInput,
    });

    if (userData) {
      const passwordMatch = await bcrypt.compare(passwordInput, userData.password);

      // if(res.status(201)){
      //    res.json({status:"ok",data:token});
      // }
      // else{
      //    res.json({error:"error"});
      // }
      console.log(passwordMatch, "match");
      if (passwordMatch) {
        // if (userData.is_verified === 0) {
        //   return res.json({ error: "Email not verified !" });
        // } else {
        // const token = jwt.sign(
        //   { counsellor_id: userData.counsellor_id }, //error maybe
        //   process.env.SECRET_KEY
        //   {
        //     expiresIn: 10,
        //   }
        // );
        // console.log(token, "token in verify");
        if (res.status(201)) {
          if (userData.is_admin === 1) {
            return res.json({ status: "ok", data: userData._id, type: "admin" });
          } else {
            return res.json({ status: "ok", data: userData._id, type: "user" });
          }
        } else {
          return res.json({ error: "error" });
        }
        // req.session.user_id = userData._id;
        // res.redirect("/admin-page");
        // }
      } else {
        return res.json({ error: " ID and Password are incorrect !" });
      }
    } else {
      return res.json({ error: "No username exists !" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const assignAuto = async (req, res) => {
  // Fetch all counsellor ids
  const counsellors = await counsellorModal.find({allLeads:0});
  const counsellorIds = counsellors.map(c => c._id);  // counsellor_id is changed to id bacause we fetch councellor by id from url.

  // Fetch all student documents
  const students = await studentModal.find({ assignedCouns: "" });
  console.log(students, "stude");

  const assignmentConfig = await assignmentConfigModal.findOne({}).exec();
  let counsellorIndex = assignmentConfig ? assignmentConfig.lastAssignedCounsellorIndex : 0;

  // Assign counsellor ids in a round-robin fashion
  // let counsellorIndex = 0;
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const newCounsellorId = counsellorIds[counsellorIndex];
    console.log(newCounsellorId, typeof (newCounsellorId))

    // if(student.assignedCouns == ""){
    await studentModal.updateOne(
      { _id: student._id },
      { $set: { 'assignedCouns': newCounsellorId } }
    );
    // }
    console.log("student id :- ",student._id,"assigned councellor:- ",student.assignedCouns)
    counsellorIndex = (counsellorIndex + 1) % counsellorIds.length;
  }

  // Update the last assigned counsellor index
  await assignmentConfigModal.updateOne(
    {},
    { $set: { lastAssignedCounsellorIndex: counsellorIndex } },
    { upsert: true }
  );

  console.log('Updated students with counsellor ids successfully.');
  return res.status(200).json(counsellorIds);
}

export const getCounsellorDataList = async (req, res) => {
  const id = req.params.id;
  console.log(id, "in SalesList");
  try {
    if(id=="6672c48614be596e4ccb3b39"){
      const studentList = await studentModal.find({ source: "fb_arnav" });
          // add here 
          // console.log(sales[3].remarks);
      
          if (!studentList) {
            return res.status(404).json({ msg: "Students data not found" });
          }
          res.status(200).json(studentList);
          return;
    }
    else{
    const sales = await studentModal.find({ assignedCouns: id });
    // add here 
    console.log("here it is");

    if (!sales) {
      return res.status(404).json({ msg: "Sales data not found" });
    }
    return res.status(200).json(sales);
    
  }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export const renameKey = async (req, res) => {
  try {
    // Assuming `studentModal` is your Mongoose model for the student collection
    await studentModal.updateMany({}, { $rename: { preffredCollege: "preferredCollege" } }, { strict: false });
    
    // Assuming `students` is defined somewhere in your code, otherwise, you need to fetch it from the database
    const students = await studentModal.find({});
    
    return res.status(200).json({ success: true, message: "Key renamed successfully", students });
  } catch (error) {
    console.error("Error in renameKey route:", error); // Log the error for debugging purposes
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
  }
  
  export async function getAllLeads(req, res) {
    try {
      const { limit, page } = req.query
      
      const student = await studentModal.find();

      if (limit && page) {
        const starting = (page - 1) * limit
        const ending = (page) * limit
        

        const data = student.slice(starting, ending)
        
return res.status(200).json(
  {
    sucess: true,
  msg: "Sucessfull Fetched",
  data
  }
      )
      }
  
      return res.status(200).json(
        {
          sucess: true,
    msg: "Sucessfull Fetched",
    data: student
    }
    )
    
} catch (error) {
  return res.status(500).json(
    {
      sucess: false,
      message: error.message
      })
      }
      }
      
      export const cleatAllAssignedCouns = async (req, res) => {
        try {
    // Find all students
    const students = await studentModal.find({});
    
    // Iterate over each document and update it
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      // Update the document to unset the key
      await studentModal.findOneAndUpdate(
        { _id: student._id },
        { $set: { assignedCouns: '' } }
        );
        }
        
        console.log('Updated students with counsellor ids successfully.');
        
    // Optionally, print a message indicating the operation is complete
    // console.log("Cleared values of key from all documents.");
    
    // Return a success message
    return res.status(200).json({ success: true, message: 'Assigned counsellors cleared successfully.' });
    } catch (error) {
      console.error("Error in resetting assigned Couns:", error); // Log the error for debugging purposes
      return res.status(500).json({ success: false, error: "Internal server error" });
      }
      }


      
      export const getArnavCounsellorDataList = async (req, res) => {
        const id = req.params.id;
        console.log(id, "in ArnavSalesList");
        try {
          const studentList = await studentModal.find({ source: "fb_arnav" });
          // add here 
          // console.log(sales[3].remarks);
      
          if (!studentList) {
            return res.status(404).json({ msg: "Students data not found" });
          }
          res.status(200).json(studentList);
          return;
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }