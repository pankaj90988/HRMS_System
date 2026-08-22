import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // NOT unique - a user has one attendance record per date, not one total
    },
    date: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const AttendenceDetail = mongoose.model("attendenceDetail", attendenceSchema);
export default AttendenceDetail;
