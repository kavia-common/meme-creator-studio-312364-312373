/**
 * @typedef {Object} MemeTemplate
 * @property {string} id - Template unique identifier
 * @property {string} name - Template name
 * @property {string} thumbnailUrl - URL to thumbnail image
 * @property {string} imageUrl - URL to full-size template image
 * @property {Array<TextBox>} defaultTextBoxes - Default text box positions
 */

/**
 * @typedef {Object} TextBox
 * @property {number} x - X position (percentage 0-100)
 * @property {number} y - Y position (percentage 0-100)
 * @property {string} text - Default text
 */

/**
 * @typedef {Object} TextLayer
 * @property {string} text - Text content
 * @property {number} x - X position in pixels
 * @property {number} y - Y position in pixels
 * @property {string} fontFamily - Font family name
 * @property {number} fontSize - Font size in pixels
 * @property {string} color - Text color (hex or rgb)
 * @property {string} strokeColor - Outline color
 * @property {number} strokeWidth - Outline width in pixels
 * @property {string} align - Text alignment (left, center, right)
 * @property {number} rotation - Rotation in degrees
 */

/**
 * @typedef {Object} RenderRequest
 * @property {string} [templateId] - Template ID to use
 * @property {string} [baseImageId] - Uploaded image ID to use
 * @property {Array<TextLayer>} textLayers - Text layers to render
 */

/**
 * @typedef {Object} UploadResponse
 * @property {string} id - Upload unique identifier
 * @property {string} url - URL to uploaded image
 */

/**
 * @typedef {Object} ShareResponse
 * @property {string} shareUrl - URL to share the meme
 * @property {string} token - Share token
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {string} status - Error status
 * @property {string} message - Error message
 * @property {string} [details] - Additional error details
 */

module.exports = {};
