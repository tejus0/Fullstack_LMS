import studentModal from '../models/studentDetail.js'
import Todo from '../models/councellorToDoModel.js';


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