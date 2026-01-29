# Meme Templates

This directory contains meme template images. Each template requires two files:

1. `{template-id}.jpg` - Full-size template image
2. `{template-id}-thumb.jpg` - Thumbnail version (optional but recommended)

## Required Templates

The following templates are referenced in the API:

- **drake** - Drake Hotline Bling
- **distracted-boyfriend** - Distracted Boyfriend
- **two-buttons** - Two Buttons
- **change-my-mind** - Change My Mind
- **one-does-not-simply** - One Does Not Simply

## Adding New Templates

1. Add the image files to this directory
2. Update `src/controllers/templates.js` with the new template metadata
3. Ensure the template ID matches the filename (without extension)

## Image Requirements

- Format: JPG or PNG
- Recommended size: 800x600 to 1200x900 pixels
- Thumbnails: 200x150 to 400x300 pixels
