import { Router } from "express";
import { forgotPass, loginUser, registerUser, removeUser, toggleAccess, verifyEmailandChangePassword, verifyUserToken } from "../controllers/user.controller.js";
import { uploader } from "../middlewares/multer.js";
import { deleteAvatar, updateAvatar, updateUser } from "../controllers/userProfile.controller.js";
import { verifyAuth } from "../middlewares/auth.js";

const userRouter = Router();
 
userRouter.post('/register',verifyAuth,registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/forgotpass',forgotPass);
userRouter.post('/verifyforgotpass',verifyEmailandChangePassword);
userRouter.get('/verifyauth',verifyUserToken);
userRouter.delete('/:userId',verifyAuth,removeUser);
userRouter.put('/toggle-access/:userId',verifyAuth,toggleAccess);

// User Profile
userRouter.put('/update/avatar',verifyAuth,uploader.single('avatar'),updateAvatar);
userRouter.put('/update/:userId',verifyAuth,updateUser);
userRouter.delete('/delete/avatar',verifyAuth,deleteAvatar);

export default userRouter