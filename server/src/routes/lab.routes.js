import { Router } from "express";
import { addNewLab, deleteLab, getAllLabs, getSingleLab, updateLab } from "../controllers/labs.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const labRouter = Router();

labRouter.post('/add',verifyAuth,addNewLab);
labRouter.get('/get/all',verifyAuth,getAllLabs);
labRouter.get('/get/:labId',verifyAuth,getSingleLab);
labRouter.put('/update/:labId',verifyAuth,updateLab);
labRouter.delete('/delete/:labId', verifyAuth, deleteLab);


export default labRouter