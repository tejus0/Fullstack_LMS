import mongoose from "mongoose";


const otherResponse = new mongoose.Schema({
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

    // isEmailVerified: {
    //     type: Boolean,
    //     default: false
    // },

    whatsappNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    },

    guardianName: {
        type: String,
        required: [true, "Please enter your father's Name "]
    },

    district: {
        type: String,
        required: [true, "Please enter your city "]
    },

    state: {
        type: String,
        required: [true, "Please enter your state "]
    },

    courseSelected: {
        type: String,
        required: [true, "Please Select Course "]
    },

    preferredCollege: {
        type: String,
        default: "",
        required: [true, "Please Select Preferred College "]
    },

    source: {
        type: String,
        default: "",
        required: [true, "Please enter your source "]
    },

    sourceId: {
        type: String,
        default: "",
        required: [true, "Please enter source Id "]
    },

    neetScore: {
        type: String,
        required: [false, 'Marks are required'],
        default: ""
    },
    neetAIR: {
        type: Number,
        required: [false, 'Rank is required'],
        default: ""
    },
    submitedAt: {
        type: Date,
        default: Date.now
    }
})



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

        // isEmailVerified: {
        //     type: Boolean,
        //     default: false
        // },

        whatsappNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
        },

        guardianName: {
            type: String,
            required: [true, "Please enter your father's Name "]
        },

        district: {
            type: String,
            required: [true, "Please enter your city "]
        },

        state: {
            type: String,
            required: [true, "Please enter your state "]
        },

        courseSelected: {
            type: String,
            required: [true, "Please Select Course "]
        },

        preferredCollege: {
            type: String,
            default: "",
            required: [true, "Please Select Preferred College "]
        },

        source: {
            type: String,
            default: "",
            required: [true, "Please enter your source "]
        },

        sourceId: {
            type: String,
            default: "",
            required: [true, "Please enter source Id "]
        },

        neetScore: {
            type: String,
            required: [false, 'Marks are required'],
            default: ""
        },
        neetAIR: {
            type: String,
            required: [false, 'Rank is required'],
            default: ""
        },
        DateToVisit:{type:String},
        location:{type:String},
        remarks: 
            {

                FollowUp1:[{
                    type: Object,
                subject: {
                    type: String,
                    required: true
                },
                updatedAt: { type: String },
                // default: {},
                }],
                FollowUp2:[{
                    type: Object,
                subject: {
                    type: String,
                    required: true
                },
                updatedAt: { type: String },
                // default: {},
                }],
                FollowUp3:[{
                    type: Object,
                subject: {
                    type: String,
                    required: true
                },additionalOption: {
                    type: String,
                    required: true
                },preBookingAmount: {
                    type: Number,
                    required: true
                },
                // pendingAmount: {
                //     type: Number,
                //     required: true
                // },

                updatedAt: { type: String },
                // default: {},
                }]
            }
        ,
        assignedCouns:

        {
            type: mongoose.Schema.Types.String,
            ref: "Counsellor",

            default: ""
        },
        otherResponse: [otherResponse]
    }, { timestamps: true }
)

const studentModal = mongoose.model('Student', studentDetailSchema)

export default studentModal


