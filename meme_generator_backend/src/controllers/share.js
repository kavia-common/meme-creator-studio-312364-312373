const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// In-memory store for share tokens
const shareStore = new Map();

class ShareController {
  /**
   * Create a share URL for a rendered meme
   * @route POST /api/share
   */
  // PUBLIC_INTERFACE
  create(req, res) {
    try {
      const { renderId } = req.body;
      
      if (!renderId) {
        return res.status(400).json({
          status: 'error',
          message: 'renderId is required'
        });
      }
      
      // Verify the rendered image exists
      const rendersDir = path.join(__dirname, '../../renders');
      const renderPath = path.join(rendersDir, `${renderId}.png`);
      
      if (!fs.existsSync(renderPath)) {
        return res.status(404).json({
          status: 'error',
          message: 'Rendered image not found'
        });
      }
      
      // Generate short token
      const token = crypto.randomBytes(6).toString('hex');
      
      // Store mapping
      shareStore.set(token, renderPath);
      
      // Build share URL
      const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3001}`;
      const shareUrl = `${baseUrl}/api/share/${token}`;
      
      res.status(200).json({
        shareUrl,
        token
      });
      
    } catch (error) {
      console.error('Error creating share link:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create share link',
        details: error.message
      });
    }
  }
  
  /**
   * Get shared meme by token
   * @route GET /api/share/:token
   */
  // PUBLIC_INTERFACE
  get(req, res) {
    try {
      const { token } = req.params;
      
      const renderPath = shareStore.get(token);
      
      if (!renderPath || !fs.existsSync(renderPath)) {
        return res.status(404).json({
          status: 'error',
          message: 'Share link not found or expired'
        });
      }
      
      // Send the image file
      res.set('Content-Type', 'image/png');
      res.sendFile(renderPath);
      
    } catch (error) {
      console.error('Error retrieving shared meme:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve shared meme',
        details: error.message
      });
    }
  }
}

module.exports = new ShareController();
