import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.js";
import { getAllIssues, getSingleIssue, raiseIssue, updateIssueStatus,getAllMyIssues } from "../controllers/issue.controller.js";
 
const issuesRouter = Router();

//admin specific
issuesRouter.get('/all',verifyAuth,getAllIssues);
issuesRouter.get('/user/all',verifyAuth,getAllMyIssues);
issuesRouter.put('/:issueId',verifyAuth,updateIssueStatus); 

// student specific
issuesRouter.post('/add',verifyAuth,raiseIssue);

// both
issuesRouter.get('/issue/:issueId',verifyAuth,getSingleIssue);

export default issuesRouter