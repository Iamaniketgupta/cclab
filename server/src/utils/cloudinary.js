import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import 'dotenv/config'


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
// console.log("CLOUDINARY_API_KEY" ,process.env.CLOUDINARY_API_KEY)

const uploadToCloudinary = async (localFilepath)=>{
    try {
        if(!localFilepath) return null;
        console.log(localFilepath)
        const response = await cloudinary.uploader.upload(localFilepath,{resource_type:"image"})
        console.log(response)
        fs.unlinkSync(localFilepath);
        return response;
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilepath)
        return null;
    }
}


const deleteFromCloudinary = async(publicId) => {
    try {
        const res = await cloudinary.uploader.destroy(String(publicId));
        return res;
            
    } catch (error) {
        console.log(error)
    }
}


const publicId = async (url) => {
    try {
        const arr = url.split("/");
        const item = arr[arr.length -1];
        const arr2 = item.split(".");
        const res = arr2[0];
        return res;
    } catch (error) {
        console.log(error)
    }
}



export {uploadToCloudinary , deleteFromCloudinary , publicId }