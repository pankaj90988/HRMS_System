import User from "../models/user.model.js";
import PersonalDetail from "../models/personaldeatail.model.js";
import AttendenceDetail from "../models/attendenceDetails.model.js";

// HR-only: fetch personal details for a list of employee IDs
export const getUsersPersonalDetailsByIds = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    const allEmployeeIds = data.employeeIds;

    if (!allEmployeeIds || allEmployeeIds.length == 0) {
      return res.status(403).json({ msg: "Plz send atleast one valid ids" });
    }

    const currentUser = await User.findOne({ email: email });

    if (!currentUser) {
      return res.status(404).json({ msg: "you are invalid user" });
    }

    if (currentUser.role !== "HR") {
      return res.status(403).json({ msg: "Access denied. Only HR can view this data." });
    }

    const allEmployeeAllDetails = await PersonalDetail.find({
      userId: { $in: allEmployeeIds },
    }).populate({
      path: "userId",
      select: "-password",
    });

    return res.status(200).json(allEmployeeAllDetails);
  } catch (error) {
    console.log("Error in getUsersPersonalDetailsByIds ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch personal details for a single employee by their user ID
export const getOneUserPersonalDetailsByIds = async (req, res) => {
  try {
    const data = req.body;
    const employeeId = data.employeeId;

    if (!employeeId) {
      return res.status(403).json({ msg: "Plz send a valid id" });
    }

    const currentUser = await User.findOne({ _id: employeeId });

    if (!currentUser) {
      return res.status(404).json({ msg: "you are invalid user" });
    }

    const employeeDetail = await PersonalDetail.findOne({
      userId: employeeId,
    }).populate({
      path: "userId",
      select: "-password",
    });

    if (!employeeDetail) {
      return res.status(404).json({ msg: "No personal details found for this user" });
    }

    return res.status(200).json(employeeDetail);
  } catch (error) {
    console.log("Error in getOneUserPersonalDetailsByIds ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update personal details.
// HR can edit any employee's full record. A non-HR user can only edit
// their OWN address/phone/profileLink (employeeId must equal requestedId).
export const editEmployeeById = async (req, res) => {
  try {
    const data = req.body;
    const employeeId = data.employeeId; // the user making the request
    const requestedId = data.requestedId; // the user whose record is being edited

    if (!employeeId || !requestedId) {
      return res.status(403).json({ msg: "Plz send valid ids" });
    }

    const currentUser = await User.findOne({ _id: employeeId });

    if (!currentUser) {
      return res.status(404).json({ msg: "you are invalid user" });
    }

    const isHR = currentUser.role === "HR";

    // ⚠️ FIX: non-HR users could previously edit ANY employee's record by
    // just knowing their requestedId. Now a non-HR caller can only edit
    // their own record.
    if (!isHR && employeeId !== requestedId) {
      return res.status(403).json({ msg: "You can only edit your own details." });
    }

    const requestedUser = await PersonalDetail.findOne({
      userId: requestedId,
    }).populate({
      path: "userId",
      select: "-password",
    });

    if (!requestedUser) {
      return res.status(404).json({ msg: "requested user not found" });
    }

    if (isHR) {
      requestedUser.IdCardLink = data.IdCardLink ?? requestedUser.IdCardLink;
      requestedUser.resumeLink = data.resumeLink ?? requestedUser.resumeLink;
      requestedUser.salary = data.salary ?? requestedUser.salary;
      requestedUser.address = data.address ?? requestedUser.address;
      requestedUser.phone = data.phone ?? requestedUser.phone;
      requestedUser.profileLink = data.profileLink ?? requestedUser.profileLink;

      await requestedUser.save();

      return res.status(200).json({ msg: "all details updated successfully" });
    }

    requestedUser.address = data.address ?? requestedUser.address;
    requestedUser.phone = data.phone ?? requestedUser.phone;
    requestedUser.profileLink = data.profileLink ?? requestedUser.profileLink;

    await requestedUser.save();

    return res.status(200).json({ msg: "some details updated successfully" });
  } catch (error) {
    console.log("Error in editEmployeeById ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// HR-only: update an existing attendance record for a given date
export const updateAttendenceByEmployeeIdByDate = async (req, res) => {
  try {
    const data = req.body;
    const employeeId = data.employeeId; // HR making the request
    const requestedId = data.requestedId; // employee whose attendance is updated
    const requestedDate = data.date;

    if (!employeeId) {
      return res.status(403).json({ msg: "Plz send valid ids" });
    }
    if (!requestedId) {
      return res.status(403).json({ msg: "Plz send valid ids" });
    }
    if (!requestedDate) {
      return res.status(400).json({ msg: "invalid date entered" });
    }

    const currentUser = await PersonalDetail.findOne({ userId: employeeId }).populate({
      path: "userId",
      select: "role",
    });

    if (!currentUser || currentUser.userId.role !== "HR") {
      return res.status(403).json({ msg: "Access denied. Only HR can update attendance." });
    }

    const updatedAttendance = await AttendenceDetail.findOneAndUpdate(
      { userId: requestedId, date: requestedDate },
      { $set: { status: data.status } },
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ msg: "Attendance record not found for this date." });
    }

    return res
      .status(200)
      .json({ msg: "Attendance updated successfully", data: updatedAttendance });
  } catch (error) {
    console.log("Error in updateAttendenceByEmployeeIdByDate ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a new attendance record for the given employeeId (self-service, any role)
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

    const currentUser = await PersonalDetail.findOne({ userId: employeeId }).populate({
      path: "userId",
      select: "role",
    });

    if (!currentUser) {
      return res.status(404).json({ msg: "user not found" });
    }

    const existingAttendance = await AttendenceDetail.findOne({
      userId: employeeId,
      date: requestedDate,
    });

    if (existingAttendance) {
      return res
        .status(409)
        .json({ msg: "Attendance record already exists, cannot add new for this date." });
    }

    const newAttendance = await AttendenceDetail.create({
      userId: employeeId,
      date: requestedDate,
      status: data.status,
    });

    return res.status(201).json({ msg: "Attendance added successfully", data: newAttendance });
  } catch (error) {
    console.log("Error in addAttendenceByEmployeeById ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};