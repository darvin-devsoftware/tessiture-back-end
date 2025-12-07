/**
 * Role Routes
 *
 * This module defines all HTTP routes related to Role management.
 * A Role determines user permissions and access level within the system,
 * making this module a core part of the authorization layer.
 *
 * Implemented Endpoints:
 *  - POST   /roles       → Create a new role
 *  - GET    /roles       → Retrieve all roles
 *  - GET    /roles/:id   → Retrieve a specific role by ID
 *  - PUT    /roles/:id   → Update an existing role
 *  - DELETE /roles/:id   → Delete a role by ID
 */

const { Router } = require("express");

const RoleRepository = require("../Repository/Role.repository");
const RoleService = require("../Service/Role.service");
const RoleController = require("../Controller/Role.controller");

const router = Router();

/**
 * Dependency Injection Layer
 *
 * Repository  →  Service  →  Controller
 *
 * This pattern enables:
 *  - Clear separation of concerns
 *  - High testability
 *  - Maintainable and scalable architecture
 *  - Layer isolation (DB, business logic, HTTP)
 */
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

/**
 * @route POST /roles
 * @description Creates a new role entry.
 */
router.post("/", roleController.create.bind(roleController));

/**
 * @route GET /roles
 * @description Retrieves all roles in the system.
 */
router.get("/", roleController.getAll.bind(roleController));

/**
 * @route GET /roles/:id
 * @description Retrieves a specific role by its unique ID.
 */
router.get("/:id", roleController.getById.bind(roleController));

/**
 * @route PUT /roles/:id
 * @description Updates an existing role.
 */
router.put("/:id", roleController.updateById.bind(roleController));

/**
 * @route DELETE /roles/:id
 * @description Permanently deletes a role.
 */
router.delete("/:id", roleController.deleteById.bind(roleController));

module.exports = router;
