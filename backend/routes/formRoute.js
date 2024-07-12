import express from "express";

import { createStudentProfile, getAllStudentProfile , getTodos,createTodos,deleteTodos, insertUser, getStudentProfile, verifyLogin,assignAuto,getCounsellorDataList,loginLoad,renameKey,cleatAllAssignedCouns,getArnavCounsellorDataList,createFollowUp3,insertAgent,slotBook,bookedSlot,formToSheet,insertFromSheet,getAgentLeads,showSpecificLeads,updateAdminAvailableDays,getAdminAvailableDays} from "../controller/studentForm.js";

import { createCounsellor} from "../controller/counsellorDetail.js";

const router = express.Router();

router.route("/").get(loginLoad);
router.route("/form").post(createStudentProfile);
router.route("/formToSheet").get(formToSheet);
router.route("/insertAgent/:name/:password").get(insertAgent);
router.route("/dashboard").get(getAllStudentProfile);
router.route("/student/:id").get(getStudentProfile);
router.route('/counsoller').post(createCounsellor)

router.route("/getTodos/:id").get(getTodos)
router.route("/createTodos").post(createTodos)
router.route("/createFollowUp3").post(createFollowUp3)

router.route("/deleteTodos/:id").delete(deleteTodos)

router.route("/register").post(insertUser);
router.route("/login").post(verifyLogin);
router.route("/autoassign").post(assignAuto);
router.route("/renameKey").post(renameKey);

router.route("/getCounsellorDataList/:id").get(getCounsellorDataList);
router.route("/getAgentLeads/:id").get(getAgentLeads);
router.route("/cleatAllAssignedCouns").get(cleatAllAssignedCouns);
router.route("/slotBook").post(slotBook);
router.route("/bookedSlot").get(bookedSlot);
router.route("/insertFromSheet").post(insertFromSheet);
router.route("/updateAdminAvailableDays").post(updateAdminAvailableDays);
router.route("/getAdminAvailableDays").get(getAdminAvailableDays);

router.route("/showSpecificLeads/:categoryName").get(showSpecificLeads);

// router.route("/getCounsellorDataList/6672c48614be596e4ccb3b39").get(getArnavCounsellorDataList);


// router.route("/").get(tableFilter); mc






export default router;