import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.js";
import { addNewLabResource, deleteLabResource, getAllResources, getSingleResourceById, updateLabResource } from "../controllers/resources.controller.js";

const resourceReqRouter = Router();

resourceReqRouter.post('/add',verifyAuth,addNewLabResource);
resourceReqRouter.put('/update/:resourceId',verifyAuth,updateLabResource);
resourceReqRouter.delete('/delete/:resourceId',verifyAuth,deleteLabResource);
resourceReqRouter.get('/all',verifyAuth,getAllResources);
resourceReqRouter.get('/:labId',verifyAuth,getSingleResourceById);

export default resourceReqRouter;