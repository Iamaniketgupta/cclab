import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.js";
import { createNewSchedule, getSchedules, removeSchedule, updateSchedule } from "../controllers/schedule.controller.js";
import Schedule from "../models/schedule.model.js";
 

const scheduleRouter = Router();

scheduleRouter.post('/add',verifyAuth,createNewSchedule);
scheduleRouter.put('/update/:scheduleId',verifyAuth,updateSchedule);
scheduleRouter.get('/all',verifyAuth,getSchedules);
scheduleRouter.delete('/remove/:scheduleId',verifyAuth,removeSchedule);
 
 

export default scheduleRouter