/**
 * Service layer for handling business logic related to User entities.
 *
 * This service acts as an abstraction between controllers and repositories,
 * enabling centralization of validations, transformations, access policies,
 * and any domain rules required for user management.
 */
class UserService {

    /**
     * @param {Object} userRepository - Instance of the UserRepository.
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Creates a new user.
     *
     * @param {Object} userData - Data required to create a user.
     * @param {string} userData.email - User email.
     * @param {string} userData.password - Plain-text password to be hashed.
     * @param {number} userData.rolId - Role assigned to the user.
     *
     * @returns {Promise<Object>} Created user record.
     */
    async createUser(userData) {
        return this.userRepository.createUser(userData);
    }

    /**
     * Retrieves all users.
     *
     * @returns {Promise<Object[]|null>} List of users or null if none exist.
     */
    async findAll() {
        return this.userRepository.findAll();
    }

    /**
     * Retrieves a single user by ID.
     *
     * @param {number} userId - User identifier.
     *
     * @returns {Promise<Object|null>} User record or null if not found.
     */
    async findById(userId) {
        return this.userRepository.findById(userId);
    }

    /**
     * Updates an existing user.
     *
     * @param {number} userId - ID of the user being updated.
     * @param {Object} updateData - Fields to apply to the user.
     * @param {string} [updateData.email] - New email.
     * @param {string} [updateData.password] - New plain-text password (will be hashed in repository).
     *
     * @returns {Promise<Object>} Updated user record.
     */
    async updateById(userId, updateData) {
        return this.userRepository.updateById(userId, updateData);
    }

    /**
     * Deletes a user by ID.
     *
     * @param {number} userId - The user to delete.
     *
     * @returns {Promise<boolean>} True when deletion succeeds.
     */
    async deleteById(userId) {
        return this.userRepository.deleteById(userId);
    }

}

module.exports = UserService;
