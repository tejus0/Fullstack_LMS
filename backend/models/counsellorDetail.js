import mongoose from "mongoose";

const counsellorDetail = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }

        // Define other required fields
    }, { timestamps: true }
)

const counsellorModal = mongoose.model('Counsellor', counsellorDetail)

export default counsellorModal