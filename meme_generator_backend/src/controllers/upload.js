const path = require('path');

class UploadController {
  /**
   * Handle image upload
   * @route POST /api/upload
   */
  // PUBLIC_INTERFACE
  upload(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: 'error',
          message: 'No file uploaded'
        });
      }
      
      const file = req.file;
      const fileId = path.parse(file.filename).name;
      
      // Return upload response
      res.status(200).json({
        id: fileId,
        url: `/uploads/${file.filename}`
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to upload file',
        details: error.message
      });
    }
  }
}

module.exports = new UploadController();
