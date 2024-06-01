import express from "express";
import { createStudentProfile, getAllStudentProfile , getTodos,createTodos,deleteTodos, insertUser, verifyMail} from "../controller/studentForm.js";
import { createCounsellor} from "../controller/counsellorDetail.js";

const router = express.Router();

router.route("/form").post(createStudentProfile);
router.route("/dashboard").get(getAllStudentProfile);
router.route('/counsoller').post(createCounsellor)

router.route("/getTodos/:id").get(getTodos)
router.route("/createTodos").post(createTodos)
router.route("/deleteTodos/:id").delete(deleteTodos)

router.route("/register").post(insertUser);

router.route("/verify").post(verifyMail);

export default router;