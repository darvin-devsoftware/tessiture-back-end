/**
 * Status Routes
 *
 * This module exposes all HTTP routes to manage Status entities.
 * Status objects are typically used to represent workflow states
 * (e.g., Published, Draft, Pending, Archived).
 *
 * Architecture used:
 *    Repository → Service → Controller
 *
 * Routes:
 *  - POST   /           → Create a new status
 *  - GET    /           → Retrieve all statuses
 *  - GET    /:id        → Retrieve a single status by ID
 *  - PUT    /:id        → Update a status
 *  - DELETE /:id        → Delete a status
 */

const { Router } = require("express");

const StatusRepository = require("../Repository/Status.repository");
const StatusService = require("../Service/Status.service");
const StatusController = require("../Controller/Status.controller");

const router = Router();

/**
 * Dependency Injection Setup
 *
 * Following Clean Architecture principles:
 * - Repository handles database operations
 * - Service contains business logic
 * - Controller manages HTTP request/response
 */
const statusRepository = new StatusRepository();
const statusService = new StatusService(statusRepository);
const statusController = new StatusController(statusService);

/**
 * Create Status
 *
 * @route POST /statuses
 * @description Creates a new status entry.
 */
router.post("/", statusController.create.bind(statusController));

/**
 * Retrieve All Statuses
 *
 * @route GET /statuses
 * @description Returns all statuses available in the system.
 */
router.get("/", statusController.getAll.bind(statusController));

/**
 * Retrieve Status by ID
 *
 * @route GET /statuses/:id
 * @description Fetches a single status by its ID.
 */
router.get("/:id", statusController.getById.bind(statusController));

/**
 * Update Status
 *
 * @route PUT /statuses/:id
 * @description Updates the name or properties of an existing status.
 */
router.put("/:id", statusController.updateById.bind(statusController));

/**
 * Delete Status
 *
 * @route DELETE /statuses/:id
 * @description Permanently deletes a status.
 */
router.delete("/:id", statusController.deleteById.bind(statusController));

module.exports = router;
