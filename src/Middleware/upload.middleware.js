/**
 * Multer Upload Middleware (Temporary Storage)
 *
 * This module configures Multer to store uploaded files temporarily on disk.
 * These files are later processed and uploaded to Cloudinary by the Service layer.
 *
 * Why temporary storage?
 *  - Multer writes files to disk so they can be passed to Cloudinary uploader.
 *  - After Cloudinary upload succeeds, the temp file SHOULD be deleted manually
 *    (optional but highly recommended for production).
 *
 * Supported Uploads:
 *  - Images
 *  - Videos
 *  - Audio files
 *  - Raw documents (PDF, Word, etc.)
 */

const multer = require("multer");
const path = require("path");

/**
 * Configure Multer disk storage.
 *
 * destination: Directory where files will be temporarily stored.
 * filename: Ensures unique filenames by adding a timestamp prefix.
 */
const storage = multer.diskStorage({
    /**
     * @param {import("express").Request} req - Incoming request object
     * @param {Express.Multer.File} file - File object from Multer
     * @param {Function} cb - Callback to finalize the path
     */
    destination: (req, file, cb) => {
        cb(null, "temp/"); // Temporary folder (must exist)
    },

    /**
     * @param {import("express").Request} req
     * @param {Express.Multer.File} file
     * @param {Function} cb - Sets the final filename used in the temp folder
     */
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

/**
 * Multer instance using disk storage.
 *
 * Notes:
 *  - Does NOT validate file types (this should be done with a custom filter if needed).
 *  - Does NOT limit file sizes yet (can be configured via multer options).
 */
const upload = multer({ storage });

module.exports = upload;
