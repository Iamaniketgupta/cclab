import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate : {
            validator : function(email) {
                // later we can check for the pcte.edu.in mail domains only
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
            },
            message : "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum : ["student", "faculty", "admin"]
    },
    rollNumber: {
        type: String,
        unique :true
     },
     avatar:{
        type: String
        
     },
    gid: {
        type: String,
     }

});

const User = mongoose.model('User', userSchema);

export default User