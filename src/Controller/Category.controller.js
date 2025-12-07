/**
 * Controller responsible for handling HTTP requests related to Category resources.
 *
 * This controller acts as the entry point for all category-related operations,
 * delegating business logic to the CategoryService while keeping request/response
 * handling clean and minimal.
 */
class CategoryController {

    /**
     * @param {Object} categoryService - Instance of CategoryService.
     */
    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Create a new category.
     *
     * @route POST /categories
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express error middleware callback.
     */
    async create(req, res, next) {
        try {
            const newCategory = await this.categoryService.createCategory(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve all categories.
     *
     * @route GET /categories
     */
    async getAll(req, res, next) {
        try {
            const categories = await this.categoryService.findAll();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve a single category by ID.
     *
     * @route GET /categories/:id
     */
    async getById(req, res, next) {
        try {
            const category = await this.categoryService.findById(req.params.id);

            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }

            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a category by ID.
     *
     * @route PUT /categories/:id
     */
    async updateById(req, res, next) {
        try {
            const updatedCategory = await this.categoryService.updateById(
                req.params.id,
                req.body
            );
            res.status(200).json(updatedCategory);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a category by ID.
     *
     * @route DELETE /categories/:id
     */
    async deleteById(req, res, next) {
        try {
            await this.categoryService.deleteById(req.params.id);
            res.sendStatus(204); // No content
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoryController;
