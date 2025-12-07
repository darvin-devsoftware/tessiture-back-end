const { pool } = require("../DB/connection");

/**
 * Repository responsible for handling all database operations related to Podcasts.
 *
 * This includes:
 * - Creating new podcast entries
 * - Retrieving podcast records
 * - Updating existing podcasts
 * - Deleting podcasts
 *
 * All raw SQL logic is encapsulated here, keeping the Service layer clean and
 * focused solely on business rules and file processing (video, audio, image).
 */
class PodcastRepository {

    /**
     * Creates a new podcast entry in the database.
     *
     * @param {Object} params - Podcast data.
     * @param {string} params.title - Title of the podcast.
     * @param {string|null} params.imgUrl - URL of the podcast thumbnail (Cloudinary).
     * @param {string} params.videoUrl - URL of the uploaded video file.
     * @param {string} params.audioUrl - URL of the uploaded audio file.
     * @param {number} params.statusId - Podcast status (published, draft, etc.).
     * @param {string} params.slug - SEO-friendly identifier generated from the title.
     *
     * @returns {Promise<Object>} The newly created podcast record.
     * @throws {Error} If the insert operation fails.
     */
    async createPodcast({ title, imgUrl, videoUrl, audioUrl, statusId, slug }) {
        const [result] = await pool.query(
            `INSERT INTO Podcast (title, img, video, audio, statusId, slug)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, imgUrl, videoUrl, audioUrl, statusId, slug]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to create podcast");
        }

        return this.findById(result.insertId);
    }

    /**
     * Retrieves all podcast entries from the database.
     *
     * @returns {Promise<Object[]|null>} Array of podcast records or null if empty.
     */
    async findAll() {
        const [rows] = await pool.query("SELECT * FROM Podcast");
        return rows.length ? rows : null;
    }

    /**
     * Retrieves a single podcast by its ID.
     *
     * @param {number} id - The podcast's ID.
     * @returns {Promise<Object|null>} Matching podcast or null if not found.
     * @throws {Error} If ID is invalid.
     */
    async findById(id) {
        if (!id) throw new Error("Invalid ID");

        const [rows] = await pool.query(
            `SELECT * FROM Podcast WHERE id = ?`,
            [id]
        );

        return rows.length ? rows[0] : null;
    }

    /**
     * Deletes a podcast by its ID.
     *
     * @param {number} id - The ID of the podcast to delete.
     * @returns {Promise<boolean>} True if deletion succeeded.
     * @throws {Error} If the podcast does not exist or deletion fails.
     */
    async deleteById(id) {
        const exists = await this.findById(id);
        if (!exists) {
            throw new Error("Podcast not found");
        }

        const [result] = await pool.query(
            `DELETE FROM Podcast WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to delete podcast");
        }

        return true;
    }

    /**
     * Updates a podcast's information by ID.
     *
     * @param {number} id - The podcast's ID.
     * @param {Object} params - Updated podcast fields.
     * @param {string} params.title - Updated title.
     * @param {string|null} params.imgUrl - Updated thumbnail URL.
     * @param {string|null} params.videoUrl - Updated video URL.
     * @param {string|null} params.audioUrl - Updated audio URL.
     * @param {number} params.statusId - Updated status.
     * @param {string} params.slug - Updated slug.
     *
     * @returns {Promise<Object>} The updated podcast record.
     * @throws {Error} If the podcast does not exist or update fails.
     */
    async updateById(id, { title, imgUrl, videoUrl, audioUrl, statusId, slug }) {
        const exists = await this.findById(id);
        if (!exists) {
            throw new Error("Podcast not found");
        }

        const [result] = await pool.query(
            `UPDATE Podcast
             SET title = ?, img = ?, video = ?, audio = ?, statusId = ?, slug = ?
             WHERE id = ?`,
            [title, imgUrl, videoUrl, audioUrl, statusId, slug, id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to update podcast");
        }

        return this.findById(id);
    }
}

module.exports = PodcastRepository;
