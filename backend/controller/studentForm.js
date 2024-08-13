import studentModal from "../models/studentDetail.js";
import Todo from "../models/councellorToDoModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import counsellorModal from "../models/counsellorDetail.js";
import agentModal from "../models/agentModel.js";
import { Types } from "mongoose";
// import nodemailer from "nodemailer";
import { sessionSecret, emailUser, emailPass } from "../config/config.js";
import councellorToDoModel from "../models/councellorToDoModel.js";
import assignmentConfigModal from "../models/lastAssignedCounsellor.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getUri } from "../middleware/dataUri.js";
import cloudinary from "cloudinary";
import { group, log } from "console";
import { networkInterfaces } from "os";
import generateToken from "../utils/generateToken.js";
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
    const user = await studentModal.findOne({
      $or: [{ email: data.email }, { contactNumber: data.contactNumber }],
    });
    // console.log(user,"otherresp");
    console.log(data, "ersponase on otherresponsew");
    if (user) {
      const isMail = user.email == data.email;

      const isOtherResponseExist = user.otherResponse.find(
        (x) =>
          x.courseSelected == data.courseSelected &&
          x.preferredCollege == data.preferredCollege
      );

      if (
        user.courseSelected == data.courseSelected &&
        user.preferredCollege == data.preferredCollege
      ) {
        const sameDetail = isMail ? "Email" : "Contact Number";
        return res.status(400).json({
          sucess: false,
          msg: `Same Detail With Same ${sameDetail} Already Exist`,
        });
      }

      const anotherResponse = {
        guardianName: data.guardianName,
        district: data.district,
        state: data.state,
        name: data.name,
        whatsappNumber: data.whatsappNumber,
        courseSelected: data.courseSelected,
        source: data.source,
        sourceId: data.sourceId,
        preferredCollege: data.preferredCollege,
        contactNumber: data.contactNumber,
        email: data.email,
        neetScore: data.neetScore,
        neetAIR: data.neetAIR,
      };
      user.otherResponse.push(anotherResponse);
      const saved_data = await user.save();

      return res.status(200).json({
        sucess: true,
        msg: "Form Submitted Succesfully",
      });
    } else {
      console.log(data.AssignedCouns, "nhi hoga");
      if (data.AssignedCouns == "") {
        await studentModal.create(data);
        return res.status(201).json({
          sucess: true,
          msg: "Form Submitted Succesfully",
        });
      } else {
        data.assignedCouns = data.AssignedCouns;

        await studentModal.create(data);
        return res.status(201).json({
          success: true,
          message: "Form Submitted Successfully",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
}

export const insertAgent = async (req, res) => {
  const agent_data = req.params;
  console.log(agent_data, "button click of agent");

  await agentModal.create(agent_data);
  return res.status(201).json({
    success: true,
    msg: "Agent Created Successfully",
  });
};
// export const insertFromSheet= async(req,res)=>{
//   const agent_data= req.body;
//   console.log(agent_data,"api call of multiple students");

// await studentModal.create(agent_data);
//       return res.status(201).json({
//         success: true,
//         msg: "Multiple Students Created Successfully",
//       });

// }

export const insertFromSheet = async (req, res) => {
  try {
    const agent_data = req.body;

    const dataToInsert = agent_data.map((entry) => {
      if (entry.whatsappnumber && entry.whatsappnumber.length < 10) {
        return { ...entry, wrongEntry: true };
      }
      return entry;
    });

    const userPhone = dataToInsert.map(user => user.contactNumber);
    const isExist = await studentModal.find({ contactNumber: { $in: userPhone } })
    // console.log(isExist);

    const data = dataToInsert.filter((elem) =>
      isExist.some((isElem) => elem.contactNumber === isElem.contactNumber)
    );

    const filteredDataToInsert = dataToInsert.filter((elem) => {
      return !data.some((dataElem) => dataElem.contactNumber === elem.contactNumber);
    });

    if (isExist) {
      for (const elem of data) {
        for (const isExistElem of isExist) {
          if (isExistElem.preferredCollege === String(elem.preferredCollege) || isExistElem.otherResponse.preferredCollege === String(elem.preferredCollege)) {
            return res.status(400).json({
              success: false,
              msg: `${elem.name} Already Exists in the database`,
            });
          }
        }
      }


      data.forEach(async (elem) => {
        isExist.forEach(async (isExist) => {
          if (isExist.contactNumber == elem.contactNumber) {
            isExist.otherResponse.push(elem);
            await isExist.save();
          }
        })
      })


      const insertedStudents = filteredDataToInsert.forEach(async (elem) => {
        await studentModal.create(elem);
      })

      return res.status(200).json({
        success: true,
        msg: "Multiple Students Created Successfully",
      });

    }

    const insertedStudents = await studentModal.create(dataToInsert);

    return res.status(200).json({
      success: true,
      msg: "Multiple Students Created Successfully"
    });
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to create multiple students",
      // error: err.message,
    });
  }
};

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

    return res.status(200).json({
      sucess: true,
      msg: "Sucessfull Fetched",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
}

export async function getStudentProfile(req, res) {
  console.log(req.body);
  try {
    const studentId = req.params.id;

    const student = await studentModal.find({ _id: studentId });

    // const data = student

    return res.status(200).json({
      sucess: true,
      msg: "Sucessfull Fetched",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
}

export const dateSorting = async (req, res) => {
  try {
    const { start, end } = req.body;
    const startDate = new Date(start).toISOString();
    const endDate = new Date(end).toISOString();
    const students = await studentModal.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    return res.status(200).json({
      sucess: true,
      students,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

export const getTodos = async (req, res) => {
  //    const todos = await Todo.find();
  const id = req.params.id;
  console.log(id, "id in gettodos");
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
      { _id: _id },
      {
        $push: {
          [`remarks.${followUpStage}`]: {
            subject: name,
            updatedAt: new Date(),
          },
        },
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
    const {
      _id,
      name,
      followUpStage,
      additionalOption, // Include additionalOption in API call
      preBookingAmount,
      url,
    } = req.body;
    console.log(preBookingAmount, "amount");

    const file = req.file

    const uri = getUri(file)
    const cloud = await cloudinary.v2.uploader.upload(uri.content, { folder: `fee-receipt` })


    const todo = await studentModal.updateOne(
      { _id: _id },
      {
        $push: {
          [`remarks.${followUpStage}`]: {
            subject: name,
            updatedAt: new Date(),
            additionalOption: additionalOption,
            preBookingAmount: preBookingAmount,
            url: cloud.secure_url,
            cloudId: cloud.public_id,
          },
        },
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
    let counsellorId, counsellorLength, officeLocation;
    const mobileNo = req.body.mobile;
    const olduser = await counsellorModal.findOne({ mobile: mobileNo });
    if (olduser) {
      return res.send({ error: "User Exists !" });
    }
    let isAdmissionHead = false;
    if (req.body.pageFor == "admissionHead") {
      isAdmissionHead = true;
    } else {
      officeLocation = req.body.office_location
      if (!officeLocation) {
        return res.status(400).json({
          message: "Office Location needed"
        })
      }

      if (officeLocation == "Noida") {
        officeLocation = "CKN" + (new Date()).getFullYear();
      } else if (officeLocation == "Kanpur") {
        officeLocation = "CKK" + (new Date()).getFullYear();
      }

    }
    counsellorId = officeLocation;
    counsellorLength = await assignmentConfigModal.findOne({});
    if (!counsellorLength.lastCounsellorLength) {
      counsellorLength.lastCounsellorLength = await counsellorModal.countDocuments({});
      await counsellorLength.save()
    }
    counsellorLength = counsellorLength.lastCounsellorLength + 1;
    counsellorId += `${counsellorLength}`.padStart(3, "0");

    const spassword = await securePassword(req.body.password);
    console.log(spassword);

    const user = new counsellorModal({
      counsellor_id: isAdmissionHead ? "" : counsellorId,
      name: req.body.username,
      email: req.body.email,
      mobile: req.body.mobile,
      // image: "image",
      password: spassword,
      is_admin: 0,
      college_website: req.body.college_website,
      who_am_i: isAdmissionHead ? "admissionHead" : "counsellor"
    });

    const userData = await user.save();

    if (req.body.pageFor == "counsellor") {
      const admissionHead = await counsellorModal.findOne({ college_website: req.body.college_website, who_am_i: "admissionHead" });
      if (admissionHead) {
        // add counsellor under admissionHead
        admissionHead.assignedCounsellors.push(userData._id);
        await admissionHead.save();
      }
    }
    // update counsellor length count
    await assignmentConfigModal.updateOne({}, {
      $set: { lastCounsellorLength: counsellorLength }
    });
    console.log(userData);
    res.send(userData);

    // if (userData) {
    //   // sendVerifyMail(req.body.username, req.body.email, userData._id);
    // } 
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something Went Wrong"
    })
  }
};

export const verifyLogin = async (req, res) => {
  try {
    const mobileInput = req.body.mobile;
    const passwordInput = req.body.password;
    // const email = req.body.email;
    // console.log(mobileInput,"email is here");

    // const userData = agentModal.find({name:})

    const regexPattern = new RegExp(`_${mobileInput}$`);
    console.log(regexPattern, "pattern");
    const userData = await agentModal
      .find({ name: { $regex: regexPattern } })
      .exec();
    console.log(userData, "data in agent");
    let token;
    if (Object.keys(userData).length) {
      console.log(userData, "data in AGENT");
      const nameField = userData[0].name;
      const password = userData[0].password;
      // Splitting the name field value by underscore to extract category and name
      const parts = nameField.split("_");

      // Assuming the format is consistent and contains exactly three parts
      const category = parts[0]; // First part is the category
      const name = parts[1]; // Second part is the name
      const mobileNumber = parts[2]; // Third part is the mobile number

      console.log("Category:", category); // Output: business
      console.log("Name:", name); // Output: restaurant
      console.log("Mobile Number:", mobileNumber); // Output: 1234567890

      // Assuming the format is consistent and contains exactly three parts
      const category_name = parts.slice(0, 2).join("_");

      if (mobileInput == mobileNumber && password === passwordInput) {
        if (res.status(201)) {
          // if (userData.is_admin === 1) {
          //   return res.json({ status: "ok", data: userData._id, type: "admin" });
          // } else {
          token = generateToken(userData, false);
          res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
          })
          return res.json({ status: "ok", data: category_name, type: "agent" });

          // }
        } else {
          return res.json({ error: "error" });
        }
      } else {
        return res.json({ error: " ID and Password are incorrect !" });
      }
    } else {
      const userData = await counsellorModal.findOne({
        // employee_id: employee_id,
        // email: email,
        mobile: mobileInput,
      });
      if (userData) {
        const passwordMatch = await bcrypt.compare(
          passwordInput,
          userData.password
        );

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

          // Generate JWT token with user data
          token = generateToken(userData);

          // Set the JWT token in a cookie
          // res.cookie('token', token, {
          //   httpOnly: true,  
          //   secure: false, 
          //   maxAge: 3600000, 
          //   sameSite: 'none',
          //   priority: 'High'
          // });
          res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
          })

          if (res.status(201)) {
            if (userData.is_admin === 1) {
              return res.json({
                status: "ok",
                data: userData._id,
                type: "admin",
              });
            } else {
              if (userData.college_website != "" && userData.who_am_i == "admissionHead") {
                return res.json({
                  status: "ok",
                  data: userData._id,
                  type: "admissionHead",
                });
              } else {
                return res.json({
                  status: "ok",
                  data: userData._id,
                  type: "user",
                });
              }
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
    }
  } catch (error) {
    console.log(error.message);
  }
};

// export const uploadPayReceipt = async (req, res) => {
//   try {
//     const id = req.params.id
//     const file = req.file
//     console.log("file");
//     const uri = getUri(file)
//     const cloud = await cloudinary.v2.uploader.upload(uri.content, { folder: `fee-receipt/${id}` })

//     return res.status(200).json({
//       success: true,
//       message: "Receipt uploaded successfully",
//       url: cloud.secure_url
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }

export const assignAuto = async (req, res) => {
  // Fetch all counsellor ids
  const counsellors = await counsellorModal.find({ allLeads: 0 });
  const counsellorIds = counsellors.map((c) => c._id); // counsellor_id is changed to id bacause we fetch councellor by id from url.

  const students = await studentModal.find({
    $and: [
      {
        sourceId: {
          $not: {
            $in: [
              /off_rec/,
              /localhost/,

            ]
          }
        }
      },
      {
        sourceId: {
          $ne: ""  // $ne (not equal) to an empty string
        }
      },
      {
        sourceId: {
          $ne: null  // $ne (not equal) to an empty string
        }
      },
      // Exclude records with 'office_rec' in sourceId
      { assignedCouns: "" }, // Filter records with empty 'assignedCouns'
      { neetScore: { $regex: /^\d+$/, $lt: "350" } }
    ]
  });




  console.log(students, "stude");

  // const assignmentConfig = await assignmentConfigModal.findOne({}).exec();
  // let counsellorIndex = assignmentConfig
  //   ? assignmentConfig.lastAssignedCounsellorIndex
  //   : 0;

  // // Assign counsellor ids in a round-robin fashion
  // for (let i = 0; i < students.length; i++) {
  //   const student = students[i];
  //   const newCounsellorId = counsellorIds[counsellorIndex];
  //   console.log(newCounsellorId, typeof newCounsellorId);

  //   // if(student.assignedCouns == ""){
  //   await studentModal.updateOne(
  //     { _id: student._id },
  //     { $set: { assignedCouns: newCounsellorId } }
  //   );
  //   // }
  //   console.log(
  //     "student id :- ",
  //     student._id,
  //     "assigned councellor:- ",
  //     student.assignedCouns
  //   );
  //   counsellorIndex = (counsellorIndex + 1) % counsellorIds.length;
  // }

  // // Update the last assigned counsellor index
  // await assignmentConfigModal.updateOne(
  //   {},
  //   { $set: { lastAssignedCounsellorIndex: counsellorIndex } },
  //   { upsert: true }
  // );

  // console.log("Updated students with counsellor ids successfully.");
  return res.status(200).json(students);
  // return res.status(200).json(counsellorIds);
};

export const getCounsellorInfo = async (req, res) => {
  try {
    const counsellor = await counsellorModal.find();
    return res.status(200).json({
      sucess: true,
      msg: "Sucessfull Fetched",
      data: counsellor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCounsellorDataList = async (req, res) => {
  const id = req.params.id;
  console.log(id, "in SalesList");
  try {
    if (id == "6672c48614be596e4ccb3b39") {
      const studentList = await studentModal.find({ source: "fb_arnav" });
      if (!studentList) {
        return res.status(404).json({ msg: "Students data not found" });
      }
      res.status(200).json(studentList);
      return;
    } else {
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
};

export const showSpecificLeads = async (req, res) => {
  const id = req.params.id;
  console.log(id, "in show Specific leads");
  try {
    const agentName = await counsellorModal.find({ _id: id });
    console.log(agentName, "agent");
    const collegeWebsite = agentName[0].college_website;
    console.log(collegeWebsite, "website");

    const studentList = await studentModal.find({
      sourceId: { $regex: collegeWebsite, $options: "i" },
    });
    // $regex is used for case-insensitive substring matching

    if (studentList.length === 0) {
      return res.status(404).json({ msg: "Students data not found" });
    }

    res.status(200).json(studentList);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const renameKey = async (req, res) => {
  try {
    // Assuming `studentModal` is your Mongoose model for the student collection
    await studentModal.updateMany(
      {},
      { $rename: { preffredCollege: "preferredCollege" } },
      { strict: false }
    );

    // Assuming `students` is defined somewhere in your code, otherwise, you need to fetch it from the database
    const students = await studentModal.find({});

    return res
      .status(200)
      .json({ success: true, message: "Key renamed successfully", students });
  } catch (error) {
    console.error("Error in renameKey route:", error); // Log the error for debugging purposes
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export async function getAllLeads(req, res) {
  try {
    const { limit, page } = req.query;

    const student = await studentModal.find();

    if (limit && page) {
      const starting = (page - 1) * limit;
      const ending = page * limit;

      const data = student.slice(starting, ending);

      return res.status(200).json({
        sucess: true,
        msg: "Sucessfull Fetched",
        data,
      });
    }

    return res.status(200).json({
      sucess: true,
      msg: "Sucessfull Fetched",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
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
        { $set: { assignedCouns: "" } }
      );
    }

    console.log("Updated students with counsellor ids successfully.");

    // Optionally, print a message indicating the operation is complete
    // console.log("Cleared values of key from all documents.");

    // Return a success message
    return res.status(200).json({
      success: true,
      message: "Assigned counsellors cleared successfully.",
    });
  } catch (error) {
    console.error("Error in resetting assigned Couns:", error); // Log the error for debugging purposes
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

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
};

export const getAgentLeads = async (req, res) => {
  console.log(req.params.categoryName, "name in agentSpecific");
  const cat_name = req.params.categoryName;

  const sales = await studentModal.find({ source: cat_name });
  // add here
  console.log("here it is");

  if (!sales) {
    return res.status(404).json({ msg: "Sales data not found" });
  }
  return res.status(200).json(sales);
  // const id = req.params.id;
  // console.log(id, "in ArnavSalesList");
  // try {
  //   const studentList = await studentModal.find({ source: "fb_arnav" });
  //   // add here
  //   // console.log(sales[3].remarks);

  //   if (!studentList) {
  //     return res.status(404).json({ msg: "Students data not found" });
  //   }
  //   res.status(200).json(studentList);
  //   return;
  // } catch (error) {
  //   res.status(500).json({ error: error });
  // }
};

export const slotBook = async (req, res) => {
  console.log(req.body, "params in slotbook");

  try {
    const { _id, visitDate, office } = req.body;

    const update = await studentModal.updateOne(
      { _id: _id },
      {
        $set: {
          DateToVisit: visitDate,
          location: office,
        },
      }
    );

    if (update.nModified === 0) {
      return res
        .status(404)
        .json({ message: "Student not found or data not modified" });
    }

    res.status(200).json({ message: "Visit date updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const bookedSlot = async (req, res) => {
  try {
    const students = await studentModal.find({
      DateToVisit: { $exists: true, $ne: "" },
    });

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// export const formToSheet = async(req,res)=>{
//   try {

//     const sheetData= await studentModal.find();
//     console.log(sheetData,"sheetdata")
//     res.status(200).json(sheetData);
//   } catch (error) {
//     console.error(error);
//           res.status(500).json({ error: error.message });
//   }
// }

export const formToSheet = async (req, res) => {
  try {
    // Get the directory name
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // const sheetData = await studentModal.find();
    if (!req.body) {
      res.status(500).json({
        message: "Please provide data",
      });
    }
    const sheetData = req.body;
    console.log(sheetData, "sheetdata");

    // Define the path to the JSON file
    const filePath = path.join(__dirname, "sheetData.json");

    // Check if file exists
    if (fs.existsSync(filePath)) {
      // Read the existing data
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).json({ error: "Error reading file" });
        }

        // Parse the existing data
        let existingData = JSON.parse(data);
        if (!Array.isArray(existingData)) {
          existingData = [];
        }

        // Append the new data
        const updatedData = existingData.concat(sheetData);

        // Write the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => {
          if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ error: "Error writing to file" });
          }

          console.log("Data successfully updated in file");
          res.status(200).json({
            message: "Data successfully updated in file",
            data: updatedData,
          });
        });
      });
    } else {
      // File does not exist, create it and write the new data
      fs.writeFile(filePath, JSON.stringify(sheetData, null, 2), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).json({ error: "Error writing to file" });
        }

        console.log("Data successfully saved to new file");
        res.status(200).json({
          message: "Data successfully saved to new file",
          data: sheetData,
        });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateAdminAvailableDays = async (req, res) => {
  // const { startDate, endDate } = req.body;
  // console.log(startDate,endDate,"endAdmin");

  const { kanpurStartDate, kanpurEndDate, noidaStartDate, noidaEndDate } =
    req.body;

  try {
    const result = await counsellorModal.updateOne(
      { is_admin: 1 }, // Filter to find the document
      { $set: { kanpurStartDate, kanpurEndDate, noidaStartDate, noidaEndDate } } // Use $set to update the fields
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "Counselor not found or no changes made." });
    }

    res.json({ message: "Dates updated successfully." });
  } catch (error) {
    console.error("Error updating counselor:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getAdminAvailableDays = async (req, res) => {
  const counselor = await counsellorModal.findOne({ is_admin: 1 });
  res.json(counselor);
};

export const getCounsellorsWithStudents = async (req, res) => {
  try {
    // Fetch all counsellors with allLeads equal to 0
    const counsellors = await counsellorModal.find({ allLeads: 0 });
    console.log(counsellors, "Kfjdsljfl")

    // Fetch all students where assignedCouns is not empty
    const students = await studentModal.find({});

    // Initialize a map with all counsellors
    const counsellorMap = counsellors.reduce((acc, counsellor) => {
      acc[counsellor._id.toString()] = {
        counsellor,
        students: []
      };
      return acc;
    }, {});

    // Group students by counsellor id
    students.forEach((student) => {
      const counsellorId = student.assignedCouns.toString(); // Ensure counsellorId is converted to string for comparison
      if (counsellorMap[counsellorId]) {
        counsellorMap[counsellorId].students.push(student);
      }
    });

    // Convert map to array of objects
    const counsellorsWithStudents = Object.values(counsellorMap);

    res.status(200).json(counsellorsWithStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getVisitLeads = async (req, res) => {
  const visitedStud = await studentModal.find({
    sourceId: { $regex: /off_rec/ },
  });
  res.json(visitedStud);
};

export const getCounsellorNames = async (req, res) => {
  const counsNames = await counsellorModal.find();
  res.json(counsNames);
};

export const assignOfflineLeadsToCouncellor = async (req, res) => {
  try {
    const { dataToSend, selectedCounsellor } = req.body;

    // Extract ids from the dataToSend array
    const ids = dataToSend.map((item) => item.id);

    // Update the documents that have _id in the ids array
    const updateResult = await studentModal.updateMany(
      { _id: { $in: ids } }, // Match documents where _id is in the ids array
      { $set: { assignedCouns: selectedCounsellor } } // Set the assignedCouns field
    );

    // Return the result of the update operation
    res.json(updateResult);
  } catch (error) {
    console.error("Error assigning leads to counsellor:", error);
    res.status(500).json({ error: "An error occurred while assigning leads." });
  }
};

export const removeCounsellor = async (req, res) => {
  const counsellorId = req.params.id
  console.log(counsellorId, "id to remove")

  try {
    // Remove the counsellor document
    await counsellorModal.findByIdAndDelete(counsellorId);

    // Update student documents
    await studentModal.updateMany({ assignedCouns: counsellorId }, { $set: { assignedCouns: '' } });

    res.status(200).json({ message: 'Counsellor removed and students updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing counsellor and updating students.' });
  }
};






export const getCounsellorRevenueDetails = async (req, res) => {
  try {
    const counsellerId = req.params.id;
    const counsellor = await counsellorModal.findOne({ _id: counsellerId });
    if (!counsellor) {
      return res.status(404).json({
        message: "Counsellor Not Found",
      });
    }
    const admissionHeadId = req.query.admissionHeadId;
    let college_website;
    if (admissionHeadId) {
      const admissionHead = await counsellorModal.findOne({ _id: admissionHeadId });
      college_website = admissionHead.college_website;
    }
    let stuFilter = {
      assignedCouns: counsellerId,
    }
    college_website ? stuFilter.sourceId = college_website : null;
    const counsellorStudents = await studentModal.aggregate([
      {
        $match: stuFilter,
      },
      {
        $addFields: {
          followUp3Length: { $size: "$remarks.FollowUp3" },
        },
      },
      {
        $match: {
          followUp3Length: { $gt: 0 },
        },
      },
    ]);
    if (!counsellorStudents) {
      return res.status(500).json({
        message: "No Students assigned to counsellor",
      });
    }
    let totalRevenue = 0;
    for (let i = 0; i < counsellorStudents.length; i++) {
      for (let j = 0; j < counsellorStudents[i].remarks.FollowUp3.length; j++) {
        totalRevenue += parseInt(
          counsellorStudents[i].remarks.FollowUp3[j].preBookingAmount
        );
      }
    }
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const thisMonthCounsellorStudents = await studentModal.aggregate([
      {
        $match: {
          ...stuFilter,
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $addFields: {
          followUp3Length: { $size: "$remarks.FollowUp3" },
        },
      },
      {
        $match: {
          followUp3Length: { $gt: 0 },
        },
      },
    ]);
    let thisMonthRevenue = 0;
    for (let i = 0; i < thisMonthCounsellorStudents.length; i++) {
      for (
        let j = 0;
        j < thisMonthCounsellorStudents[i].remarks.FollowUp3.length;
        j++
      ) {
        thisMonthRevenue += parseInt(
          thisMonthCounsellorStudents[i].remarks.FollowUp3[j].preBookingAmount
        );
      }
    }
    return res.status(200).json({
      message: "Success",
      data: {
        counsellorName: counsellor.name,
        totalRevenue,
        thisMonthRevenue,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something Went Wrong!",
    });
  }
};

export const getCoursesCounselled = async (req, res) => {
  try {
    const counsellerId = req.params.counsellerId;
    const admissionHeadId = req.query.admissionHeadId;
    let college_website;
    if (admissionHeadId) {
      const admissionHead = await counsellorModal.findOne({ _id: admissionHeadId });
      college_website = admissionHead.college_website;
    }
    let stuFilter = {
      assignedCouns: counsellerId,
    }
    college_website ? stuFilter.sourceId = college_website : null;
    const coursesAggregated = await studentModal.aggregate([
      { $match: stuFilter },
      { $group: { _id: "$courseSelected", count: { $sum: 1 } } },
      { $project: { _id: 0, course: "$_id", count: 1 } },
    ]);

    return res.status(200).json({
      message: "Success",
      data: coursesAggregated,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

export const getCounsellorLeadDetails = async (req, res) => {
  try {
    const counsellerId = req.params.counsellerId;
    const admissionHeadId = req.query.admissionHeadId;
    let college_website;
    if (admissionHeadId) {
      const admissionHead = await counsellorModal.findOne({ _id: admissionHeadId });
      college_website = admissionHead.college_website;
    }
    let stuFilter = {
      assignedCouns: counsellerId,
    }
    college_website ? stuFilter.sourceId = college_website : null;
    const totalLeads = (await studentModal.find(stuFilter)).length;


    console.log(totalLeads)
    // const completedLeads = (await studentModal.find({ assignedCouns: counsellerId,  $where: "this.remarks.FollowUp3.length > 1" }));
    const stage1Students = await studentModal.aggregate([
      {
        $match: stuFilter,
      },
      {
        $addFields: {
          followUp2Length: { $size: "$remarks.FollowUp2" },
          followUp3Length: { $size: "$remarks.FollowUp3" },
        },
      },
      {
        $match: {
          followUp2Length: { $eq: 0 },
          followUp3Length: { $eq: 0 },
        },
      },
    ]);
    const stage2Students = await studentModal.aggregate([
      {
        $match: stuFilter,
      },
      {
        $addFields: {
          followUp2Length: { $size: "$remarks.FollowUp2" },
          followUp3Length: { $size: "$remarks.FollowUp3" },
        },
      },
      {
        $match: {
          followUp2Length: { $gt: 0 },
          followUp3Length: { $eq: 0 },
        },
      },
    ]);
    const counselledStudents = await studentModal.aggregate([
      {
        $match: stuFilter,
      },
      {
        $addFields: {
          followUp3Length: { $size: "$remarks.FollowUp3" },
        },
      },
      {
        $match: {
          followUp3Length: { $gt: 0 },
        },
      },
    ]);
    const completedLeads = counselledStudents.length;

    const stage1Obj = {};
    stage1Obj.firstCallDone = 0;
    stage1Obj.switchOff = 0;
    stage1Obj.notReachable = 0;
    stage1Obj.disconnect = 0;
    stage1Obj.networkIssue = 0;
    stage1Obj.notReceived = 0;
    stage1Obj.incomingNotAvailable = 0;

    const stage2Obj = {};
    stage2Obj.hotLeads = 0;
    stage2Obj.warmLeads = 0;
    stage2Obj.coldLeads = 0;

    const stage3Obj = {};
    stage3Obj.paidCounselling = 0;
    stage3Obj.associateCollege = 0;
    for (let i = 0; i < stage1Students.length; i++) {
      if (
        stage1Students[i].remarks.FollowUp1.at(-1)?.subject.includes(
          "First Call Done"
        )
      ) {
        stage1Obj.firstCallDone += 1;
      } else if (
        stage1Students[i].remarks.FollowUp1.at(-1)?.subject.includes(
          "Switch Off"
        )
      ) {
        stage1Obj.switchOff += 1;
      } else if (
        stage1Students[i].remarks.FollowUp1.at(-1)?.subject.includes(
          "Not Reachable"
        )
      ) {
        stage1Obj.notReachable += 1;
      } else if (
        stage1Students[i].remarks.FollowUp1.at(-1)?.subject.includes(
          "Disconnect"
        )
      ) {
        stage1Obj.disconnect += 1;
      } else if (
        stage1Students[i].remarks.FollowUp1.at(-1)?.subject.includes(
          "Network Issue"
        )
      ) {
        stage1Obj.networkIssue += 1;
      } else if (
        stage1Students[i].remarks.FollowUp1.at(-1)?.subject.includes(
          "Not Received"
        )
      ) {
        stage1Obj.notReceived += 1;
      } else if (
        stage1Students[i].remarks.FollowUp1.at(-1)?.subject.includes(
          "Incoming Not Available"
        )
      ) {
        stage1Obj.incomingNotAvailable += 1;
      }
    }

    for (let i = 0; i < stage2Students.length; i++) {
      if (stage2Students[i].remarks.FollowUp2.at(-1)?.subject.includes("Hot")) {
        stage2Obj.hotLeads += 1;
      } else if (
        stage2Students[i].remarks.FollowUp2.at(-1)?.subject.includes("Warm")
      ) {
        stage2Obj.warmLeads += 1;
      } else if (
        stage2Students[i].remarks.FollowUp2.at(-1)?.subject.includes(
          "Cold Call Done"
        )
      ) {
        stage2Obj.coldLeads += 1;
      }
    }

    for (let i = 0; i < counselledStudents.length; i++) {
      if (
        counselledStudents[i].remarks.FollowUp3.at(-1)?.subject.includes(
          "Paid Counselling"
        )
      ) {
        stage3Obj.paidCounselling += 1;
      } else if (
        counselledStudents[i].remarks.FollowUp3.at(-1)?.subject.includes(
          "Associate College"
        )
      ) {
        stage3Obj.associateCollege += 1;
      }
    }

    return res.status(200).json({
      message: "Success",
      totalLeads,
      completedLeads,
      stage1Obj,
      stage2Obj,
      stage3Obj,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

export const getCounsellorPendingAmount = async (req, res) => {
  try {
    const counsellerId = req.params.counsellerId;
    const admissionHeadId = req.query.admissionHeadId;
    let college_website;
    if (admissionHeadId) {
      const admissionHead = await counsellorModal.findOne({ _id: admissionHeadId });
      college_website = admissionHead.college_website;
    }
    let stuFilter = {
      assignedCouns: counsellerId,
    }
    college_website ? stuFilter.sourceId = college_website : null;
    const counselledStudents = await studentModal.aggregate([
      {
        $match: stuFilter,
      },
      {
        $addFields: {
          followUp3Length: { $size: "$remarks.FollowUp3" },
        },
      },
      {
        $match: {
          followUp3Length: { $gt: 0 },
        },
      },
    ]);
    const studentData = [];
    for (let i = 0; i < counselledStudents.length; i++) {
      const student = counselledStudents[i];
      let studentObj = {
        name: student.name,
        course: student.courseSelected,
      };
      console.log(student.remarks.FollowUp3[0].additionalOption);
      let regex = /[a-zA-Z]+ \- [0-9]+[A-Z]/gm;
      if (regex.test(student.remarks.FollowUp3[0].additionalOption)) {
        const studentPackage = parseInt(
          student.remarks.FollowUp3[0].additionalOption
            .split("-")[1]
            .replace("K", "000")
        );
        let totalAmountPaid = 0;
        for (let j = 0; j < student.remarks.FollowUp3.length; j++) {
          totalAmountPaid += parseInt(student.remarks.FollowUp3[j].preBookingAmount);
        }
        let pendingAmount = studentPackage - totalAmountPaid;
        studentObj.pendingAmount = pendingAmount < 0 ? 0 : pendingAmount;
        studentObj.package = studentPackage;
        studentData.push(studentObj);
      }
    }

    // console.log(counselledStudents);
    return res.status(200).json({
      message: "Success",
      data: studentData,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

export const getAssignedCounsellorStudents = async (req, res) => {
  try {
    const counsellerId = req.params.counsellerId;
    const admissionHeadId = req.query.admissionHeadId;
    let college_website;
    if (admissionHeadId) {
      const admissionHead = await counsellorModal.findOne({ _id: admissionHeadId });
      college_website = admissionHead.college_website;
    }
    let stuFilter = {
      assignedCouns: counsellerId,
    }
    college_website ? stuFilter.sourceId = college_website : null;
    const students = await studentModal.find(stuFilter);

    return res.status(200).json({
      message: "Sucess",
      data: students,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

export const getOfficeReport = async (req, res) => {
  try {
    const office = req.query.office?.toUpperCase();
    let college = req.query.college;
    college = college.replaceAll("'","")
    console.log(college , "string..")

    let counsellorFilter = {}
    let studentFilter = {}

    if(college){
      counsellorFilter.college_website = college
      studentFilter.sourceId = college
    } else if (office) {
      // Filter by office if office parameter is provided and no college parameter is present
      if (office.length !== 1) {
        return res.status(400).send("Invalid Office Parameter");
      }
      counsellorFilter.counsellor_id = new RegExp(`^..${office}`);
    } else {
      return res.status(400).send("Either Office or College Parameter is required");
    }
    // if (!office || office.length !== 1) {
    //   return res.status(400).send("Invalid Office Parameter");
    // }

    // const counsellors = await counsellorModal.find({
    //   counsellor_id: new RegExp(`^..${office}`),
    // });

    console.log(counsellorFilter)

    const counsellors = await counsellorModal.find(counsellorFilter);

    if (counsellors.length === 0) {
      return res.status(404).send("No counsellors found");
    }

    const counsellorIds = counsellors.map((c) => c._id);

    console.log(counsellorIds);
    studentFilter.assignedCouns = { $in: counsellorIds };

    const students = await studentModal.find(studentFilter);

    if (students.length === 0) {
      return res.status(404).send("No students found");
    }
    // const students = await studentModal.find({
    //   assignedCouns: { $in: counsellerId },
    // });

    let totalRevenue = 0;
    let totalAdmissions = 0;
    let totalFollowUp1 = 0;
    let totalFollowUp2 = 0;
    let totalFollowUp3 = 0;
    let paidCounselling = 0;
    let associateCollege = 0;
    let hotLead = 0;
    let warmLead = 0;
    let coldLead = 0;
    let switchOff = 0;
    let notReachable = 0;
    let disconnect = 0;
    let networkIssue = 0;
    let firstCallDone = 0;
    let incomingNotAvailable = 0;
    let notReceived = 0;


    let pendingAmounts = [];

    students.forEach((student) => {
      let hasPreBookingAmount = false;
      let hasFollowUp3 =
        student.remarks.FollowUp3 && student.remarks.FollowUp3.length > 0;
      let hasFollowUp2 =
        student.remarks.FollowUp2 && student.remarks.FollowUp2.length > 0;
      let hasFollowUp1 =
        student.remarks.FollowUp1 && student.remarks.FollowUp1.length > 0;

      if (hasFollowUp3) {
        totalFollowUp3++;
        let totalPaid = 0;
        let packageAmount = 0;


        student.remarks.FollowUp3.forEach((followUp, index) => {
          const preBookingAmount = parseFloat(followUp.preBookingAmount || 0);
          totalPaid += preBookingAmount;
          totalRevenue += preBookingAmount;

          if (preBookingAmount > 0) {
            hasPreBookingAmount = true;
          }
          // Calculate paid counselling and associate college based on latest remark
          if (index === student.remarks.FollowUp3.length - 1) {
            const packageAmountMatch = followUp.additionalOption.match(/\d+/);
            packageAmount = packageAmountMatch ? parseInt(packageAmountMatch[0]) * 1000 : 0;

            if (followUp.subject.includes("Paid Counselling")) {
              paidCounselling++;
            } else if (followUp.subject.includes("Associate College")) {
              associateCollege++;
            }
          }
        });

        if (hasPreBookingAmount) {
          totalAdmissions++;
        }

        const pendingAmount = packageAmount - totalPaid;
        if (pendingAmount > 0) {
          pendingAmounts.push({
            studentId: student._id,
            name: student.name,
            packageAmount,
            totalPaid,
            pendingAmount
          });
        }

      } else if (hasFollowUp2) {
        totalFollowUp2++;

        // Calculate hot, warm, and cold leads based on latest remark in FollowUp2
        const latestFollowUp2 =
          student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1];
        if (latestFollowUp2.subject.includes("Hot")) {
          hotLead++;
        } else if (latestFollowUp2.subject.includes("Warm")) {
          warmLead++;
        } else if (latestFollowUp2.subject.includes("Cold")) {
          coldLead++;
        }
      } else if (hasFollowUp1) {
        totalFollowUp1++;

        const latestFollowUp1 = student.remarks.FollowUp1[student.remarks.FollowUp1.length - 1];
        if (latestFollowUp1.subject.includes("Switch Off")) {
          switchOff++;
        } else if (latestFollowUp1.subject.includes("Not Reachable")) {
          notReachable++;
        } else if (latestFollowUp1.subject.includes("Disconnect")) {
          disconnect++;
        } else if (latestFollowUp1.subject.includes("Network Issue")) {
          networkIssue++;
        } else if (latestFollowUp1.subject.includes("First Call Done")) {
          firstCallDone++;
        } else if (latestFollowUp1.subject.includes("Not Received")) {
          notReceived++;
        } else if (latestFollowUp1.subject.includes("Incoming Not Available")) {
          incomingNotAvailable++;
        }
      }
    });

    const totalCounsellors = counsellors.length;
    const conversionExpected = Math.round((hotLead / totalFollowUp2) * 100);

    return res.json({
      totalRevenue,
      totalAdmissions,
      totalCounsellors,
      conversionExpected,
      followUp1: {
        totalFollowUp1,
        switchOff,
        notReachable,
        disconnect,
        networkIssue,
        firstCallDone,
        notReceived,
        incomingNotAvailable,
      },
      followUp2: {
        totalFollowUp2,
        hotLead,
        warmLead,
        coldLead,
      },
      followUp3: {
        totalFollowUp3,
        paidCounselling,
        associateCollege,
      },
      students,
      pendingAmounts
    });

    // return res.json(students)
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// export const getTopPerformer = async (req, res) => {
//   try {
//     // Fetch all student records
//     const students = await studentModal.find();

//     // Group students by their assigned counselors
//     const groupedStudents = students.reduce((acc, student) => {
//       const assignedCouns = student.assignedCouns;
//       if (!acc[assignedCouns]) {
//         acc[assignedCouns] = [];
//       }
//       acc[assignedCouns].push(student);
//       return acc;
//     }, {});


//     let admissionMap = {};
//     Object.keys(groupedStudents).forEach(async (key) => {
//       let totalAdmissions = 0;
//       let hasPreBookingAmount = false;
//       groupedStudents[key].forEach(async (student) => {
//         if (student.remarks.FollowUp3) {
//           student.remarks.FollowUp3.forEach((followUp) => {
//             if (parseInt(followUp.preBookingAmount) > 0) {
//               hasPreBookingAmount = true;
//             }
//           });
//         }

//         if (hasPreBookingAmount) {
//           totalAdmissions += 1;
//           hasPreBookingAmount = false;
//         }

//         admissionMap[key] = totalAdmissions;

//       });

//     });


//     return res.status(200).json(admissionMap);

//   } catch (error) {
//     console.error("Error fetching top performers:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };


export const getTopPerformer = async (req, res) => {
  try {

    const allCouncellor = await counsellorModal.find().select('_id name counsellor_id');
    const allStudents = await studentModal.find();
    let totalPerformance = [];
    allCouncellor.forEach((cons) => {
      let isPreBookingAmount = false
      let admission = 0;
      allStudents.forEach((stud) => {
        if (stud.assignedCouns == cons._id) {
          stud.remarks.FollowUp3.forEach((follow) => {
            if (parseInt(follow.preBookingAmount) > 0) {
              isPreBookingAmount = true;
            }
          })

        }
        if (isPreBookingAmount) {
          admission += 1;
          isPreBookingAmount = false;
        }
      });
      totalPerformance.push({ name: cons.name, id: cons.counsellor_id, admission, objectId: cons._id });
    });

    return res.status(200).json(
      {
        sucess: true,
        totalPerformance
      });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}


export const getUnassignedLeads = async (req, res) => {
  try {
    // const counsellerId = req.params.counsellerId;
    const students = await studentModal.find({ assignedCouns: "" });

    return res.status(200).json({
      message: "Sucess",
      data: students
    })

  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong"
    })
  }
}


export const updatePassword = async (req, res) => {
  try {
    const bodyData = req.body;
    const newPass = bodyData.newPassword;
    const userId = bodyData.userId; // Assuming you get the user ID from the request body

    if (!newPass) {
      return res.status(400).json({
        message: "Please Provide Password"
      });
    }

    // Generate a salt and hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPass, saltRounds);

    // Find the user and update the password
    const user = await counsellorModal.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
}


export const getCounsellorByNumber = async (req, res) => {
  try {
    const bodyData = req.body;
    if (!bodyData.mobileNo) {
      return res.status(400).json({
        message: "Please Provide Mobile No"
      })
    }
    const counsellor = await counsellorModal.findOne({ mobile: bodyData.mobileNo });

    return res.status(200).json({
      message: "Success",
      data: counsellor
    })
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong"
    })
  }
}

export const getAdmissionHeadCounsellors = async (req, res) => {
  try {
    const admId = req.params.admissionHeadId;
    console.log(admId, "id in  head")
    const counsellorData = await counsellorModal.findOne({ _id: admId, who_am_i: "admissionHead" }).populate("assignedCounsellors");

    return res.status(200).json({
      message: "Success",
      data: counsellorData
    })

  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
      error: err.message
    })
  }
}

export const getAdmissionHeadCounsellorsWithStudents = async (req, res) => {
  try {
    const admId = req.params.admissionHeadId;
    const isCollegeSpecific = req.query.collegeSpecific === 'true';
    console.log(isCollegeSpecific);
    console.log(admId, "id in  head")
    const counsellorData = await counsellorModal.findOne({ _id: admId, who_am_i: "admissionHead" }).populate("assignedCounsellors");

    const counsellorWithStudents = [];

    for (const counsellor of counsellorData.assignedCounsellors) {
      const counsellorId = counsellor._id;
      const collegeWebsite = counsellor.college_website;

      // Fetch students assigned to this counsellor whose sourceId matches the college website
      // const students = await studentModal.find({
      //   assignedCouns: counsellorId,
      //   sourceId: collegeWebsite,
      // });

      const studentQuery = { assignedCouns: counsellorId };

      // Apply college website filter only if it's a college-specific report
      if (isCollegeSpecific) {
        console.log(isCollegeSpecific)
        studentQuery.sourceId = collegeWebsite;
      }


      const students = await studentModal.find(studentQuery);

      let totalLeads = students.length;
      let totalFollowUp3Leads = 0;
      let paidCounselingCount = 0;
      let associateCollegeCount = 0;
      let totalFollowUp2Leads = 0;
      let hotLeadCount = 0;
      let coldLeadCount = 0;
      let warmLeadCount = 0;
      let totalFollowUp1Leads = 0;
      let firstCallDoneCount = 0;
      let disconnectCount = 0;
      let notReceivedCount = 0;
      let notReachableCount = 0;
      let totalCallsDone = 0;
      let totalRevenue = 0;
      let totalAdmissions = 0;


      // Process each student
      students.forEach((student) => {
        let hasPreBookingAmount = false;
        const remarks = student.remarks || {};

        if (
          remarks.FollowUp1 && remarks.FollowUp1.length > 0 ||
          remarks.FollowUp2 && remarks.FollowUp2.length > 0 ||
          remarks.FollowUp3 && remarks.FollowUp3.length > 0
        ) {
          totalCallsDone++;
        }

        // Check for FollowUp3 entries
        if (remarks.FollowUp3 && remarks.FollowUp3.length > 0) {
          totalFollowUp3Leads++;

          remarks.FollowUp3.forEach((followUp) => {
            if (followUp.preBookingAmount) {
              totalRevenue += parseFloat(followUp.preBookingAmount) || 0;
            }

            if (followUp.preBookingAmount > 0) {
              hasPreBookingAmount = true
            }
          });

          if (hasPreBookingAmount) {
            totalAdmissions++;
          }

          const latestRemark = remarks.FollowUp3[remarks.FollowUp3.length - 1];
          if (latestRemark.subject.includes("Paid Counselling")) {
            paidCounselingCount++;
          } else if (latestRemark.subject.includes("Associate College")) {
            associateCollegeCount++;
          }
        } else if (remarks.FollowUp2 && remarks.FollowUp2.length > 0) {
          totalFollowUp2Leads++;
          const latestRemark = remarks.FollowUp2[remarks.FollowUp2.length - 1];
          if (latestRemark.subject.includes("Hot Lead")) {
            hotLeadCount++;
          } else if (latestRemark.subject.includes("Cold")) {
            coldLeadCount++;
          } else if (latestRemark.subject.includes("Warm")) {
            warmLeadCount++;
          }
        } else if (remarks.FollowUp1 && remarks.FollowUp1.length > 0) {
          totalFollowUp1Leads++;
          remarks.FollowUp1.forEach((remark) => {
            if (remark.subject.includes("First Call Done")) {
              firstCallDoneCount++;
            } else if (remark.subject.includes("Disconnect")) {
              disconnectCount++;
            } else if (remark.subject.includes("Not Received")) {
              notReceivedCount++;
            } else if (remark.subject.includes("Not Reachable")) {
              notReachableCount++;
            }
          });
        }
      });

      counsellorWithStudents.push({
        counsellor,
        students,
        totalLeads,
        totalFollowUp3Leads,
        paidCounselingCount,
        associateCollegeCount,
        totalFollowUp2Leads,
        hotLeadCount,
        coldLeadCount,
        warmLeadCount,
        totalFollowUp1Leads,
        firstCallDoneCount,
        disconnectCount,
        notReceivedCount,
        notReachableCount,
        totalCallsDone,
        totalRevenue,
        totalAdmissions,
      });
    }

    // Response
    return res.status(200).json({
      message: "Success",
      data: counsellorWithStudents
    });

  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
      error: err.message
    })
  }
}

export const showCounsCollegeLeads = async (req, res) => {
  const id = req.params.id;
  console.log(id, "in show counsellor Specific leads");
  try {
    const agentName = await counsellorModal.find({ _id: id });

    if (agentName.length === 0) {
      return res.status(404).json({ msg: "Counsellor not found" });
    }

    console.log(agentName, "agent");
    const collegeWebsite = agentName[0].college_website;
    console.log(collegeWebsite, "website");

    if (collegeWebsite) {
      const studentList = await studentModal.find(

        {
          $and: [
            { sourceId: { $regex: collegeWebsite, $options: "i" } },
            { assignedCouns: id }],
        });
      // $regex is used for case-insensitive substring matching

      // if (studentList.length === 0) {
      //   return res.status(404).json({ msg: "Students data not found" });
      // }

      res.status(200).json(studentList);

    } else {
      return res.status(403).json({ msg: "You are not authorized to access these leads" })
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


export const logout = (req, res) => {
  try {
    return res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    }).json({
      status: "Success",
      message: "Logged Out Succesfully"
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      message: "Something Went Wrong"
    })
  }
}


export const assignCollegesSeniorAdmHead = async (req, res) => {
  const { counsellorID, colleges } = req.body
  try {
    const exisitingCounsellor = await counsellorModal.findById(counsellorID)

    if(!exisitingCounsellor){
      return res.status(404).json({message: "Senior Admission Head Not Found"});
    }

    const currentColleges = new Set(exisitingCounsellor.multiple_colleges)

    colleges.forEach((college) => currentColleges.add(college))

    const updatedColleges = Array.from(currentColleges);

    const updatedCounsellor = await counsellorModal.findByIdAndUpdate(
      counsellorID,
      {
        $set: {
          who_am_i: "senior_adm_head",
          multiple_colleges: updatedColleges,
        }
      },

      { new: true }
    )

    if (!updatedCounsellor) {
      return res.status(404).json({ message: "Counsellor not found" })
    }

    res.status(200).json({
      message: "Counsellor Updated Successfully",
      counsellor: updatedCounsellor
    })
  } catch (error) {
    res.status(500).json({ message: "Error updating counsellor", error })
  }
}


export const getAllSeniorAdmHeads = async (req, res) => {
  try {
    // Find all counsellors where who_am_i is 'senior_adm_head'
    const seniorAdmHeads = await counsellorModal.find({ who_am_i: "senior_adm_head" });

    if (seniorAdmHeads.length === 0) {
      return res.status(404).json({ message: "No Senior Admission Heads found" });
    }

    res.status(200).json({
      message: "Senior Admission Heads retrieved successfully",
      seniorAdmHeads,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Senior Admission Heads", error });
  }
};


export const getAssignedColleges = async (req, res) =>{
  try {
    const seniorAdmHeads = await counsellorModal.find(
      {who_am_i: "senior_adm_head" },
      {multiple_colleges: 1, _id: 0}
    )

    const assignedColleges = seniorAdmHeads.map((head) => head.multiple_colleges).flat()

    return res.status(200).json({assignedColleges})

  } catch (error) {
    return res.status(500).json({message: "Error fetching already assigned colleges", error})
  }
}




export const getSeniorAdmHeadReport = async (req, res) =>{
  try {
    const seniorAdmHeadID = req.query.seniorAdmHeadID
    
    const seniorAdmHead = await counsellorModal.findById(seniorAdmHeadID)
  
    if(!seniorAdmHead || !seniorAdmHead.multiple_colleges){
      return res.status(404).json({message: "Senior Admission Head not found or no colleges assigned"})
    }
  
    const colleges = seniorAdmHead.multiple_colleges
  
    let reportData = []
  
    for(let college of colleges){
      console.log(college)
      let counsellorFilter = {college_website: college}
      let studentFilter = {sourceId: college}
  
      const counsellors = await counsellorModal.find(counsellorFilter)
  
      // if (counsellors.length === 0) {
      //   continue; // Skip if no counselors found for this college
      // }
  
      const counsellorIds = counsellors.map((c) => c._id)
  
      studentFilter.assignedCouns = {$in: counsellorIds}
      const students = await studentModal.find(studentFilter)
  
      // if (students.length === 0) {
      //   continue; // Skip if no students found for this college
      // }
  
      let totalRevenue = 0;
      let totalAdmissions = 0;
      let totalFollowUp1 = 0;
      let totalFollowUp2 = 0;
      let totalFollowUp3 = 0;
      let paidCounselling = 0;
      let associateCollege = 0;
      let hotLead = 0;
      let warmLead = 0;
      let coldLead = 0;
      let switchOff = 0;
      let notReachable = 0;
      let disconnect = 0;
      let networkIssue = 0;
      let firstCallDone = 0;
      let incomingNotAvailable = 0;
      let notReceived = 0;
  
  
      let pendingAmounts = [];
  
      students.forEach((student) => {
        let hasPreBookingAmount = false;
        let hasFollowUp3 =
          student.remarks.FollowUp3 && student.remarks.FollowUp3.length > 0;
        let hasFollowUp2 =
          student.remarks.FollowUp2 && student.remarks.FollowUp2.length > 0;
        let hasFollowUp1 =
          student.remarks.FollowUp1 && student.remarks.FollowUp1.length > 0;
  
        if (hasFollowUp3) {
          totalFollowUp3++;
          let totalPaid = 0;
          let packageAmount = 0;
  
  
          student.remarks.FollowUp3.forEach((followUp, index) => {
            const preBookingAmount = parseFloat(followUp.preBookingAmount || 0);
            totalPaid += preBookingAmount;
            totalRevenue += preBookingAmount;
  
            if (preBookingAmount > 0) {
              hasPreBookingAmount = true;
            }
            // Calculate paid counselling and associate college based on latest remark
            if (index === student.remarks.FollowUp3.length - 1) {
              const packageAmountMatch = followUp.additionalOption.match(/\d+/);
              packageAmount = packageAmountMatch ? parseInt(packageAmountMatch[0]) * 1000 : 0;
  
              if (followUp.subject.includes("Paid Counselling")) {
                paidCounselling++;
              } else if (followUp.subject.includes("Associate College")) {
                associateCollege++;
              }
            }
          });
  
          if (hasPreBookingAmount) {
            totalAdmissions++;
          }
  
          const pendingAmount = packageAmount - totalPaid;
          if (pendingAmount > 0) {
            pendingAmounts.push({
              studentId: student._id,
              name: student.name,
              packageAmount,
              totalPaid,
              pendingAmount
            });
          }
  
        } else if (hasFollowUp2) {
          totalFollowUp2++;
  
          // Calculate hot, warm, and cold leads based on latest remark in FollowUp2
          const latestFollowUp2 =
            student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1];
          if (latestFollowUp2.subject.includes("Hot")) {
            hotLead++;
          } else if (latestFollowUp2.subject.includes("Warm")) {
            warmLead++;
          } else if (latestFollowUp2.subject.includes("Cold")) {
            coldLead++;
          }
        } else if (hasFollowUp1) {
          totalFollowUp1++;
  
          const latestFollowUp1 = student.remarks.FollowUp1[student.remarks.FollowUp1.length - 1];
          if (latestFollowUp1.subject.includes("Switch Off")) {
            switchOff++;
          } else if (latestFollowUp1.subject.includes("Not Reachable")) {
            notReachable++;
          } else if (latestFollowUp1.subject.includes("Disconnect")) {
            disconnect++;
          } else if (latestFollowUp1.subject.includes("Network Issue")) {
            networkIssue++;
          } else if (latestFollowUp1.subject.includes("First Call Done")) {
            firstCallDone++;
          } else if (latestFollowUp1.subject.includes("Not Received")) {
            notReceived++;
          } else if (latestFollowUp1.subject.includes("Incoming Not Available")) {
            incomingNotAvailable++;
          }
        }
      });
  
      const totalCounsellors = counsellors.length;
      // const conversionExpected = Math.round((hotLead / totalFollowUp2) * 100);
      const conversionExpected = totalFollowUp2 > 0 ? Math.round((hotLead / totalFollowUp2) * 100) : 0;

      // console.log("second")
  
      reportData.push({
        college,
        totalRevenue,
        totalAdmissions,
        totalCounsellors,
        conversionExpected,
        followUp1: {
          totalFollowUp1,
          switchOff,
          notReachable,
          disconnect,
          networkIssue,
          firstCallDone,
          notReceived,
          incomingNotAvailable,
        },
        followUp2: {
          totalFollowUp2,
          hotLead,
          warmLead,
          coldLead,
        },
        followUp3: {
          totalFollowUp3,
          paidCounselling,
          associateCollege,
        },
        students,
        pendingAmounts
      });

      // console.log(reportData);
    }
  
    return res.json({
      seniorAdmHeadID,
      reportData
    });
    
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

}