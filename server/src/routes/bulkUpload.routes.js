import { Router } from "express";
 import { verifyAuth } from "../middlewares/auth.js";
import { bulkUploadStudents } from "../controllers/bulkupload.controller.js";

const bulkUploadRouter = Router();

bulkUploadRouter.post('/students',verifyAuth,bulkUploadStudents);
 

export default bulkUploadRouter