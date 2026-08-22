import Leave from "../models/leave.model.js";

// EMPLOYEE (or HR) applies for leave for themselves
export const applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;

    if (!leaveType || !fromDate || !toDate) {
      return res.status(400).json({ msg: "leaveType, fromDate and toDate are required" });
    }

    if (new Date(fromDate) > new Date(toDate)) {
      return res.status(400).json({ msg: "fromDate cannot be after toDate" });
    }

    const leave = await Leave.create({
      userId: req.user._id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    return res.status(201).json({ msg: "Leave request submitted", data: leave });
  } catch (error) {
    console.log("Error in applyLeave ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logged-in user's own leave history (all statuses)
export const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(leaves);
  } catch (error) {
    console.log("Error in getMyLeaves ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// HR-only: view every employee's leave requests, optionally filtered by
// ?status=Pending | Approved | Rejected
export const getAllLeaves = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const leaves = await Leave.find(filter)
      .populate({ path: "userId", select: "email role" })
      .populate({ path: "reviewedBy", select: "email" })
      .sort({ createdAt: -1 });

    return res.status(200).json(leaves);
  } catch (error) {
    console.log("Error in getAllLeaves ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// HR-only: approve or reject a pending leave request
export const reviewLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewNote } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ msg: "status must be Approved or Rejected" });
    }

    const leave = await Leave.findByIdAndUpdate(
      id,
      { status, reviewNote, reviewedBy: req.user._id },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ msg: "Leave request not found" });
    }

    return res
      .status(200)
      .json({ msg: `Leave ${status.toLowerCase()}`, data: leave });
  } catch (error) {
    console.log("Error in reviewLeave ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
