/**
 * Article Routes
 *
 * This router defines all HTTP endpoints related to Article resources.
 * It wires together:
 *  - Repository (data access)
 *  - Service (business logic)
 *  - Controller (request/response handling)
 *
 * Multer is used to handle optional image uploads for articles.
 */

const { Router } = require("express");
const upload = require("../Middleware/upload.middleware");

const ArticleRepository = require("../Repository/Article.repository");
const ArticleService = require("../Service/Article.service");
const ArticleController = require("../Controller/Article.controller");

const router = Router();

/**
 * Dependency Injection:
 * Each layer gets its dependencies injected manually.
 *
 * This makes the module:
 *  - Testable
 *  - Decoupled
 *  - Easy to replace (e.g., mock repository in tests)
 */
const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

/**
 * Create Article
 *
 * @route POST /articles
 * @description Creates a new article and optionally uploads a primary image.
 *
 * Expected multipart/form-data:
 *  - primaryImg: File (optional)
 */
router.post(
    "/",
    upload.fields([
        { name: "primaryImg", maxCount: 1 }
    ]),
    articleController.create.bind(articleController)
);

/**
 * Update Article
 *
 * @route PUT /articles/:id
 * @description Updates an article. Image upload is optional.
 */
router.put(
    "/:id",
    upload.fields([
        { name: "primaryImg", maxCount: 1 }
    ]),
    articleController.updateById.bind(articleController)
);

/**
 * Retrieve all articles.
 *
 * @route GET /articles
 */
router.get(
    "/",
    articleController.getAll.bind(articleController)
);

/**
 * Retrieve a single article by ID.
 *
 * @route GET /articles/:id
 */
router.get(
    "/:id",
    articleController.getById.bind(articleController)
);

/**
 * Delete an article by ID.
 *
 * @route DELETE /articles/:id
 */
router.delete(
    "/:id",
    articleController.deleteById.bind(articleController)
);

module.exports = router;
