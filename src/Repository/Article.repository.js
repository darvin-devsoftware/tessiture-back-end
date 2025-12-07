const { pool } = require("../DB/connection");

/**
 * Repository responsible for handling all database operations related to Articles.
 * 
 * This layer abstracts raw SQL logic from the rest of the application,
 * ensuring a clean separation between business logic (Service layer)
 * and data persistence (Repository layer).
 */
class ArticleRepository {

    /**
     * Inserts a new article into the database.
     * 
     * @param {Object} params - Article data.
     * @param {string} params.title - The title of the article.
     * @param {string} params.description - The body or summary of the article.
     * @param {number} params.categoryId - ID of the category associated with the article.
     * @param {number} params.userId - ID of the user who created the article.
     * @param {string|null} params.primaryImg - URL of the main article image (uploaded via Cloudinary).
     * @param {number} params.statusId - Status identifier (e.g., published, draft).
     * @param {string} params.slug - SEO-friendly slug generated from the title.
     * 
     * @returns {Promise<Object>} The created article record.
     * @throws {Error} If the insertion fails.
     */
    async createArticle({ title, description, categoryId, userId, primaryImg, statusId, slug }) {

        const [result] = await pool.query(
            `INSERT INTO Article (title, description, categoryId, userId, primaryImg, statusId, slug)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, description, categoryId, userId, primaryImg, statusId, slug]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to create article");
        }

        return this.findById(result.insertId);
    }

    /**
     * Retrieves all articles from the database.
     * 
     * @returns {Promise<Object[]|null>} Array of articles or null if none exist.
     */
    async findAll() {
        const [rows] = await pool.query("SELECT * FROM Article");
        return rows.length ? rows : null;
    }

    /**
     * Retrieves a specific article by its ID.
     * 
     * @param {number} id - The article ID.
     * @returns {Promise<Object|null>} The matching article or null if not found.
     */
    async findById(id) {
        const [rows] = await pool.query(
            "SELECT * FROM Article WHERE id = ?",
            [id]
        );
        return rows.length ? rows[0] : null;
    }

    /**
     * Deletes an article by its ID.
     * 
     * @param {number} id - The article ID.
     * @returns {Promise<boolean>} True if deletion succeeded, false otherwise.
     */
    async deleteById(id) {
        const [result] = await pool.query(
            "DELETE FROM Article WHERE id = ?",
            [id]
        );
        return result.affectedRows > 0;
    }

    /**
     * Updates an article's data.
     * 
     * @param {number} id - The article ID.
     * @param {Object} params - Fields to update.
     * @param {string} params.title - Updated title.
     * @param {string} params.description - Updated description.
     * @param {number} params.categoryId - Updated category.
     * @param {string|null} params.primaryImg - Updated main image URL.
     * @param {number} params.statusId - Updated status.
     * @param {string} params.slug - Updated slug.
     * 
     * @returns {Promise<Object>} The updated article record.
     * @throws {Error} If no rows were updated.
     */
    async updateById(id, { title, description, categoryId, primaryImg, statusId, slug }) {

        const [result] = await pool.query(
            `UPDATE Article 
             SET title = ?, description = ?, categoryId = ?, primaryImg = ?, statusId = ?, slug = ?
             WHERE id = ?`,
            [title, description, categoryId, primaryImg, statusId, slug, id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to update article");
        }

        return this.findById(id);
    }
}

module.exports = ArticleRepository;
