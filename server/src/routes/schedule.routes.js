import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.js";
import { createNewSchedule, exportScheduleAsExcel, getSchedulesForLab, removeSchedule, updateSchedule } from "../controllers/schedule.controller.js";
 

const scheduleRouter = Router();

scheduleRouter.post('/add',verifyAuth,createNewSchedule);
scheduleRouter.put('/update/:scheduleId',verifyAuth,updateSchedule);
scheduleRouter.get('/get/all/:labId',verifyAuth,getSchedulesForLab);
scheduleRouter.delete('/remove/:scheduleId',verifyAuth,removeSchedule);

// converters
scheduleRouter.get('/convert-to-csv/:labId',verifyAuth,exportScheduleAsExcel);
scheduleRouter.get('/convert-to-pdf/:labId',verifyAuth,exportScheduleAsExcel);

export default scheduleRouter