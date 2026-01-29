const express = require('express');
const templatesController = require('../controllers/templates');

const router = express.Router();

/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: Get list of available meme templates
 *     description: Returns a JSON array of meme templates with their metadata and default text box positions
 *     tags:
 *       - Templates
 *     responses:
 *       200:
 *         description: List of meme templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: drake
 *                   name:
 *                     type: string
 *                     example: Drake Hotline Bling
 *                   thumbnailUrl:
 *                     type: string
 *                     example: /templates/drake-thumb.jpg
 *                   imageUrl:
 *                     type: string
 *                     example: /templates/drake.jpg
 *                   defaultTextBoxes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         x:
 *                           type: number
 *                           example: 50
 *                         y:
 *                           type: number
 *                           example: 25
 *                         text:
 *                           type: string
 *                           example: TEXT TOP
 */
router.get('/', templatesController.list.bind(templatesController));

module.exports = router;
