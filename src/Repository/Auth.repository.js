const { pool } = require("../DB/connection");

class AuthRepository {

    async findByEmail(email) {
        const [rows] = await pool.query(
            "SELECT * FROM User WHERE email = ?",
            [email.toLowerCase()]
        );
        return rows.length ? rows[0] : null;
    }

    async saveRefreshToken(userId, refreshToken) {
        await pool.query(
            "UPDATE User SET refreshToken = ? WHERE id = ?",
            [refreshToken, userId]
        );
    }

    async findUserByRefreshToken(refreshToken) {
        const [rows] = await pool.query(
            "SELECT * FROM User WHERE refreshToken = ?",
            [refreshToken]
        );
        return rows.length ? rows[0] : null;
    }

    async clearRefreshToken(userId) {
        await pool.query(
            "UPDATE User SET refreshToken = NULL WHERE id = ?",
            [userId]
        );
    }
}

module.exports = AuthRepository;
