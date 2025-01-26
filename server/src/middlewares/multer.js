import multer from 'multer';

export const uploader = multer({
  storage: multer.memoryStorage(), // Store file in memory as a Buffer
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
});
