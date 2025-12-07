const { pool } = require("../DB/connection");

/**
 * Repository responsible for managing all database operations related to Status entries.
 *
 * Status records are typically used to categorize or control the state
 * of other entities (e.g., published, draft, archived).
 * 
 * This repository provides CRUD operations while keeping SQL logic
 * isolated from business logic.
 */
class StatusRepository {

    /**
     * Creates a new status in the database.
     *
     * @param {Object} params - Status data.
     * @param {string} params.statusName - The name of the status.
     *
     * @returns {Promise<Object>} The newly created status.
     * @throws {Error} If insertion fails.
     */
    async createStatus({ statusName }) {
        const [result] = await pool.query(
            `INSERT INTO Status (name) VALUES (?)`,
            [statusName]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to create status");
        }

        return this.findById(result.insertId);
    }

    /**
     * Retrieves all statuses from the database.
     *
     * @returns {Promise<Object[]|null>} Array of statuses or null if none exist.
     */
    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM Status`);
        return rows.length ? rows : null;
    }

    /**
     * Retrieves a status by its ID.
     *
     * @param {number} id - The status ID.
     *
     * @returns {Promise<Object|null>} The matching status or null if not found.
     * @throws {Error} If the ID is invalid.
     */
    async findById(id) {
        if (!id) {
            throw new Error("Invalid ID");
        }

        const [rows] = await pool.query(
            `SELECT * FROM Status WHERE id = ?`,
            [id]
        );

        return rows.length ? rows[0] : null;
    }

    /**
     * Deletes a status by its ID.
     *
     * @param {number} id - The status ID.
     *
     * @returns {Promise<boolean>} True if deletion succeeded.
     * @throws {Error} If status does not exist or deletion fails.
     */
    async deleteById(id) {
        const status = await this.findById(id);

        if (!status) {
            throw new Error("Status not found");
        }

        const [result] = await pool.query(
            `DELETE FROM Status WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to delete status");
        }

        return true;
    }

    /**
     * Updates an existing status entry.
     *
     * @param {number} id - The status ID.
     * @param {Object} params - Updated status data.
     * @param {string} params.statusName - Updated name for the status.
     *
     * @returns {Promise<Object>} The updated status.
     * @throws {Error} If the status does not exist or update fails.
     */
    async updateById(id, { statusName }) {
        const status = await this.findById(id);

        if (!status) {
            throw new Error("Status not found");
        }

        const [result] = await pool.query(
            `UPDATE Status SET name = ? WHERE id = ?`,
            [statusName, id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to update status");
        }

        return this.findById(id);
    }
}

module.exports = StatusRepository;
