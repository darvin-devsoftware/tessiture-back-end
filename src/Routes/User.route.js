/**
 * User Routes
 *
 * This module defines all HTTP endpoints for managing Users.
 * Users are a core entity in the system, responsible for authentication,
 * permissions, authorship and ownership of content.
 *
 * Architecture:
 *    Repository  →  Service  →  Controller
 *
 * Endpoints:
 *  - POST   /users       → Create a new user
 *  - GET    /users       → Retrieve all users
 *  - GET    /users/:id   → Retrieve a single user by ID
 *  - PUT    /users/:id   → Update user information
 *  - DELETE /users/:id   → Delete a user
 */

const { Router } = require("express");

const UserRepository = require("../Repository/User.repository");
const UserService = require("../Service/User.service");
const UserController = require("../Controller/User.controller");

const router = Router();

/**
 * Dependency Injection Setup
 *
 * Repository → Handles DB operations
 * Service → Handles business logic
 * Controller → Handles incoming HTTP requests
 *
 * This layered structure enforces Clean Architecture principles:
 *  - Low coupling
 *  - High maintainability
 *  - Testable components
 */
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

/**
 * Create User
 *
 * @route POST /users
 * @description Creates a new system user.
 */
router.post("/", userController.create.bind(userController));

/**
 * Get All Users
 *
 * @route GET /users
 * @description Returns a list of all users registered in the system.
 */
router.get("/", userController.getAll.bind(userController));

/**
 * Get User By ID
 *
 * @route GET /users/:id
 * @description Retrieves a specific user by its unique identifier.
 */
router.get("/:id", userController.getById.bind(userController));

/**
 * Update User
 *
 * @route PUT /users/:id
 * @description Updates a user’s information (email, password, etc.).
 */
router.put("/:id", userController.updateById.bind(userController));

/**
 * Delete User
 *
 * @route DELETE /users/:id
 * @description Deletes a user from the system.
 */
router.delete("/:id", userController.deleteById.bind(userController));

module.exports = router;
