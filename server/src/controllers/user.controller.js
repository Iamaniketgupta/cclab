import asynchandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
 // import { OAuth2Client } from 'google-auth-library';
import sendEmail from '../service/sendMail.js';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

const getToken = (user, exp = null) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        fullName: user.fullName
    }, process.env.JWT_SECRET,
        {
            expiresIn: exp ? exp : '1d'
        }
    )

}


 
// Manual Register
export const registerUser = asynchandler(async (req, res) => {
  
    if(req.user.role === 'student' ){
        res.status(401);
        throw new Error("You are not authorized");
        
    }
    const { email, password, name, role, block, batch, rollNumber } = req.body;

    if (!name || !role) {
        return res.status(400).json({ message: "All Fields are required" });
    }

    if (role === "student" && !rollNumber) {
        return res.status(400).json({ message: "Roll Number is required" });
    } else if (role === "faculty" && !email) {
        return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    let getUser;
    if (role === "faculty" && email) {
        getUser = await User.findOne({ email:email });
    } else if (role === "student" && rollNumber) {
        getUser = await User.findOne({ rollNumber : rollNumber});
    }

    if (getUser) {
        return res.status(400).json({ message: "Account already exists, Kindly login" });
    }

    const newUser = new User({ email, password, name, role, batch, block:req.user.block, rollNumber });
    await newUser.save();

    if (!newUser) {
        return res.status(500).json({ message: "Invalid User Data" });
    }

    const token = getToken(newUser);

    const userObject = newUser.toObject();
    delete userObject.password;

    res.status(201).json({
        message: "Account created 🤩",
        token: token,
        user: newUser
    });
});

// Login
export const loginUser = asynchandler(async (req, res) => {
    const { email, password, rollNumber } = req.body;
    
    if (!email && !rollNumber)
        return res.status(400).json({ message: "Email or Roll Number is required" });

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    let finduser;

    if (email && password)
        finduser = await User.findOne({ email: email });
    else if (rollNumber && password)
        finduser = await User.findOne({ rollNumber: rollNumber });

    if (!finduser)
        return res.status(400).json({ message: "Account does not exist" });

    const match = await finduser.comparePassword(password);

    if (!match)
        return res.status(401).json({ message: "Invalid credentials" });

    if(!finduser.access)
    {
        return res.status(401).json({ message: "Account is blocked Kindly contact admin" });
    }

    const token = getToken(finduser);

    const userObject = finduser.toObject();
    delete userObject.password;

    res.status(200).json({ message: "Welcome Back 🎉", token: token, user: userObject });

});


// handle remove user
export const removeUser = asynchandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete({ _id: userId});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})

// Toggle Access
export const toggleAccess = asynchandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.access = !user.access;
        await user.save();
        res.status(200).json({ message: "User access toggled successfully",access:user.access });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})


// Forgot Pass
export const forgotPass = asynchandler(async (req, res) => {
    const { email, newpassword } = req.body;

    if (!email)
        res.status(400).json({ message: "Email is required" });

    const getUser = await User.findOne({ email }).select("-password");
    if (!getUser)
        return res.status(400).json({ message: "Account does not exist" });

    const token = jwt.sign({
        _id: getUser._id,
        email: getUser.email,
        password: newpassword,
        name: getUser.name
    }, process.env.JWT_SECRET,
        {
            expiresIn: '15m'
        });

    await sendEmail(
        {
            to: getUser.email,
            subject: "Reset Password ",
            text: `${process.env.CLIENT_URL}/resetpassword/${token}`,
            html: `${process.env.CLIENT_URL}/resetpassword/${token}`,
        }
    );

    res.status(200).json({ message: "Verification Link has sent on mail" });

});

// verify mail
export const verifyEmailandChangePassword = asynchandler(async (req, res) => {
    const { token } = req.body;

    if (!token)
        res.status(400).json({ message: "token is required" });
    let decodedToken
    try {
        decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(400).json({ message: "Invalid token " });
    }
    if (!decodedToken)
        return res.status(400).json({ message: "Invalid token " });

    const getUser = await User.findOne({ email: decodedToken.email });

    if (!getUser)
        return res.status(400).json({ message: "Account does not exist" });
    getUser.password = decodedToken.password;
    await getUser.save();
    res.status(200).json({ message: "Password changed successfully" });

});


export const verifyUserToken = expressAsyncHandler(async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            res.status(401).json({ message: "Unauthorized request" });
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.log(error)
            return res.status(401).json({ message: "Your Session has been expired", expiredSession: true });
        }
        if (!decodedToken) {
            return res.status(401).json({ message: "Your Session has been expired", expiredSession: true });
        }

        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            res.status(401).json({ message: "Invalid token" });
        }

        res.status(200).json({ user: user })
    } catch (error) {
        res.status(500).json({ message: "Invalid access token" });
    }

})

