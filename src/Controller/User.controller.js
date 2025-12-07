/**
 * Controller responsible for handling HTTP requests related to User resources.
 *
 * This controller delegates all business logic to the UserService and focuses
 * exclusively on request validation, formatting, and response handling.
 */
class UserController {

    /**
     * @param {Object} userService - Instance of UserService.
     */
    constructor(userService) {
        this.userService = userService;
    }

    /**
     * Create a new user.
     *
     * @route POST /users
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Error-handling middleware.
     *
     * Expected body:
     *  - email: string
     *  - password: string
     *  - rolId: number
     */
    async create(req, res, next) {
        try {
            const newUser = await this.userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve all users.
     *
     * @route GET /users
     */
    async getAll(req, res, next) {
        try {
            const users = await this.userService.findAll();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve a user by ID.
     *
     * @route GET /users/:id
     */
    async getById(req, res, next) {
        try {
            const user = await this.userService.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json(user);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a user by ID.
     *
     * @route PUT /users/:id
     *
     * Expected body may contain:
     *  - email?: string
     *  - password?: string
     */
    async updateById(req, res, next) {
        try {
            const updatedUser = await this.userService.updateById(
                req.params.id,
                req.body
            );

            res.status(200).json(updatedUser);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a user by ID.
     *
     * @route DELETE /users/:id
     */
    async deleteById(req, res, next) {
        try {
            await this.userService.deleteById(req.params.id);
            res.sendStatus(204); // No Content
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
