import Resource from "../models/resource.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
 
export const bulkUploadStudents = async (req, res) => {
    try {
         const { students } = req.body;  
        console.log(students)
         const validStudents = [];
        const errors = [];

        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            const { rollNumber, name, email, batch, password } = student;

             if (!rollNumber || !name || !email || !batch || !password) {
                errors.push({
                    row: i + 1,
                    error: "Missing required fields (rollNumber, name, email, batch, password)",
                });
                continue;
            }

             const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                errors.push({
                    row: i + 1,
                    error: "Invalid email format",
                });
                continue;
            }

             const existingUser = await User.findOne({
                $or: [{ rollNumber }, { email }],
            });

            if (existingUser) {
                errors.push({
                    row: i + 1,
                    error: `Duplicate entry: ${
                        existingUser.rollNumber === rollNumber
                            ? `Roll Number ${rollNumber}`
                            : `Email ${email}`
                    } already exists`,
                });
                continue;
            }

             validStudents.push({
                name,
                rollNumber,
                email,
                batch,
                password,
                block: req.user.block,  
                role: "student",  
            });
        }

        // console.log(validStudents)
         if (validStudents.length === 0) {
            return res.status(400).json({
                message: "No valid student records to insert, might be already existing or empty data",
                errors,
            });
        }

         const hashedStudents = await Promise.all(
            validStudents.map(async (student) => {
                const salt = await bcrypt.genSalt(10);
                student.password = await bcrypt.hash(student.password, salt);
                return student;
            })
        );

         const insertedStudents = await User.insertMany(hashedStudents);

         res.status(201).json({
            message: "Bulk upload successful",
            data: insertedStudents,
            errors,  
        });
    } catch (error) {
        console.error("Bulk upload error:", error);
        res.status(500).json({
            message: "An error occurred during bulk upload",
            error: error.message,
        });
    }
};




export const bulkUploadResources = async (req, res) => {
    try {
        const { data } = req.body;

        if (!data || data.length === 0) {
            return res.status(400).json({ message: "No data provided" });
        }

         const codes = data
            .filter((item) => item.resourceType === "computer" && item.code)
            .map((item) => item.code);

         const existingResources = await Resource.find({ code: { $in: codes } });
        const existingCodes = existingResources.map((r) => r.code);

         const duplicates = codes.filter((code) => existingCodes.includes(code));
        if (duplicates.length > 0) {
            return res.status(400).json({ message: `Duplicate codes found: ${duplicates.join(", ")}` });
        }

         await Resource.insertMany(data);
        res.status(201).json({ message: "Resources uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
