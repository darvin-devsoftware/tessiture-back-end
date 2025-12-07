/**
 * Controller responsible for handling HTTP requests related to system logs.
 *
 * This controller only exposes read operations for logs in this version.
 * All business logic is encapsulated inside the LogsService, keeping the
 * controller thin and focused on request/response formatting.
 */
class LogsController {

    /**
     * @param {Object} logsService - Instance of LogsService.
     */
    constructor(logsService) {
        this.logsService = logsService;
    }

    /**
     * Retrieve all system logs.
     *
     * @route GET /logs
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Error-handling middleware
     *
     * @returns {Promise<void>}
     */
    async getAll(req, res, next) {
        try {
            const logs = await this.logsService.findAll();
            res.status(200).json(logs);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = LogsController;
