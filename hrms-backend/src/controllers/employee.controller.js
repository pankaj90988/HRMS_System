import PersonalDetail from "../models/personaldeatail.model.js";
import AttendenceDetail from "../models/attendenceDetails.model.js";

// HR-only (route already restricts with hrOnly middleware): fetch personal
// details for every employee, used to populate the Employee List page
export const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await PersonalDetail.find({}).populate({
      path: "userId",
      select: "-password",
    });
    return res.status(200).json(allEmployees);
  } catch (error) {
    console.log("Error in getAllEmployees ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// HR-only (route already restricts with hrOnly middleware): fetch personal
// details for a list of employee IDs
export const getUsersPersonalDetailsByIds = async (req, res) => {
  try {
    const { employeeIds } = req.body;

    if (!employeeIds || employeeIds.length === 0) {
      return res.status(403).json({ msg: "Plz send atleast one valid ids" });
    }

    const allEmployeeAllDetails = await PersonalDetail.find({
      userId: { $in: employeeIds },
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

// Fetch personal details for a single employee by their user ID.
// HR can view anyone, an EMPLOYEE can only view themselves.
export const getOneUserPersonalDetailsByIds = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(403).json({ msg: "Plz send a valid id" });
    }

    if (req.user.role !== "HR" && req.user._id.toString() !== employeeId) {
      return res.status(403).json({ msg: "Access denied." });
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
// their OWN address/phone/profileLink.
export const editEmployeeById = async (req, res) => {
  try {
    const data = req.body;
    const requestedId = data.requestedId; // the user whose record is being edited

    if (!requestedId) {
      return res.status(403).json({ msg: "Plz send a valid id" });
    }

    const isHR = req.user.role === "HR";

    if (!isHR && req.user._id.toString() !== requestedId) {
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

// HR-only (route already restricts with hrOnly middleware): update an
// existing attendance record for a given date
export const updateAttendenceByEmployeeIdByDate = async (req, res) => {
  try {
    const data = req.body;
    const requestedId = data.requestedId; // employee whose attendance is updated
    const requestedDate = data.date;

    if (!requestedId) {
      return res.status(403).json({ msg: "Plz send a valid id" });
    }
    if (!requestedDate) {
      return res.status(400).json({ msg: "invalid date entered" });
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

// Add a new attendance record. An EMPLOYEE can only add their own attendance.
// HR can add attendance for any employee by passing requestedId.
export const addAttendenceByEmployeeById = async (req, res) => {
  try {
    const data = req.body;
    const requestedDate = data.date;
    const targetId =
      req.user.role === "HR" && data.requestedId ? data.requestedId : req.user._id;

    if (!requestedDate) {
      return res.status(400).json({ msg: "invalid date entered" });
    }

    const existingAttendance = await AttendenceDetail.findOne({
      userId: targetId,
      date: requestedDate,
    });

    if (existingAttendance) {
      return res
        .status(409)
        .json({ msg: "Attendance record already exists, cannot add new for this date." });
    }

    const newAttendance = await AttendenceDetail.create({
      userId: targetId,
      date: requestedDate,
      status: data.status,
    });

    return res.status(201).json({ msg: "Attendance added successfully", data: newAttendance });
  } catch (error) {
    console.log("Error in addAttendenceByEmployeeById ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
