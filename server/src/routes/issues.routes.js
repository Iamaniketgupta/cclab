import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.js";
import { getAllIssuesByLabId, getSingleIssue, raiseIssue, updateIssueStatus } from "../controllers/issue.controller.js";
 
const issuesRouter = Router();

//admin specific
issuesRouter.get('/get/:labId',verifyAuth,getAllIssuesByLabId);
issuesRouter.post('/update/:issueId',verifyAuth,updateIssueStatus); 

// student specific
issuesRouter.post('/raise',verifyAuth,raiseIssue);

// both
issuesRouter.get('/issue/:issueId',verifyAuth,getSingleIssue);

export default issuesRouter