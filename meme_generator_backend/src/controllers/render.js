const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const imageService = require('../services/imageService');

class RenderController {
  /**
   * Render a meme with text layers
   * @route POST /api/render
   */
  // PUBLIC_INTERFACE
  async render(req, res) {
    try {
      const { templateId, baseImageId, textLayers = [] } = req.body;
      
      // Validate input
      if (!templateId && !baseImageId) {
        return res.status(400).json({
          status: 'error',
          message: 'Either templateId or baseImageId must be provided'
        });
      }
      
      // Determine base image path
      let baseImagePath;
      
      if (templateId) {
        // Use template image
        baseImagePath = path.join(__dirname, '../../public/templates', `${templateId}.jpg`);
        
        if (!fs.existsSync(baseImagePath)) {
          return res.status(404).json({
            status: 'error',
            message: `Template not found: ${templateId}`
          });
        }
      } else {
        // Use uploaded image
        const uploadsDir = path.join(__dirname, '../../uploads');
        const files = fs.readdirSync(uploadsDir);
        const uploadedFile = files.find(f => f.startsWith(baseImageId));
        
        if (!uploadedFile) {
          return res.status(404).json({
            status: 'error',
            message: `Uploaded image not found: ${baseImageId}`
          });
        }
        
        baseImagePath = path.join(uploadsDir, uploadedFile);
      }
      
      // Render the meme
      const renderedBuffer = await imageService.renderMeme(baseImagePath, textLayers);
      
      // Save rendered image
      const rendersDir = path.join(__dirname, '../../renders');
      if (!fs.existsSync(rendersDir)) {
        fs.mkdirSync(rendersDir, { recursive: true });
      }
      
      const renderId = uuidv4();
      const renderPath = path.join(rendersDir, `${renderId}.png`);
      fs.writeFileSync(renderPath, renderedBuffer);
      
      // Return image as binary response
      res.set('Content-Type', 'image/png');
      res.set('X-Render-Id', renderId);
      res.send(renderedBuffer);
      
    } catch (error) {
      console.error('Error rendering meme:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to render meme',
        details: error.message
      });
    }
  }
}

module.exports = new RenderController();
