import studentModal from '../models/studentDetail.js'
import Todo from '../models/councellorToDoModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import counsellorModal from '../models/counsellorDetail.js';
// import nodemailer from "nodemailer";
import { sessionSecret, emailUser, emailPass } from "../config/config.js";
import councellorToDoModel from '../models/councellorToDoModel.js';

export const loginLoad = async (req, res) => {
  try {
    res.json("this is working");
  } catch (error) {
    console.log(error.message,"error");
  }
};

export async function createStudentProfile(req, res) {
    try {
        const data = await req.body;
        const user = await studentModal.findOne({ $or: [{ email: data.email }, { contactNumber: data.contactNumber }] });

        if (user) {

            const isMail = user.email == data.email

            const isOtherResponseExist = user.otherResponse.find(x => x.courseSelected == data.courseSelected && x.preffredCollege == data.preffredCollege)

            if (user.courseSelected == data.courseSelected && user.preffredCollege == data.preffredCollege || isOtherResponseExist) {

                const sameDetail = isMail ? "Email" : "Contact Number"
                return res.status(400).json(
                    {
                        sucess: false,
                        msg: `Same Detail With Same ${sameDetail} Already Exist`,

                    }
                )
            }


            const anotherResponse = {
                name: data.name,
                whatsappNumber: data.whatsappNumber,
                courseSelected: data.courseSelected,
                source: data.source,
                sourceId: data.sourceId,
                preffredCollege: data.preffredCollege,
                contactNumber: data.contactNumber,
                email: data.email
            }

            user.otherResponse.push(anotherResponse)
            await user.save()
            return res.status(200).json(
                {
                    sucess: true,
                    msg: "Detail Stored Sucessfully",
                }
            )
        }

        else {

            await studentModal.create(data);
            return res.status(201).json(
                {
                    sucess: true,
                    msg: "Detail Stored Sucessfully",
                }
            )
        }

    } catch (error) {
        return res.status(500).json(
            {
                sucess: false,
                message: error.message
            })
    }

}


// gettiing all data for dashboard

export async function getAllStudentProfile(req, res) {
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

export async function getStudentProfile(req, res) {
  console.log(req.body)
  try {
      const studentId = req.params.id;

      const student = await studentModal.find({_id: studentId});

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
    console.log(req.body,"params");
try {
    const todo = await studentModal.updateOne(
      { _id: req.body._id },
      { $push: { 'remarks': {subject:req.body.name, updatedAt : new Date()}} });
      res.status(200).json(todo);
    // const todo = await studentModal.create(req.body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
    // return res.status(404).json({ msg: "Sales data not found" });
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
  
      const emp_Id = req.body.employee_id;
      const olduser = await counsellorModal.findOne({ employee_id: emp_Id });
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
        mobile:mobileInput,
      });
  
      if (userData) {
        const passwordMatch = await bcrypt.compare(passwordInput, userData.password);
  
        // if(res.status(201)){
        //    res.json({status:"ok",data:token});
        // }
        // else{
        //    res.json({error:"error"});
        // }
        console.log(passwordMatch,"match");
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
          return res.json({ error: " ID and Passsword are incoreect !" });
        }
      } else {
        return res.json({ error: "No username exists !" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  export const assignAuto = async(req,res)=>{
    // Fetch all counsellor ids
    const counsellors = await counsellorModal.find({});
    // console.log(counsellors,"councellord")
    // counsellors= counsellors.toArray();
    const counsellorIds = counsellors.map(c => c._id);  // counsellor_id is changed to id bacause we fetch councellor by id from url.

    // if (counsellorIds.length !== counsellors.length) {
    //   throw new Error('There should be exactly 5 counsellors in the collection');
    // }

    // Fetch all student documents
    const students = await studentModal.find({assignedCouns:""});
    console.log(students,"stude");

    // Assign counsellor ids in a round-robin fashion
    let counsellorIndex = 0;
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      const newCounsellorId = counsellorIds[counsellorIndex];
      console.log(newCounsellorId,typeof(newCounsellorId))

      // if(student.assignedCouns == ""){
      await studentModal.updateOne(
        { _id: student._id },
        { $set: { 'assignedCouns': newCounsellorId } }
      );
    // }
      console.log(student._id,"student id",student.assignedCouns,"assigned councellor")
      counsellorIndex = (counsellorIndex + 1) % counsellorIds.length;
    }

    console.log('Updated students with counsellor ids successfully.');
    return res.status(200).json(students);
  }

  export const getCounsellorDataList = async (req,res)=>{
    const id = req.params.id;
    console.log(id, "in SalesList");
    try {
      const sales = await studentModal.find({ assignedCouns: id });
      if (!sales) {
        return res.status(404).json({ msg: "Sales data not found" });
      }
      res.status(200).json(sales);
      return;
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  // function sendEmail({ recipient_email, OTP }) {
  //   return new Promise((resolve, reject) => {
  //     var transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: process.env.MY_EMAIL,
  //         pass: process.env.MY_PASSWORD,
  //       },
  //     });
  
  //     const mail_configs = {
  //       from: process.env.MY_EMAIL,
  //       to: recipient_email,
  //       subject: "KODING 101 PASSWORD RECOVERY",
  //       html: `<!DOCTYPE html>
  // <html lang="en" >
  // <head>
  //   <meta charset="UTF-8">
  //   <title>CodePen - OTP Email Template</title>
    
  
  // </head>
  // <body>
  // <!-- partial:index.partial.html -->
  // <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  //   <div style="margin:50px auto;width:70%;padding:20px 0">
  //     <div style="border-bottom:1px solid #eee">
  //       <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
  //     </div>
  //     <p style="font-size:1.1em">Hi,</p>
  //     <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
  //     <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
  //     <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
  //     <hr style="border:none;border-top:1px solid #eee" />
  //     <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
  //       <p>Koding 101 Inc</p>
  //       <p>1600 Amphitheatre Parkway</p>
  //       <p>California</p>
  //     </div>
  //   </div>
  // </div>
  // <!-- partial -->
    
  // </body>
  // </html>`,
  //     };
  //     transporter.sendMail(mail_configs, function (error, info) {
  //       if (error) {
  //         console.log(error);
  //         return reject({ message: `An error has occured` });
  //       }
  //       return resolve({ message: "Email sent succesfuly" });
  //     });
  //   });
  // }

  // export const SendRecoveryMail=  (req, res) => {
  //   sendEmail(req.body)
  //     .then((response) => res.send(response.message))
  //     .catch((error) => res.status(500).send(error.message));
  // };
  