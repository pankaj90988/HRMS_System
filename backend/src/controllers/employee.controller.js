import express from "express";
import User from "../models/user.model";
import PersonalDetail from "../models/personaldeatail.model";
import AttendenceDetail from "../models/attendenceDetail.model"; // ⚠️ filename mismatch tha (attendenceDetails vs attendenceDetail) — apne actual file naam ke hisaab se check kar lena

const router = express.Router(); // ⚠️ router kahin define hi nahi tha, aur `export default router` sabse upar tha (functions define hone se pehle) — ab neeche le aaya

export const getUsersPersonalDetailsByIds = async (req, res) => {
  try {
    const data = req.body;
    const employeeId = data.employeeId;
    const allEmployeeIds = data.employeeIds;

    if (!allEmployeeIds || allEmployeeIds.length == 0) {
      return res.status(403).json({ msg: "Plz send atleast one valid ids" }); // ⚠️ missing "return" — isse neeche wala code bhi chal jata (double response bhejne ka risk)
    }

    const currentUser = await User.findOne({ userId: employeeId }); // ⚠️ "Users" model kabhi import hi nahi hua tha, sirf "User" hai

    if (!currentUser || currentUser.role != "HR") {
      return res.status(404).json({ msg: "you are invalid user" });
    }

    const employeeIds = data.employeeIds;

    const allEmployeeAllDetails = await PersonalDetail.find({
      userId: { $in: employeeIds }
    }).populate({
      path: "userId",
      select: "-password"
    });

    return res.status(200).json(allEmployeeAllDetails);

  } catch (error) {
    console.log("Error in getUsersPersonalDetailsByIds ", error.message); // ⚠️ error.msg → error.message (Error object me .msg property hoti hi nahi)
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editEmployeeById = async (req, res) => {
  try {
    const data = req.body;
    const employeeId = data.employeeId;
    const requestedId = data.requestedId;

    if (!employeeId) {
      return res.status(403).json({ msg: "Plz send valid ids" });
    }

    const currentUser = await User.findOne({ userId: employeeId });

    if (!currentUser) {
      return res.status(404).json({ msg: "you are invalid user" });
    }

    const requestedUser = await PersonalDetail.findOne({
      userId: requestedId
    }).populate({
      path: "userId",
      select: "-password"
    });

    if (!requestedUser) {
      return res.status(404).json({ msg: "requested user not found" }); // ⚠️ "fount" → "found" typo
    }

    if (currentUser.role == "HR") {
      // ⚠️ "oneEmployeeAllDetails" kahin define hi nahi tha — ye undefined variable use ho raha tha jo turant crash karwata
      requestedUser.IdCardLink = data.IdCardLink ?? requestedUser.IdCardLink;
      requestedUser.resumeLink = data.resumeLink ?? requestedUser.resumeLink;
      requestedUser.salary = data.salary ?? requestedUser.salary;
      requestedUser.address = data.address ?? requestedUser.address;
      requestedUser.phone = data.phone ?? requestedUser.phone;
      requestedUser.profileLink = data.profileLink ?? requestedUser.profileLink;

      await requestedUser.save(); // ⚠️ .save() call hi missing tha, isliye DB me kabhi update hota hi nahi

      return res.status(200).json({ msg: "all details updated successfully" });
    }

    requestedUser.address = data.address ?? requestedUser.address;
    requestedUser.phone = data.phone ?? requestedUser.phone;
    requestedUser.profileLink = data.profileLink ?? requestedUser.profileLink;

    await requestedUser.save(); // ⚠️ yahan bhi .save() missing tha

    return res.status(200).json({ msg: "some details updated successfully" });

  } catch (error) {
    console.log("Error in editEmployeeById ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAttendenceByEmployeeIdByDate = async (req, res) => {
  try {
    const data = req.body;
    const employeeId = data.employeeId;
    const requestedId = data.requestedId;
    const requestedDate = data.date;

    if (!employeeId) {
      return res.status(403).json({ msg: "Plz send valid ids" });
    }
    if (!requestedId) {
      return res.status(403).json({ msg: "Plz send valid ids" });
    }
    if (!requestedDate) {
      return res.status(400).json({ msg: "invalid date entered" }); // ⚠️ 301 ek redirect status code hai, error ke liye 400 sahi hai
    }

    const currentUser = await PersonalDetail.findOne({ userId: employeeId })
      .populate({ path: "userId", select: "role" });

    if (!currentUser || currentUser.userId.role !== "HR") {
      return res.status(403).json({ msg: "Access denied. Only HR can update attendance." });
    }

    // ⚠️ "date" kahin defined nahi tha — "requestedDate" use karna tha
    // ⚠️ AttendenceDetail schema me "records" naam ka koi field hi nahi hai (schema flat hai: date, status directly)
    //    isliye "records.date" query fail hogi. Schema ke hisaab se query set ki hai neeche.
    const updatedAttendance = await AttendenceDetail.findOneAndUpdate(
      { userId: requestedId, date: requestedDate },
      { $set: { status: data.status } }, // ⚠️ update object bhi missing tha, sirf comment tha
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ msg: "Attendance record not found for this date." });
    }

    return res.status(200).json({ msg: "Attendance updated successfully", data: updatedAttendance });

  } catch (error) {
    console.log("Error in updateAttendenceByEmployeeIdByDate ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addAttendenceByEmployeeById = async (req, res) => {
  try {
    const data = req.body;
    const employeeId = data.employeeId;
    const requestedDate = data.date;

    if (!employeeId) {
      return res.status(403).json({ msg: "Plz send valid ids" });
    }
    if (!requestedDate) {
      return res.status(400).json({ msg: "invalid date entered" });
    }

    const currentUser = await PersonalDetail.findOne({ userId: employeeId })
      .populate({ path: "userId", select: "role" });

    if (!currentUser) {
      return res.status(404).json({ msg: "user not found" });
    }

    const existingAttendance = await AttendenceDetail.findOne(
      { userId: employeeId, date: requestedDate } // ⚠️ "date" → "requestedDate"
    );

    if (existingAttendance) {
      return res.status(409).json({ msg: "Attendance record already exists, cannot add new for this date." }); // ⚠️ 404 "not found" galat tha conflict case ke liye — 409 zyada sahi hai
    }

    const newAttendance = await AttendenceDetail.create({ // ⚠️ naya record actually create nahi ho raha tha, sirf comment tha
      userId: employeeId,
      date: requestedDate,
      status: data.status
    });

    return res.status(201).json({ msg: "Attendance added successfully", data: newAttendance }); // ⚠️ create ke liye 201 zyada standard hai

  } catch (error) {
    console.log("Error in addAttendenceByEmployeeById ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default router;