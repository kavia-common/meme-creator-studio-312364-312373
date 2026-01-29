const path = require('path');

class TemplatesController {
  /**
   * Get list of available meme templates
   * @route GET /api/templates
   */
  // PUBLIC_INTERFACE
  list(req, res) {
    try {
      // Static list of popular meme templates
      const templates = [
        {
          id: 'drake',
          name: 'Drake Hotline Bling',
          thumbnailUrl: '/templates/drake-thumb.jpg',
          imageUrl: '/templates/drake.jpg',
          defaultTextBoxes: [
            { x: 50, y: 25, text: 'TEXT TOP' },
            { x: 50, y: 75, text: 'TEXT BOTTOM' }
          ]
        },
        {
          id: 'distracted-boyfriend',
          name: 'Distracted Boyfriend',
          thumbnailUrl: '/templates/distracted-boyfriend-thumb.jpg',
          imageUrl: '/templates/distracted-boyfriend.jpg',
          defaultTextBoxes: [
            { x: 20, y: 10, text: 'GIRLFRIEND' },
            { x: 50, y: 10, text: 'BOYFRIEND' },
            { x: 80, y: 10, text: 'OTHER GIRL' }
          ]
        },
        {
          id: 'two-buttons',
          name: 'Two Buttons',
          thumbnailUrl: '/templates/two-buttons-thumb.jpg',
          imageUrl: '/templates/two-buttons.jpg',
          defaultTextBoxes: [
            { x: 30, y: 30, text: 'BUTTON 1' },
            { x: 70, y: 30, text: 'BUTTON 2' },
            { x: 50, y: 85, text: 'SWEATING GUY' }
          ]
        },
        {
          id: 'change-my-mind',
          name: 'Change My Mind',
          thumbnailUrl: '/templates/change-my-mind-thumb.jpg',
          imageUrl: '/templates/change-my-mind.jpg',
          defaultTextBoxes: [
            { x: 50, y: 50, text: 'YOUR TEXT HERE' }
          ]
        },
        {
          id: 'one-does-not-simply',
          name: 'One Does Not Simply',
          thumbnailUrl: '/templates/one-does-not-simply-thumb.jpg',
          imageUrl: '/templates/one-does-not-simply.jpg',
          defaultTextBoxes: [
            { x: 50, y: 10, text: 'ONE DOES NOT SIMPLY' },
            { x: 50, y: 90, text: 'WALK INTO MORDOR' }
          ]
        }
      ];
      
      res.status(200).json(templates);
    } catch (error) {
      console.error('Error listing templates:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to list templates',
        details: error.message
      });
    }
  }
}

module.exports = new TemplatesController();
