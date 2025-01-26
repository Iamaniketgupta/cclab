import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.js";
import { getAllRequests, getAllRequestsByUserId, raiseNewRequest, updateRequestStatus } from "../controllers/requestResource.controller.js";
 
const resourceReqRouter = Router();

resourceReqRouter.post('/new',verifyAuth, raiseNewRequest);
resourceReqRouter.get('/all',verifyAuth,getAllRequests );
resourceReqRouter.get('/user/all',verifyAuth,getAllRequestsByUserId );
resourceReqRouter.put("/status/:id",verifyAuth,updateRequestStatus)


export default resourceReqRouter;