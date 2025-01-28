import expressAsyncHandler from "express-async-handler";
import { deleteFromCloudinary, publicId, uploadToCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";


// UPDATE AVATAR
export const updateAvatar = expressAsyncHandler(async (req, res) => {

    const avatar = req.file;
    // console.log(avatar)
    if (!avatar) {
        return res.status(400).json({ message: "Please upload an image" });
    }
    if (avatar.size > 3000000) {
        return res.status(400).json({ message: "File size too large pls upload less than 2mb" });
    }

    // const picid = publicId(req.user.avatar);
    // if (picid) {
    //     try {
    //         await deleteFromCloudinary(picid);
    //     } catch (err) {
    //     }
    // }

    const imageUrl = await uploadToCloudinary(avatar.path);
    console.log(imageUrl)
    if (!imageUrl?.url) {
        return res.status(500).json({ message: "something went wrong while uploading file to cloudinary" });
    }

    const user = await User.findByIdAndUpdate(req.user._id, { avatar: imageUrl?.url }, { new: true });
    if (!user)
        return res.status(500).json({ message: "something went wrong while updating profile" });

    res.status(200).json({ message: 'Profile Image Updated🎉', user });


});

// DELETE AVATAR
export const deleteAvatar = expressAsyncHandler(async (req, res) => {
    const picid = publicId(req.user.avatar);

    try {
        await deleteFromCloudinary(picid);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "something went wrong while deleting file from cloudinary" });
    }
    const user = await User.findByIdAndUpdate(req.user._id, { avatar: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" }, { new: true });
    res.status(200).json({ message: 'Profile Image Deleted🎉', user });

});


// UPDATE PROFILE

export const updateUser = expressAsyncHandler(async (req, res) => {
    
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    console.log(user)
    if (!user)
        return res.status(500).json({ message: "something went wrong while updating profile" });

    res.status(200).json({ message: 'Details Updated Successfully', user });
});

