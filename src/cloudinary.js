/**
 * Cloudinary Configuration Module
 *
 * This module initializes and exports a configured Cloudinary instance.
 * Cloudinary is used for uploading and managing:
 *  - Images (thumbnails, author pictures, article banners)
 *  - Videos (podcasts)
 *  - Raw files (PDFs, documents, books)
 *
 * Configuration values are securely loaded from environment variables.
 * This keeps credentials out of the codebase and allows environment-specific
 * configurations (development, staging, production).
 */

const cloudinary = require("cloudinary").v2;

/**
 * Cloudinary Initialization
 *
 * Required ENV variables:
 *  - CLOUDINARY_CLOUD_NAME
 *  - CLOUDINARY_API_KEY
 *  - CLOUDINARY_API_SECRET
 *
 * These must be set in the .env file or deployment environment.
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
