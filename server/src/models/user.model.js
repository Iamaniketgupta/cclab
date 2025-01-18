import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        unique :true
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
    block : {
        type: String,
        required: [true, "Block is required"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum : ["student", "faculty", "admin","super-admin"]
    },
     avatar:{
        type: String
     },

    gid: {
        type: String,
     }

});

const User = mongoose.model('User', userSchema);


User.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

export default User
