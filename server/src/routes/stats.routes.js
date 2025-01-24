import   {Router}  from "express";
import { dashboardStats, getDailyAvgUsage } from "../controllers/stats.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const statsRouter = Router();

statsRouter.get('/all',verifyAuth, dashboardStats);
statsRouter.get('/lab/usage',verifyAuth, getDailyAvgUsage);
statsRouter.get('/lab/usage/:labId',verifyAuth, getDailyAvgUsage);

export default statsRouter;