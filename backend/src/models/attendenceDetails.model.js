import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // ⚠️ "unique: true" hata diya — isse ek user ka sirf EK HI attendance record kabhi ban sakta tha (sab dates ke liye).
      // Attendance daily/multiple dates ke liye hota hai, isliye unique nahi hona chahiye.
    },
    date: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const AttendenceDetail = mongoose.model("attendenceDetail", attendenceSchema);
export default AttendenceDetail;