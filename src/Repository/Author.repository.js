const { pool } = require("../DB/connection");

/**
 * Repository responsible for managing all database operations related to Authors.
 * 
 * This layer abstracts SQL queries and interacts directly with the persistence layer,
 * ensuring the rest of the application remains decoupled from raw database logic.
 */
class AuthorRepository {

    /**
     * Inserts a new author record into the database.
     * 
     * @param {Object} params - Author data.
     * @param {string} params.name - Full name of the author.
     * @param {string} params.birthDate - Author's birth date (YYYY-MM-DD).
     * @param {string} params.nationality - Nationality of the author.
     * @param {string} params.description - Biography or descriptive text.
     * @param {string|null} params.primaryImg - URL of the author's main image (Cloudinary).
     * @param {number} params.userId - ID of the user who created the author.
     * @param {string} params.slug - SEO-friendly identifier generated from the name.
     * 
     * @returns {Promise<Object>} The newly created author.
     */
    async createAuthor({ name, birthDate, nationality, description, primaryImg, userId, slug }) {
        const [result] = await pool.query(
            `INSERT INTO Author (name, birthDate, nationality, description, primaryImg, userId, slug)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, birthDate, nationality, description, primaryImg, userId, slug]
        );

        return this.findById(result.insertId);
    }

    /**
     * Retrieves a single author by its ID.
     * 
     * @param {number} id - Author's primary key.
     * @returns {Promise<Object|null>} The matching author or null if not found.
     */
    async findById(id) {
        const [rows] = await pool.query(
            `SELECT * FROM Author WHERE id = ?`,
            [id]
        );
        return rows.length ? rows[0] : null;
    }

    /**
     * Retrieves all authors stored in the database.
     * 
     * @returns {Promise<Object[]|null>} An array of authors or null if empty.
     */
    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM Author`);
        return rows.length ? rows : null;
    }

    /**
     * Updates an existing author record by ID.
     * 
     * @param {number} id - The author's ID.
     * @param {Object} params - Fields to update.
     * @param {string} params.name - Updated name.
     * @param {string} params.birthDate - Updated birth date.
     * @param {string} params.nationality - Updated nationality.
     * @param {string} params.description - Updated biography.
     * @param {string|null} params.primaryImg - Updated main image URL.
     * @param {string} params.slug - Updated slug for SEO-friendly URLs.
     * 
     * @returns {Promise<Object>} The updated author data.
     */
    async updateById(id, { name, birthDate, nationality, description, primaryImg, slug }) {
        const [result] = await pool.query(
            `UPDATE Author 
             SET name = ?, birthDate = ?, nationality = ?, description = ?, primaryImg = ?, slug = ?
             WHERE id = ?`,
            [name, birthDate, nationality, description, primaryImg, slug, id]
        );

        return this.findById(id);
    }

    /**
     * Deletes an author from the database.
     * 
     * @param {number} id - The author's ID.
     * @returns {Promise<boolean>} True if deleted, false otherwise.
     */
    async deleteById(id) {
        const [result] = await pool.query(
            `DELETE FROM Author WHERE id = ?`,
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = AuthorRepository;
