/**
 * Service layer responsible for business logic related to Roles.
 *
 * Although role management is relatively simple,
 * having a dedicated service layer ensures:
 * - Clean separation between controllers and database logic
 * - Future scalability (e.g., validation, permission rules, logs)
 * - Consistency with the architecture used throughout the application
 */
class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }

    /**
     * Creates a new role.
     *
     * @param {Object} roleData - Data required to create a role.
     * @param {string} roleData.roleName - Name of the role.
     *
     * @returns {Promise<Object>} The created role record.
     */
    async createRole(roleData) {
        return this.roleRepository.createRole(roleData);
    }

    /**
     * Retrieves all roles.
     *
     * @returns {Promise<Object[]|null>} List of roles or null if none exist.
     */
    async findAll() {
        return this.roleRepository.findAll();
    }

    /**
     * Retrieves a specific role by its ID.
     *
     * @param {number} roleId - The role's ID.
     * @returns {Promise<Object|null>} The role or null if not found.
     */
    async findById(roleId) {
        return this.roleRepository.findById(roleId);
    }

    /**
     * Updates an existing role.
     *
     * @param {number} roleId - Role ID.
     * @param {Object} updateData - Fields to update.
     * @param {string} updateData.roleName - Updated role name.
     *
     * @returns {Promise<Object>} The updated role.
     */
    async updateById(roleId, updateData) {
        return this.roleRepository.updateById(roleId, updateData);
    }

    /**
     * Deletes a role by its ID.
     *
     * @param {number} roleId - Role ID.
     * @returns {Promise<boolean>} True if deletion succeeded.
     */
    async deleteById(roleId) {
        return this.roleRepository.deleteById(roleId);
    }
}

module.exports = RoleService;
