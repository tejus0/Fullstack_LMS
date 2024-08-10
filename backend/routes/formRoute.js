import express from "express";

import { createStudentProfile, getAllStudentProfile, getTodos, createTodos, deleteTodos, insertUser, getStudentProfile, verifyLogin, assignAuto, getCounsellorDataList, loginLoad, renameKey, cleatAllAssignedCouns, getArnavCounsellorDataList, createFollowUp3, insertAgent, slotBook, bookedSlot, formToSheet, insertFromSheet, getAgentLeads, showSpecificLeads, updateAdminAvailableDays, getAdminAvailableDays, getCounsellorInfo, getCounsellorsWithStudents, getVisitLeads, getCounsellorNames, assignOfflineLeadsToCouncellor, dateSorting, getTopPerformer , getCounsellorRevenueDetails, getCoursesCounselled, getCounsellorLeadDetails, getCounsellorPendingAmount, getAssignedCounsellorStudents, getOfficeReport,removeCounsellor,getUnassignedLeads, updatePassword, getCounsellorByNumber, getAdmissionHeadCounsellors,showCounsCollegeLeads, getAdmissionHeadCounsellorsWithStudents, logout} from "../controller/studentForm.js";
import { createCounsellor } from "../controller/counsellorDetail.js";
import { upload } from "../middleware/multer.js";
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(loginLoad);
router.route("/form").post(createStudentProfile);
router.route("/formToSheet").post(formToSheet);
router.route("/insertAgent/:name/:password").get(insertAgent);
router.route("/dashboard").get(isLoggedIn , getAllStudentProfile);
router.route("/student/:id").get(isLoggedIn , getStudentProfile);
router.route('/counsoller').post(createCounsellor)

router.route("/getTodos/:id").get(isLoggedIn , getTodos)
router.route("/createTodos").post(isLoggedIn , createTodos)
router.route("/createFollowUp3").post(isLoggedIn , upload, createFollowUp3)

router.route("/deleteTodos/:id").delete(isLoggedIn , deleteTodos)

router.route("/register").post(insertUser);
router.route("/login").post(verifyLogin);
router.route("/autoassign").post(isLoggedIn , assignAuto);
router.route("/renameKey").post(renameKey);

// router.route("/upload-receipt/:id").post(upload, uploadPayReceipt);

router.route("/getCounsellorDataList/:id").get(isLoggedIn , getCounsellorDataList);
router.route("/getCounsellorInfo").get(isLoggedIn , getCounsellorInfo);
router.route("/getAgentLeads/:categoryName").get(isLoggedIn , getAgentLeads);
router.route("/cleatAllAssignedCouns").get(isLoggedIn , cleatAllAssignedCouns);
router.route("/slotBook").post(isLoggedIn , slotBook);
router.route("/bookedSlot").get(isLoggedIn , bookedSlot);
router.route("/insertFromSheet").post(isLoggedIn , insertFromSheet);
router.route("/updateAdminAvailableDays").post(isLoggedIn , updateAdminAvailableDays);
router.route("/getAdminAvailableDays").get(isLoggedIn , getAdminAvailableDays);

router.route("/showSpecificLeads/:id").get(isLoggedIn , showSpecificLeads);
router.route("/getCounsellorsWithStudents").get(isLoggedIn , getCounsellorsWithStudents);
router.route("/getVisitLeads").get(isLoggedIn , getVisitLeads);
router.route("/getCounsellorNames").get(isLoggedIn , getCounsellorNames);
router.route("/assignOfflineLeadsToCouncellor").post(isLoggedIn , assignOfflineLeadsToCouncellor);
router.route("/removeCounsellor/:id").delete(isLoggedIn , removeCounsellor);
router.route("/sortondate").post(isLoggedIn , dateSorting);

router.route("/getTopPerformer").get(isLoggedIn , getTopPerformer)

// router.route("/getTopPerformer").get(getTopPerformer)




router.route("/getCounsellorRevenueDetails/:id").get(getCounsellorRevenueDetails);
router.route("/getCoursesCounselled/:counsellerId").get(getCoursesCounselled);
router.route("/getCounsellorLeadDetails/:counsellerId").get(getCounsellorLeadDetails);
router.route("/getCounsellorPendingAmount/:counsellerId").get(getCounsellorPendingAmount);
router.route("/getAssignedCounsellorStudents/:counsellerId").get(getAssignedCounsellorStudents)
router.route("/getOfficeReport").get(getOfficeReport)
router.route("/getUnassignedLeads").get(getUnassignedLeads)
router.route("/updatePass").post(updatePassword)
router.route("/getCounsellorByNumber").post(getCounsellorByNumber)
router.route("/getAdmissionHeadCounsellors/:admissionHeadId").get(getAdmissionHeadCounsellors)
router.route("/getAdmissionHeadCounsellorsWithStudents/:admissionHeadId").get(getAdmissionHeadCounsellorsWithStudents)



router.route("/showCounsCollegeLeads/:id").get(showCounsCollegeLeads)
// router.route("/getCounsellorDataList/6672c48614be596e4ccb3b39").get(getArnavCounsellorDataList);


// router.route("/").get(tableFilter); mc
router.route("/logout").get(logout)


export default router;