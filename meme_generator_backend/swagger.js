const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meme Generator API',
      version: '1.0.0',
      description: 'RESTful API for creating, rendering, and sharing custom memes with text overlays. Upload images, choose templates, add text layers with customizable styling, and generate shareable meme URLs.',
    },
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints'
      },
      {
        name: 'Templates',
        description: 'Meme template management'
      },
      {
        name: 'Upload',
        description: 'Image upload endpoints'
      },
      {
        name: 'Render',
        description: 'Meme rendering with text layers'
      },
      {
        name: 'Share',
        description: 'Share and retrieve rendered memes'
      }
    ],
    components: {
      schemas: {
        MemeTemplate: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Template unique identifier'
            },
            name: {
              type: 'string',
              description: 'Template name'
            },
            thumbnailUrl: {
              type: 'string',
              description: 'URL to thumbnail image'
            },
            imageUrl: {
              type: 'string',
              description: 'URL to full-size template image'
            },
            defaultTextBoxes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  x: { type: 'number' },
                  y: { type: 'number' },
                  text: { type: 'string' }
                }
              }
            }
          }
        },
        TextLayer: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'Text content'
            },
            x: {
              type: 'number',
              description: 'X position in pixels'
            },
            y: {
              type: 'number',
              description: 'Y position in pixels'
            },
            fontFamily: {
              type: 'string',
              default: 'Impact'
            },
            fontSize: {
              type: 'number',
              default: 48
            },
            color: {
              type: 'string',
              default: '#FFFFFF'
            },
            strokeColor: {
              type: 'string',
              default: '#000000'
            },
            strokeWidth: {
              type: 'number',
              default: 3
            },
            align: {
              type: 'string',
              enum: ['left', 'center', 'right'],
              default: 'center'
            },
            rotation: {
              type: 'number',
              default: 0
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            message: {
              type: 'string'
            },
            details: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
