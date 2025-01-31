import {Router}  from "express";
import { getAllAdmins, getAllFaculties, getAllStudents } from "../controllers/roleUsers.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const roleUserRouter = Router();
roleUserRouter.get('/faculty/all',verifyAuth,getAllFaculties);
roleUserRouter.get('/student/all',verifyAuth,getAllStudents);
roleUserRouter.get('/admins/all',verifyAuth,getAllAdmins);

export default roleUserRouter