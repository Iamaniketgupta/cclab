import { Router } from "express";
import { addNewLab, getAllLabs, getSingleLab } from "../controllers/labs.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const labRouter = Router();

labRouter.get('/get/all',verifyAuth,getAllLabs);
labRouter.get('/get/:labId',verifyAuth,getSingleLab);
labRouter.post('/add',verifyAuth,addNewLab);
labRouter.put('/update/:labId',verifyAuth,addNewLab);
labRouter.delete('/delete/:labId',verifyAuth,addNewLab);


export default labRouter