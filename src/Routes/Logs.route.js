/**
 * Logs Routes
 *
 * This module defines the HTTP endpoints for retrieving system logs.
 * Following Clean Architecture principles, it injects the repository
 * into the service, and the service into the controller.
 *
 * Logs are typically generated during actions such as:
 *  - Creating or deleting records
 *  - User authentication events
 *  - Administrative actions
 *
 * For now, this module only exposes the "GET all logs" endpoint.
 */

const { Router } = require("express");

const LogsRepository = require("../Repository/Logs.repository");
const LogsService = require("../Service/Logs.service");
const LogsController = require("../Controller/Logs.controller");

const router = Router();

/**
 * Dependency Injection (Repository → Service → Controller)
 *
 * This pattern ensures that:
 *  - Business logic stays isolated in the Service layer
 *  - Database logic stays in the Repository layer
 *  - Controllers are thin and clean
 *  - Testing becomes significantly easier
 */
const logsRepository = new LogsRepository();
const logsService = new LogsService(logsRepository);
const logsController = new LogsController(logsService);

/**
 * Get All Logs
 *
 * @route GET /logs
 * @description Returns all system logs ordered by creation date (DESC)
 */
router.get("/", logsController.getAll.bind(logsController));

module.exports = router;
