const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueId}${ext}`);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG, JPG and JPEG are allowed.'), false);
  }
};

// Get max upload size from env (default 10MB)
const maxUploadMB = parseInt(process.env.MAX_UPLOAD_MB || '10', 10);
const maxUploadBytes = maxUploadMB * 1024 * 1024;

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxUploadBytes
  }
});

module.exports = upload;
