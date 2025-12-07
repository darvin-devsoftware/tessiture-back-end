const { pool } = require("../DB/connection");
const bcryptjs = require("bcryptjs");

/**
 * Repository responsible for all database operations related to Users.
 *
 * This includes:
 * - User creation with hashed passwords
 * - Retrieval of users by ID or email
 * - Updates and deletions
 *
 * The security-sensitive logic (password hashing + email normalization)
 * stays here so the service layer remains clean.
 */
class UserRepository {

    /**
     * Creates a new user in the database.
     *
     * @param {Object} params - User data.
     * @param {string} params.email - User email.
     * @param {string} params.password - Raw user password (will be hashed internally).
     * @param {number} params.rolId - Role ID assigned to the user.
     *
     * @returns {Promise<Object>} The newly created user.
     * @throws {Error} If the email is already in use or insertion fails.
     */
    async createUser({ email, password, rolId }) {
        const emailToLower = email.toLowerCase();

        // Check if email already exists
        const userExists = await this.findByEmail(emailToLower);
        if (userExists) {
            throw new Error("Email already in use");
        }

        // Hash password before storing
        const hashedPassword = await bcryptjs.hash(password, 10);

        const [result] = await pool.query(
            `INSERT INTO User (email, password, rolId) VALUES (?, ?, ?)`,
            [emailToLower, hashedPassword, rolId]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to create user");
        }

        return this.findById(result.insertId);
    }

    /**
     * Retrieves all users from the database.
     *
     * @returns {Promise<Object[]|null>} Array of users or null if none exist.
     */
    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM User`);
        return rows.length ? rows : null;
    }

    /**
     * Retrieves a single user by ID.
     *
     * @param {number} id - User ID.
     *
     * @returns {Promise<Object|null>} The user data or null if not found.
     * @throws {Error} If ID is invalid.
     */
    async findById(id) {
        if (!id) throw new Error("Invalid ID");

        const [rows] = await pool.query(
            `SELECT * FROM User WHERE id = ?`,
            [id]
        );

        return rows.length ? rows[0] : null;
    }

    /**
     * Deletes a user by its ID.
     *
     * @param {number} id - User ID.
     *
     * @returns {Promise<boolean>} True if deletion succeeded.
     * @throws {Error} If user does not exist or deletion fails.
     */
    async deleteById(id) {
        const user = await this.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        const [result] = await pool.query(
            `DELETE FROM User WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to delete user");
        }

        return true;
    }

    /**
     * Updates user data (email and/or password).
     * Password should be provided raw; it will be hashed internally.
     *
     * @param {number} id - User ID.
     * @param {Object} params - Fields to update.
     * @param {string} params.email - Updated email.
     * @param {string} params.password - Updated raw password.
     *
     * @returns {Promise<Object>} The updated user record.
     * @throws {Error} If the user does not exist or update fails.
     */
    async updateById(id, { email, password }) {
        const user = await this.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        const emailToLower = email.toLowerCase();
        const hashedPassword = await bcryptjs.hash(password, 10);

        const [result] = await pool.query(
            `UPDATE User SET email = ?, password = ? WHERE id = ?`,
            [emailToLower, hashedPassword, id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Failed to update user");
        }

        return this.findById(id);
    }

    /**
     * Retrieves a user by email (case-insensitive).
     *
     * @param {string} email - User email.
     *
     * @returns {Promise<Object|null>} The user or null if not found.
     * @throws {Error} If email is invalid.
     */
    async findByEmail(email) {
        if (!email) {
            throw new Error("Invalid email");
        }

        const [rows] = await pool.query(
            `SELECT * FROM User WHERE email = ?`,
            [email.toLowerCase()]
        );

        return rows.length ? rows[0] : null;
    }
}

module.exports = UserRepository;
