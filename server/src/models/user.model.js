import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        unique: [true, "Roll Number already exists"],
        sparse: true
    },
    batch: {
        type: String
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        sparse: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (email) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true
    },
    block: {
        type: String
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["student", "faculty", "admin", "super-admin"]
    },
    avatar: {
        type: String
    },

    access: {
        type: Boolean,
        default: true
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);

}
const User = mongoose.model('User', userSchema);

export default User;
