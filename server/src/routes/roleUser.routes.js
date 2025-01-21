import {Router}  from "express";
import { getAllFaculties, getAllStudents } from "../controllers/roleUsers.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const roleUserRouter = Router();
roleUserRouter.get('/faculty/all',verifyAuth,getAllFaculties);
roleUserRouter.get('/student/all',verifyAuth,getAllStudents);

export default roleUserRouter