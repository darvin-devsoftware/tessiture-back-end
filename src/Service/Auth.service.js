const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    generateAccessToken,
    generateRefreshToken
} = require("../Utils/token.utils");

class AuthService {

    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async register({ email, password, rolId }) {
        const existingUser = await this.authRepository.findByEmail(email);
        if (existingUser) throw new Error("Email already in use");

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            "INSERT INTO User (email, password, rolId) VALUES (?, ?, ?)",
            [email.toLowerCase(), hashedPassword, rolId || 1]
        );

        return { id: result.insertId, email };
    }

    async login(email, password) {
        const user = await this.authRepository.findByEmail(email);
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await this.authRepository.saveRefreshToken(user.id, refreshToken);

        return {
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                rolId: user.rolId
            }
        };
    }

    async refreshToken(oldToken) {
        const user = await this.authRepository.findUserByRefreshToken(oldToken);

        if (!user) throw new Error("Invalid refresh token");

        jwt.verify(oldToken, process.env.JWT_REFRESH_SECRET);

        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        await this.authRepository.saveRefreshToken(user.id, newRefreshToken);

        return { accessToken, refreshToken: newRefreshToken };
    }

    async logout(userId) {
        await this.authRepository.clearRefreshToken(userId);
        return { message: "Logged out successfully" };
    }
}

module.exports = AuthService;
