import studentModal from '../models/studentDetail.js'


export async function createStudentProfile(req, res) {
    try {
        const data = await req.body;
        const student = await studentModal.create(data);
        console.log(student);
        console.log(" Test:- ok Till here ");

        // verifiaction logic will be written here 

        return res.status(200).json(
            {
                sucess: true,
                msg: "Detail Stored Sucessfully"
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