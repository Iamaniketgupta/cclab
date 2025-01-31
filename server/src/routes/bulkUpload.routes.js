import { Router } from "express";
 import { verifyAuth } from "../middlewares/auth.js";
import { bulkUploadResources, bulkUploadStudents } from "../controllers/bulkupload.controller.js";

const bulkUploadRouter = Router();

bulkUploadRouter.post('/students',verifyAuth,bulkUploadStudents);
bulkUploadRouter.post('/resources',verifyAuth,bulkUploadResources);
 

export default bulkUploadRouter