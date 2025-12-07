/**
 * Controller responsible for handling HTTP requests related to Roles.
 *
 * This controller delegates all business logic to the RoleService,
 * ensuring a clean separation of concerns and maintainable architecture.
 */
class RoleController {

    /**
     * @param {Object} roleService - Instance of RoleService used for role operations.
     */
    constructor(roleService) {
        this.roleService = roleService;
    }

    /**
     * Create a new role.
     *
     * @route POST /roles
     * @param {Object} req - Express request
     * @param {Object} res - Express response
     * @param {Function} next - Error middleware
     */
    async create(req, res, next) {
        try {
            const newRole = await this.roleService.createRole(req.body);
            res.status(201).json(newRole);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all roles.
     *
     * @route GET /roles
     */
    async getAll(req, res, next) {
        try {
            const roles = await this.roleService.findAll();
            res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get a single role by ID.
     *
     * @route GET /roles/:id
     */
    async getById(req, res, next) {
        try {
            const role = await this.roleService.findById(req.params.id);

            if (!role) {
                return res.status(404).json({ error: "Role not found" });
            }

            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a role by ID.
     *
     * @route PUT /roles/:id
     */
    async updateById(req, res, next) {
        try {
            const updatedRole = await this.roleService.updateById(
                req.params.id,
                req.body
            );

            res.status(200).json(updatedRole);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a role by ID.
     *
     * @route DELETE /roles/:id
     */
    async deleteById(req, res, next) {
        try {
            await this.roleService.deleteById(req.params.id);
            res.sendStatus(204); // No Content
        } catch (error) {
            next(error);
        }
    }
}

module.exports = RoleController;
