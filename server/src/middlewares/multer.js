// import multer from 'multer';

// export const uploader = multer({
//   // limits: { fileSize: 10000000 },  // 2 MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Please upload only images.'), false);
//     }
//   },
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); 
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname); 
//     }
//   })
// });


import multer from 'multer';
import path from 'path';

export const uploader = multer({ dest: 'uploads/' });  
