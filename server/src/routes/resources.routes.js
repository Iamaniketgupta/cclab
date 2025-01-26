import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.js";
import {
    addNewLabResource, deleteLabResource,
    getAllResources, getSingleResourceById, updateLabResource,
    updateResourceStatus
} from "../controllers/resources.controller.js";

const resourceRouter = Router();

resourceRouter.post('/add', verifyAuth, addNewLabResource);
resourceRouter.put('/update/:resourceId', verifyAuth, updateLabResource);
resourceRouter.put('/status/:resourceId', verifyAuth, updateResourceStatus);
resourceRouter.delete('/delete/:resourceId', verifyAuth, deleteLabResource);
resourceRouter.get('/all', verifyAuth, getAllResources);
resourceRouter.get('/:labId', verifyAuth, getSingleResourceById);

export default resourceRouter;