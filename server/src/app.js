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
 

app.use(cors({
    origin: "http://localhost:5173" || process.env.CLIENT_URL,
    credentials:true
}))


app.use('/api/user',userRouter);
app.use('/api/labs',labRouter);
app.use('/api/role',roleUserRouter);
app.use('/api/resource',resourceReqRouter);
app.use('/api/schedule',scheduleRouter);
app.use('/api/issues',issuesRouter);

app.get('/',(req,res)=>{
    res.send('Server is online')
})

export default app;

