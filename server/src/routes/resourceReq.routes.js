import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.js";
import { getAllRequests, getAllRequestsByUserId, raiseNewRequest } from "../controllers/requestResource.controller.js";
 
const resourceReqRouter = Router();

resourceReqRouter.post('/new',verifyAuth, raiseNewRequest);
resourceReqRouter.get('/all',verifyAuth,getAllRequests );
resourceReqRouter.get('/user/all',verifyAuth,getAllRequestsByUserId );


export default resourceReqRouter;