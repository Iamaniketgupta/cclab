import { Router } from "express";
import { forgotPass, loginUser, registerUser, verifyEmailandChangePassword, verifyUserToken } from "../controllers/user.controller.js";
import { uploader } from "../middlewares/multer.js";
import { deleteAvatar, updateAvatar } from "../controllers/userProfile.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const userRouter = Router();
 
userRouter.post('/register',verifyAuth,registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/forgotpass',forgotPass);
userRouter.post('/verifyforgotpass',verifyEmailandChangePassword);
userRouter.get('/verifyauth',verifyUserToken);

// User Profile
userRouter.put('/update/avatar',verifyAuth,uploader.single('avatar'),updateAvatar);
userRouter.delete('/delete/avatar',verifyAuth,deleteAvatar);
// userRouter.put('/update/profile',verifyAuth,updateProfile);

export default userRouter