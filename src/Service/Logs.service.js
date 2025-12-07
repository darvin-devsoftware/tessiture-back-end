/**
 * Service layer responsible for business logic related to system logs.
 *
 * This service abstracts the repository to:
 * - Ensure a clean separation between controllers and database operations
 * - Allow future expansion (e.g., audit filtering, pagination, log levels)
 * - Maintain architectural consistency across the application
 */
class LogsService {
    constructor(logsRepository) {
        this.logsRepository = logsRepository;
    }

    /**
     * Records a new action performed by a user.
     *
     * @param {string} action - Description of the action performed.
     * @param {number} userId - ID of the user who triggered the action.
     *
     * @returns {Promise<number>} ID of the newly created log entry.
     */
    async createLog(action, userId) {
        return this.logsRepository.createLog({ action, userId });
    }

    /**
     * Retrieves all logs ordered by creation date (newest first).
     *
     * @returns {Promise<Object[]>} Array of log records.
     */
    async findAll() {
        return this.logsRepository.findAll();
    }
}

module.exports = LogsService;
