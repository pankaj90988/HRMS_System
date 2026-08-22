import mongoose from "mongoose";

const personalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User model ka naam yahan reference me aayega
      required: true, // ya false agar mandatory nahi hai
      unique: true,   // agar har User ka sirf EK hi PersonalDetail hoga (1-to-1 relationship)
    },
    profileLink: {
      type: String,
      required: false,
    },
    IdCardLink: {
      type: String,
      required: false,
    },
     resumeLink: {
      type: String,
      required: false,
    },
    salary :{
        type:Number,
        required : false,
    },
    address:{
        type: String,
        required: false,

    },
    phone :{
        type:String,
        required: false,

    }
  },
  { timestamps: true }
);

const PersonalDetail = mongoose.model("PersonalDetail", personalSchema);
export default PersonalDetail;