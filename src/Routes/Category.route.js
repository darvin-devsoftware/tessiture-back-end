/**
 * Category Routes
 *
 * This module defines all HTTP endpoints related to Category management.
 * It follows Clean Architecture principles by injecting the repository
 * and service layers into the controller, ensuring a fully decoupled,
 * testable, and maintainable structure.
 */

const { Router } = require("express");

const CategoryRepository = require("./../Repository/Category.repository");
const CategoryService = require("./../Service/Category.service");
const CategoryController = require("./../Controller/Category.controller");

const router = Router();

/**
 * Dependency Injection (Repository → Service → Controller)
 *
 * Ensures each layer has a single responsibility and can be replaced
 * or extended independently. This also allows for easier unit testing.
 */
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

/**
 * Create Category
 *
 * @route POST /categories
 * @description Creates a new category (e.g., "Science", "Sports", "Tech")
 * @body {string} categoryName - Required
 */
router.post("/", categoryController.create.bind(categoryController));

/**
 * Get All Categories
 *
 * @route GET /categories
 * @description Returns all categories
 */
router.get("/", categoryController.getAll.bind(categoryController));

/**
 * Get Category by ID
 *
 * @route GET /categories/:id
 * @description Retrieves a category if it exists
 */
router.get("/:id", categoryController.getById.bind(categoryController));

/**
 * Update Category
 *
 * @route PUT /categories/:id
 * @description Updates an existing category
 */
router.put("/:id", categoryController.updateById.bind(categoryController));

/**
 * Delete Category
 *
 * @route DELETE /categories/:id
 * @description Removes a category from the database
 */
router.delete("/:id", categoryController.deleteById.bind(categoryController));

module.exports = router;
