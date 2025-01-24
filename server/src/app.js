import express from 'express';
const app = express();
app.use(express.json());
import cors from 'cors'

import userRouter from  "./routes/user.routes.js";
import labRouter from './routes/lab.routes.js';
import roleUserRouter from './routes/roleUser.routes.js';
import resourceReqRouter from './routes/resourceReq.routes.js';
import scheduleRouter from './routes/schedule.routes.js';
import issuesRouter from './routes/issues.routes.js';
import resourceRouter from './routes/resources.routes.js';
import feedbackRouter from './routes/feedback.routes.js';
import statsRouter from './routes/stats.routes.js';
 

app.use(cors({
     origin: "http://localhost:5173" || process.env.CLIENT_URL,
    // origin: "https://pctelabs.vercel.app" || process.env.CLIENT_URL,
    credentials:true
}))


app.use('/api/user',userRouter);
app.use('/api/labs',labRouter);
app.use('/api/role',roleUserRouter);
app.use('/api/resource',resourceRouter);
app.use('/api/schedule',scheduleRouter);
app.use('/api/issues',issuesRouter);
app.use('/api/request',resourceReqRouter);
app.use('/api/feedback',feedbackRouter);
app.use('/api/stats',statsRouter);

 
app.get('/',(req,res)=>{
    res.send('Server is online')
})

export default app;

