const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dzi76lgy2', 
  api_key: '861683568625511', 
  api_secret: 'Ec_HHhxYWCDFo6Ob7YFwPb-1cJk' 
});

const createUploader = (folderName = 'thumbnail') => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: folderName, 
        allowed_formats: ['jpeg', 'png', 'jpg']
      };
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
    }
  }

  return multer({ 
    storage: storage,
    fileFilter: fileFilter, 
    limits: { fileSize: 500 * 1024 } 
  });
}

module.exports = { createUploader }