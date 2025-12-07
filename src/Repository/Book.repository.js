const { pool } = require("../DB/connection");

/**
 * Repository responsible for all database operations related to Books.
 * 
 * This class handles:
 * - Creating books
 * - Retrieving books
 * - Updating book records
 * - Deleting books
 * 
 * The Repository layer ensures the application remains decoupled from raw SQL logic.
 */
class BookRepository {

    /**
     * Inserts a new book into the database.
     *
     * @param {Object} params - Book data.
     * @param {string} params.title - Title of the book.
     * @param {string} params.img - URL of the book's cover image.
     * @param {number} params.authorId - ID of the related author.
     * @param {number} params.userId - ID of the user who uploaded the book.
     * @param {string} params.file - URL of the book file (PDF, DOCX, etc.).
     * @param {string} params.slug - SEO-friendly slug generated from the title.
     * 
     * @returns {Promise<Object|null>} The created book record.
     */
    async createBook({ title, img, authorId, userId, file, slug }) {
        const [result] = await pool.query(
            `INSERT INTO Book (title, img, authorId, userId, file, slug)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, img, authorId, userId, file, slug]
        );

        return this.findById(result.insertId);
    }

    /**
     * Retrieves a book record by its ID.
     *
     * @param {number} id - The book's ID.
     * @returns {Promise<Object|null>} The book data or null if not found.
     */
    async findById(id) {
        const [rows] = await pool.query(
            "SELECT * FROM Book WHERE id = ?",
            [id]
        );
        return rows.length ? rows[0] : null;
    }

    /**
     * Retrieves all books stored in the database.
     *
     * @returns {Promise<Object[]|null>} Array of books or null if none exist.
     */
    async findAll() {
        const [rows] = await pool.query("SELECT * FROM Book");
        return rows.length ? rows : null;
    }

    /**
     * Updates an existing book record.
     *
     * @param {number} id - The book's ID.
     * @param {Object} params - Updated fields.
     * @param {string} params.title - Updated title.
     * @param {string} params.img - Updated cover image URL.
     * @param {string} params.file - Updated file URL.
     * @param {number} params.authorId - Updated author ID.
     * @param {string} params.slug - Updated slug for SEO-friendly URLs.
     * 
     * @returns {Promise<Object|null>} The updated book record.
     */
    async updateById(id, { title, img, file, authorId, slug }) {
        const [result] = await pool.query(
            `UPDATE Book 
             SET title = ?, img = ?, file = ?, authorId = ?, slug = ?
             WHERE id = ?`,
            [title, img, file, authorId, slug, id]
        );

        return this.findById(id);
    }

    /**
     * Deletes a book record from the database.
     *
     * @param {number} id - The book's ID.
     * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
     */
    async deleteById(id) {
        const [result] = await pool.query(
            "DELETE FROM Book WHERE id = ?",
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = BookRepository;
