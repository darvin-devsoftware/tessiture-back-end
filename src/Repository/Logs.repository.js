const { pool } = require("../DB/connection");

/**
 * Repository responsible for managing system logs.
 *
 * Logs are used to record actions performed by users across the application.
 * This repository provides basic operations for creating and retrieving logs.
 */
class LogsRepository {

    /**
     * Creates a new log entry in the database.
     *
     * @param {Object} params - Log data.
     * @param {string} params.action - Description of the action performed.
     * @param {number} params.userId - ID of the user who performed the action.
     * 
     * @returns {Promise<number>} The ID of the newly created log entry.
     */
    async createLog({ action, userId }) {
        const [result] = await pool.query(
            `INSERT INTO Logs (action, userId) VALUES (?, ?)`,
            [action, userId]
        );

        return result.insertId;
    }

    /**
     * Retrieves all log entries, ordered from newest to oldest.
     *
     * @returns {Promise<Object[]>} Array of log records.
     */
    async findAll() {
        const [rows] = await pool.query(
            `SELECT * FROM Logs ORDER BY createdAt DESC`
        );

        return rows;
    }
}

module.exports = LogsRepository;
