const { pool } = require("../DB/connection");

/**
 * Repository responsible for managing all database operations related to Roles.
 *
 * This includes:
 * - Creating new roles
 * - Retrieving role records
 * - Updating role information
 * - Deleting roles
 *
 * Repeated logic is centralized (e.g., findById) to improve maintainability
 * and reduce the number of redundant SQL queries.
 */
class RoleRepository {

    /**
     * Creates a new role in the database.
     *
     * @param {Object} params - Role data.
     * @param {string} params.roleName - The name of the role.
     *
     * @returns {Promise<Object>} The created role record.
     * @throws {Error} If the insertion fails.
     */
    async createRole({ roleName }) {
        const [result] = await pool.query(
            `INSERT INTO Rol (name) VALUES (?)`,
            [roleName]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to create role");
        }

        return this.findById(result.insertId);
    }

    /**
     * Retrieves all roles from the database.
     *
     * @returns {Promise<Object[]|null>} Array of roles or null if none exist.
     */
    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM Rol`);
        return rows.length ? rows : null;
    }

    /**
     * Retrieves a single role by its ID.
     *
     * @param {number} id - The role's ID.
     * @returns {Promise<Object|null>} The matching role or null if not found.
     * @throws {Error} If ID is invalid.
     */
    async findById(id) {
        if (!id) {
            throw new Error("Invalid ID");
        }

        const [rows] = await pool.query(
            `SELECT * FROM Rol WHERE id = ?`,
            [id]
        );

        return rows.length ? rows[0] : null;
    }

    /**
     * Deletes a role by its ID.
     *
     * @param {number} id - The role's ID.
     * @returns {Promise<boolean>} True if deletion succeeded.
     * @throws {Error} If the role does not exist or deletion fails.
     */
    async deleteById(id) {
        const role = await this.findById(id);
        if (!role) {
            throw new Error("Role not found");
        }

        const [result] = await pool.query(
            `DELETE FROM Rol WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to delete role");
        }

        return true;
    }

    /**
     * Updates a role's name.
     *
     * @param {number} id - The role's ID.
     * @param {Object} params - Updated role data.
     * @param {string} params.roleName - New role name.
     *
     * @returns {Promise<Object>} The updated role record.
     * @throws {Error} If the role does not exist or update fails.
     */
    async updateById(id, { roleName }) {
        const role = await this.findById(id);
        if (!role) {
            throw new Error("Role not found");
        }

        const [result] = await pool.query(
            `UPDATE Rol SET name = ? WHERE id = ?`,
            [roleName, id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to update role or no changes made");
        }

        return this.findById(id);
    }
}

module.exports = RoleRepository;
