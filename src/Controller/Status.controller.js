/**
 * Controller responsible for handling HTTP requests related to Status resources.
 *
 * This controller exposes endpoints for creating, retrieving, updating,
 * and deleting status records. All business logic is delegated to StatusService.
 */
class StatusController {

    /**
     * @param {Object} statusService - Instance of StatusService.
     */
    constructor(statusService) {
        this.statusService = statusService;
    }

    /**
     * Create a new status.
     *
     * @route POST /statuses
     * @param {Object} req - Express request
     * @param {Object} res - Express response
     * @param {Function} next - Error-handling middleware
     */
    async create(req, res, next) {
        try {
            const newStatus = await this.statusService.createStatus(req.body);
            res.status(201).json(newStatus);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve all statuses.
     *
     * @route GET /statuses
     */
    async getAll(req, res, next) {
        try {
            const statuses = await this.statusService.findAll();
            res.status(200).json(statuses);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve a status by ID.
     *
     * @route GET /statuses/:id
     */
    async getById(req, res, next) {
        try {
            const status = await this.statusService.findById(req.params.id);

            if (!status) {
                return res.status(404).json({ error: "Status not found" });
            }

            res.status(200).json(status);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Update an existing status by ID.
     *
     * @route PUT /statuses/:id
     */
    async updateById(req, res, next) {
        try {
            const updatedStatus = await this.statusService.updateById(
                req.params.id,
                req.body
            );

            res.status(200).json(updatedStatus);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a status by ID.
     *
     * @route DELETE /statuses/:id
     */
    async deleteById(req, res, next) {
        try {
            await this.statusService.deleteById(req.params.id);
            res.sendStatus(204); // No content
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StatusController;
