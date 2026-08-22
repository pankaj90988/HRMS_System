

export default router;
export const getUsersPersonalDetailsByIds = async (req, res) => {
  try {
    const data = req.body;
    const isAdmin = data.isAdmin;

    if(!data.employeeIds || data.employeeIds.length==0){
      res.status(403).json({msg : "Plz send alteast one valid ids"});
      return;
    }

    if(!isAdmin || isAdmin == false){
      const employeeIds = data.employeeIds;

      const allDetails = await PersonalDetail.find({ 
        userId: { $in: employeeIds } 
      })
      .populate({
        path: "userId",
        select: "-password" // Password chhodkar User model ki BAKI SAARI DETAILS milengi
      });

      return res.status(200).json({
        success: true,
        count: details.length,
        data: details
      });
    } else {
      const employeeId = data.employeeIds[0];

    }

    
  } catch (error) {
    console.log("Error in getUsersForSidebar ", error.msg);
    res.status(500).json({ error: "Internal Server Error" });
  }
};