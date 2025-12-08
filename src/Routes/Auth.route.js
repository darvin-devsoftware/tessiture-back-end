const { Router } = require("express");

const AuthRepository = require("../Repository/Auth.repository");
const AuthService = require("../Service/Auth.service");
const AuthController = require("../Controller/Auth.controller");
const authMiddleware = require("../Middleware/auth.middleware");

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// Register
router.post("/register", authController.register.bind(authController));

// Login
router.post("/login", authController.login.bind(authController));

// Refresh token
router.post("/refresh", authController.refresh.bind(authController));

// Logout (protected)
router.post("/logout", authMiddleware, authController.logout.bind(authController));

module.exports = router;
