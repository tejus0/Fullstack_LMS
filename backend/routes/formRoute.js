import express from "express";

import { createStudentProfile, getAllStudentProfile, getTodos, createTodos, deleteTodos, insertUser, getStudentProfile, verifyLogin, assignAuto, getCounsellorDataList, loginLoad, renameKey, cleatAllAssignedCouns, getArnavCounsellorDataList, createFollowUp3, insertAgent, slotBook, bookedSlot, formToSheet, insertFromSheet, getAgentLeads, showSpecificLeads, updateAdminAvailableDays, getAdminAvailableDays, getCounsellorInfo, getCounsellorsWithStudents, getVisitLeads, getCounsellorNames, assignOfflineLeadsToCouncellor, dateSorting, getTopPerformer , getCounsellorRevenueDetails, getCoursesCounselled, getCounsellorLeadDetails, getCounsellorPendingAmount, getAssignedCounsellorStudents, getOfficeReport,removeCounsellor,getUnassignedLeads, updatePassword, getCounsellorByNumber, getAdmissionHeadCounsellors,showCounsCollegeLeads, getAdmissionHeadCounsellorsWithStudents, logout, assignCollegesSeniorAdmHead, getAllSeniorAdmHeads, getAssignedColleges, getSeniorAdmHeadReport} from "../controller/studentForm.js";
import { createCounsellor } from "../controller/counsellorDetail.js";
import { upload } from "../middleware/multer.js";
import { isLoggedIn, isSuperAdmin } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(loginLoad);
router.route("/form").post(createStudentProfile);
router.route("/formToSheet").post(formToSheet);
router.route("/insertAgent/:name/:password").get(insertAgent);
router.route("/dashboard").get(isLoggedIn ,isSuperAdmin, getAllStudentProfile);
router.route("/student/:id").get(isLoggedIn , getStudentProfile);
router.route('/counsoller').post(createCounsellor)

router.route("/getTodos/:id").get(isLoggedIn , getTodos)
router.route("/createTodos").post(isLoggedIn , createTodos)
router.route("/createFollowUp3").post(isLoggedIn , upload, createFollowUp3)

router.route("/deleteTodos/:id").delete(isLoggedIn , deleteTodos)

router.route("/register").post(insertUser);
router.route("/login").post(verifyLogin);
router.route("/autoassign").post(isLoggedIn ,isSuperAdmin, assignAuto);
router.route("/renameKey").post(renameKey);

// router.route("/upload-receipt/:id").post(upload, uploadPayReceipt);

router.route("/getCounsellorDataList/:id").get(isLoggedIn , getCounsellorDataList);
router.route("/getCounsellorInfo").get(isLoggedIn , getCounsellorInfo);
router.route("/getAgentLeads/:categoryName").get(isLoggedIn , getAgentLeads);
router.route("/cleatAllAssignedCouns").get(isLoggedIn , cleatAllAssignedCouns);
router.route("/slotBook").post(isLoggedIn , slotBook);
router.route("/bookedSlot").get(bookedSlot);
router.route("/insertFromSheet").post(isLoggedIn , insertFromSheet);
router.route("/updateAdminAvailableDays").post(isLoggedIn ,isSuperAdmin, updateAdminAvailableDays);
router.route("/getAdminAvailableDays").get(isLoggedIn ,isSuperAdmin, getAdminAvailableDays);

router.route("/showSpecificLeads/:id").get(isLoggedIn , showSpecificLeads);
router.route("/getCounsellorsWithStudents").get(isLoggedIn , getCounsellorsWithStudents);
router.route("/getVisitLeads").get(isLoggedIn , getVisitLeads);
router.route("/getCounsellorNames").get(isLoggedIn , getCounsellorNames);
router.route("/assignOfflineLeadsToCouncellor").post(isLoggedIn , assignOfflineLeadsToCouncellor);
router.route("/removeCounsellor/:id").delete(isLoggedIn , removeCounsellor);
router.route("/sortondate").post(isLoggedIn , dateSorting);

router.route("/getTopPerformer").get(isLoggedIn , getTopPerformer)

// router.route("/getTopPerformer").get(getTopPerformer)




router.route("/getCounsellorRevenueDetails/:id").get(isLoggedIn,getCounsellorRevenueDetails);
router.route("/getCoursesCounselled/:counsellerId").get(isLoggedIn,getCoursesCounselled);
router.route("/getCounsellorLeadDetails/:counsellerId").get(isLoggedIn,getCounsellorLeadDetails);
router.route("/getCounsellorPendingAmount/:counsellerId").get(isLoggedIn,getCounsellorPendingAmount);
router.route("/getAssignedCounsellorStudents/:counsellerId").get(isLoggedIn,getAssignedCounsellorStudents)
router.route("/getOfficeReport").get(isLoggedIn,isSuperAdmin,getOfficeReport)
router.route("/getUnassignedLeads").get(isLoggedIn,getUnassignedLeads)
router.route("/updatePass").post(updatePassword)
router.route("/getCounsellorByNumber").post(getCounsellorByNumber)
router.route("/getAdmissionHeadCounsellors/:admissionHeadId").get(isLoggedIn,getAdmissionHeadCounsellors)
router.route("/getAdmissionHeadCounsellorsWithStudents/:admissionHeadId").get(isLoggedIn,getAdmissionHeadCounsellorsWithStudents)



router.route("/showCounsCollegeLeads/:id").get(isLoggedIn,showCounsCollegeLeads)
router.route("/assignCollegesSeniorAdmHead").post(isLoggedIn, assignCollegesSeniorAdmHead)
router.route("/getAllSeniorAdmHeads").get(isLoggedIn, getAllSeniorAdmHeads)
router.route("/getAssignedColleges").get(isLoggedIn, getAssignedColleges)
router.route("/getSeniorAdmHeadReport").get(isLoggedIn, getSeniorAdmHeadReport)
// router.route("/getCounsellorDataList/6672c48614be596e4ccb3b39").get(getArnavCounsellorDataList);


// router.route("/").get(tableFilter); mc
router.route("/logout").get(logout)


export default router;