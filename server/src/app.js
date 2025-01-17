import express from 'express';
const app = express();
app.use(express.json());
import cors from 'cors'

 

app.use(cors({
    origin: process.env.CLIENT_URL,
    // credentials:true
}))


// app.use('/api/user',UserRouter);
 

export default app;

