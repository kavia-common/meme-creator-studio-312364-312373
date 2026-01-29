const express = require('express');
const uploadController = require('../controllers/upload');
const uploadMiddleware = require('../middleware/upload');

const router = express.Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a custom base image
 *     description: Upload a user image to use as a meme base (PNG/JPG/JPEG only, max 10MB)
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 550e8400-e29b-41d4-a716-446655440000
 *                 url:
 *                   type: string
 *                   example: /uploads/550e8400-e29b-41d4-a716-446655440000.jpg
 *       400:
 *         description: No file uploaded or invalid file type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: No file uploaded
 */
router.post('/', uploadMiddleware.single('image'), uploadController.upload.bind(uploadController));

module.exports = router;
