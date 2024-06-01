import studentModal from '../models/studentDetail.js'
import Todo from '../models/councellorToDoModel.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
  try {
      const { studentId } = req.query

      const student = await studentModal.find({studentId});

      const data = student

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
      const todos = await Todo.find({ employee_id: id });
      if (!todos) {
        return res.status(404).json({ msg: "User data not found" });
      }
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  export const createTodos = async (req, res) => {
    const todo = await Todo.create(req.body);
    res.json(todo);
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

  export const insertUser = async (req, res) => {
    console.log("Reached");
    try {
  
      const emp_Id = req.body.employee_id;
      const olduser = await Registeration.findOne({ employee_id: emp_Id });
      if (olduser) {
        return res.send({ error: "User Exists !" });
      }

      const spassword = await securePassword(req.body.password);
      console.log(spassword);
  
      const user = new Registeration({
        employee_id: req.body.employee_id,
        username: req.body.username,
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
        sendVerifyMail(req.body.username, req.body.email, userData._id);
        alert("Your registration is successfull, Kindly verify your mail !");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  export const assignStudentsToCounselors = async () => {
    const data = await req.body;
    // const student = await studentModal;
    try {
      const counsellors = await Counselor.find({});
      console.log(counsellors);
      const students = await Student.find({ assignedCouns: null });
      console.log(students);
  
      const studentsPerCounselor = Math.ceil(students.length / counsellors.length);
  
      for (let i = 0; i < counsellors.length; i++) {
        const start = i * studentsPerCounselor;
        const end = (i === counsellors.length - 1) ? students.length : (i + 1) * studentsPerCounselor;
  
        for (let j = start; j < end; j++) {
          const student = students[j];
          const counselor = counsellors[i];
  
          if (!student.counselor || student.counselor._id.toString() !== counselor._id.toString()) {
            student.counselor = counselor;
            await student.save();
          }
        }
      }
  
      console.log('Students have been assigned to counselors evenly.');
  
    } catch (err) {
      console.error(err);
    }
  }
  
  // assignStudentsToCounselors();