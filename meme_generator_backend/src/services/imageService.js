const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

class ImageService {
  /**
   * Render a meme with text layers on top of a base image
   * @param {string} baseImagePath - Path to base image
   * @param {Array<Object>} textLayers - Text layers to render
   * @returns {Promise<Buffer>} PNG image buffer
   */
  // PUBLIC_INTERFACE
  async renderMeme(baseImagePath, textLayers = []) {
    try {
      // Load the base image
      const image = await loadImage(baseImagePath);
      
      // Create canvas with same dimensions as image
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      
      // Draw base image
      ctx.drawImage(image, 0, 0);
      
      // Render each text layer
      for (const layer of textLayers) {
        this._renderTextLayer(ctx, layer);
      }
      
      // Return PNG buffer
      return canvas.toBuffer('image/png');
    } catch (error) {
      console.error('Error rendering meme:', error);
      throw new Error(`Failed to render meme: ${error.message}`);
    }
  }
  
  /**
   * Render a single text layer on the canvas
   * @private
   */
  _renderTextLayer(ctx, layer) {
    const {
      text = '',
      x = 0,
      y = 0,
      fontFamily = 'Impact',
      fontSize = 48,
      color = '#FFFFFF',
      strokeColor = '#000000',
      strokeWidth = 3,
      align = 'center',
      rotation = 0
    } = layer;
    
    // Save context state
    ctx.save();
    
    // Apply rotation if specified
    if (rotation !== 0) {
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-x, -y);
    }
    
    // Set font
    ctx.font = `${fontSize}px "${fontFamily}", Impact, sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = 'top';
    
    // Convert text to uppercase for classic meme style
    const upperText = text.toUpperCase();
    
    // Draw stroke (outline)
    if (strokeWidth > 0) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineJoin = 'round';
      ctx.miterLimit = 2;
      ctx.strokeText(upperText, x, y);
    }
    
    // Draw fill text
    ctx.fillStyle = color;
    ctx.fillText(upperText, x, y);
    
    // Restore context state
    ctx.restore();
  }
  
  /**
   * Validate that a file is a valid image
   * @param {string} filePath - Path to file
   * @returns {Promise<boolean>} True if valid image
   */
  // PUBLIC_INTERFACE
  async validateImage(filePath) {
    try {
      await loadImage(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Get image dimensions
   * @param {string} filePath - Path to image file
   * @returns {Promise<{width: number, height: number}>}
   */
  // PUBLIC_INTERFACE
  async getImageDimensions(filePath) {
    const image = await loadImage(filePath);
    return {
      width: image.width,
      height: image.height
    };
  }
}

module.exports = new ImageService();
