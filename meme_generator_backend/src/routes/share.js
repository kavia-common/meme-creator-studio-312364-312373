const express = require('express');
const shareController = require('../controllers/share');

const router = express.Router();

/**
 * @swagger
 * /api/share:
 *   post:
 *     summary: Create a share link for a rendered meme
 *     description: Generate a shareable URL for a previously rendered meme
 *     tags:
 *       - Share
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - renderId
 *             properties:
 *               renderId:
 *                 type: string
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *                 description: ID of the rendered meme (from X-Render-Id header)
 *     responses:
 *       200:
 *         description: Share link created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shareUrl:
 *                   type: string
 *                   example: http://localhost:3001/api/share/a1b2c3d4e5f6
 *                 token:
 *                   type: string
 *                   example: a1b2c3d4e5f6
 *       400:
 *         description: renderId is required
 *       404:
 *         description: Rendered image not found
 */
router.post('/', shareController.create.bind(shareController));

/**
 * @swagger
 * /api/share/{token}:
 *   get:
 *     summary: Get a shared meme by token
 *     description: Retrieve a previously shared meme image
 *     tags:
 *       - Share
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Share token
 *         example: a1b2c3d4e5f6
 *     responses:
 *       200:
 *         description: Shared meme image
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Share link not found or expired
 */
router.get('/:token', shareController.get.bind(shareController));

module.exports = router;
