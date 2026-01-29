const express = require('express');
const renderController = require('../controllers/render');

const router = express.Router();

/**
 * @swagger
 * /api/render:
 *   post:
 *     summary: Render a meme with text layers
 *     description: Generate a meme by compositing text layers onto a template or uploaded image
 *     tags:
 *       - Render
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               templateId:
 *                 type: string
 *                 example: drake
 *                 description: ID of template to use (either templateId or baseImageId required)
 *               baseImageId:
 *                 type: string
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *                 description: ID of uploaded image to use (either templateId or baseImageId required)
 *               textLayers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                       example: HELLO WORLD
 *                     x:
 *                       type: number
 *                       example: 400
 *                       description: X position in pixels
 *                     y:
 *                       type: number
 *                       example: 100
 *                       description: Y position in pixels
 *                     fontFamily:
 *                       type: string
 *                       example: Impact
 *                       default: Impact
 *                     fontSize:
 *                       type: number
 *                       example: 48
 *                       default: 48
 *                     color:
 *                       type: string
 *                       example: "#FFFFFF"
 *                       default: "#FFFFFF"
 *                     strokeColor:
 *                       type: string
 *                       example: "#000000"
 *                       default: "#000000"
 *                     strokeWidth:
 *                       type: number
 *                       example: 3
 *                       default: 3
 *                     align:
 *                       type: string
 *                       enum: [left, center, right]
 *                       example: center
 *                       default: center
 *                     rotation:
 *                       type: number
 *                       example: 0
 *                       default: 0
 *                       description: Rotation in degrees
 *     responses:
 *       200:
 *         description: Rendered meme image (PNG)
 *         headers:
 *           X-Render-Id:
 *             schema:
 *               type: string
 *             description: ID of the rendered image for sharing
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Invalid request (missing templateId/baseImageId)
 *       404:
 *         description: Template or uploaded image not found
 */
router.post('/', renderController.render.bind(renderController));

module.exports = router;
