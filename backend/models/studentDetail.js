import mongoose from "mongoose";


const studentDetailSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name "]
        },

        contactNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
        },

        isMobileVerified: {
            type: Boolean,
            default: false
        },

        email: {
            type: String,
            required: [true, "Please enter your email "]
        },

        isEmailVerified: {
            type: Boolean,
            default: false
        },

        whatsappNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
        },

        fatherName: {
            type: String,
            required: [true, "Please enter your father's Name "]
        },

        city: {
            type: String,
            required: [true, "Please enter your city "]
        },

        state: {
            type: String,
            required: [true, "Please enter your state "]
        },

        courseSelected: {
            type: String,
            required: [true, "Please Selct Course "]
        },

        neetScore: {
            type: String,
            required: [true, 'Marks are required'],
        }
    }, { timestamps: true }
)

const studentModal = mongoose.model('Student', studentDetailSchema)

export default studentModal