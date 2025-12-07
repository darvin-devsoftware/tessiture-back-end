/**
 * Service layer responsible for handling business logic 
 * related to Status entities.
 *
 * This layer abstracts the controller from direct 
 * interaction with the repository and provides a clean 
 * structure for validations, transformations, logging, 
 * or future business rules.
 */
class StatusService {
    /**
     * @param {Object} statusRepository - Repository instance for Status operations.
     */
    constructor(statusRepository) {
        this.statusRepository = statusRepository;
    }

    /**
     * Creates a new status.
     *
     * @param {Object} statusData - Data required to create a status.
     * @param {string} statusData.statusName - Name of the status.
     *
     * @returns {Promise<Object>} The created status record.
     */
    async createStatus(statusData) {
        return this.statusRepository.createStatus(statusData);
    }

    /**
     * Retrieves all statuses.
     *
     * @returns {Promise<Object[]|null>} Array of statuses or null if none exist.
     */
    async findAll() {
        return this.statusRepository.findAll();
    }

    /**
     * Retrieves a specific status by its ID.
     *
     * @param {number} statusId - The status's ID.
     *
     * @returns {Promise<Object|null>} The status record or null if not found.
     */
    async findById(statusId) {
        return this.statusRepository.findById(statusId);
    }

    /**
     * Updates an existing status.
     *
     * @param {number} statusId - ID of the status to update.
     * @param {Object} updateData - Fields to update.
     * @param {string} updateData.statusName - New status name.
     *
     * @returns {Promise<Object>} The updated status.
     */
    async updateById(statusId, updateData) {
        return this.statusRepository.updateById(statusId, updateData);
    }

    /**
     * Deletes a status by its ID.
     *
     * @param {number} statusId - ID of the status to delete.
     *
     * @returns {Promise<boolean>} True if deletion succeeded.
     */
    async deleteById(statusId) {
        return this.statusRepository.deleteById(statusId);
    }
}

module.exports = StatusService;
