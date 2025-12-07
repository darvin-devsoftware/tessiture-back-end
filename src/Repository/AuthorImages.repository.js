const { pool } = require("../DB/connection");

/**
 * Repository responsible for handling all database operations
 * related to AuthorImages (gallery images for an author).
 *
 * This repository manages:
 * - Adding new images to an author's gallery
 * - Retrieving all images for a given author
 * - Deleting specific images
 */
class AuthorImagesRepository {

    /**
     * Inserts a new image into the AuthorImages table.
     *
     * @param {number} authorId - ID of the author to whom the image belongs.
     * @param {string} url - Public URL of the uploaded image (Cloudinary).
     * 
     * @returns {Promise<Object>} Object containing the new image ID and URL.
     */
    async addImage(authorId, url) {
        const [result] = await pool.query(
            `INSERT INTO AuthorImages (authorId, img) VALUES (?, ?)`,
            [authorId, url]
        );

        return { id: result.insertId, url };
    }

    /**
     * Retrieves all images associated with a specific author.
     *
     * @param {number} authorId - The author's ID.
     * 
     * @returns {Promise<Object[]>} Array of image records (may be empty).
     */
    async findByAuthorId(authorId) {
        const [rows] = await pool.query(
            `SELECT * FROM AuthorImages WHERE authorId = ?`,
            [authorId]
        );

        return rows.length ? rows : [];
    }

    /**
     * Deletes an image record by its ID.
     *
     * @param {number} id - ID of the image to be deleted.
     * 
     * @returns {Promise<boolean>} True if deletion succeeded, false otherwise.
     */
    async deleteImage(id) {
        const [result] = await pool.query(
            `DELETE FROM AuthorImages WHERE id = ?`,
            [id]
        );

        return result.affectedRows > 0;
    }
}

module.exports = AuthorImagesRepository;
