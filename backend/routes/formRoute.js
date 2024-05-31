import express from "express";
import { createStudentProfile, getAllStudentProfile , getTodos,createTodos,deleteTodos} from "../controller/studentForm.js";
import { createCounsellor} from "../controller/counsellorDetail.js";

const router = express.Router();

router.route("/form").post(createStudentProfile);
router.route("/dashboard").get(getAllStudentProfile);
router.route('/counsoller').post(createCounsellor)

router.route("/getTodos/:id").get(getTodos)
router.route("/createTodos").post(createTodos)
router.route("/deleteTodos/:id").get(deleteTodos)

export default router;