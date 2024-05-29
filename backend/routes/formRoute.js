import express from "express";
import { createStudentProfile, getAllStudentProfile } from "../controller/studentForm.js";

const router = express.Router();

router.route("/form").post(createStudentProfile);
router.route("/dashboard").get(getAllStudentProfile);

export default router;