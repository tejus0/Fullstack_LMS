import express from "express";
import { createStudentProfile, getAllStudentProfile } from "../controller/studentForm.js";
import { createCounsellor } from "../controller/counsellorDetail.js";

const router = express.Router();

router.route("/form").post(createStudentProfile);
router.route("/dashboard").get(getAllStudentProfile);
router.route('/counsoller').post(createCounsellor)
export default router;