/**
 * Author Routes
 *
 * This router defines all HTTP endpoints for managing Author resources.
 * It integrates:
 *  - AuthorRepository (DB access for authors)
 *  - AuthorImagesRepository (DB access for author gallery images)
 *  - AuthorService (business logic)
 *  - AuthorController (HTTP handling layer)
 *
 * Multer is used for handling image uploads, supporting:
 *  - A single primary image
 *  - A gallery of up to 20 images
 */

const { Router } = require("express");
const upload = require("../Middleware/upload.middleware");

const AuthorRepository = require("../Repository/Author.repository");
const AuthorImagesRepository = require("../Repository/AuthorImages.repository");
const AuthorService = require("../Service/Author.service");
const AuthorController = require("../Controller/Author.controller");

const router = Router();

/**
 * Dependency Injection
 *
 * Clearly separates layers and enables:
 *  - Unit testing with mock repositories
 *  - Replaceable infrastructure
 *  - Maintainable architecture
 */
const authorRepository = new AuthorRepository();
const authorImagesRepository = new AuthorImagesRepository();
const authorService = new AuthorService(authorRepository, authorImagesRepository);
const authorController = new AuthorController(authorService);

/**
 * Create Author
 *
 * @route POST /authors
 *
 * Expected multipart/form-data:
 *  - primaryImg: File (single)
 *  - gallery: File[] (multiple, up to 20 images)
 *
 * The controller delegates file handling to the service, which uploads
 * to Cloudinary and saves URLs in the database.
 */
router.post(
    "/",
    upload.fields([
        { name: "primaryImg", maxCount: 1 },
        { name: "gallery", maxCount: 20 }
    ]),
    authorController.create.bind(authorController)
);

/**
 * Retrieve All Authors
 *
 * @route GET /authors
 *
 * Each returned author includes:
 *  - Primary image
 *  - A gallery of images (if available)
 */
router.get(
    "/",
    authorController.getAll.bind(authorController)
);

/**
 * Retrieve Single Author by ID
 *
 * @route GET /authors/:id
 *
 * If found, response includes:
 *  - Author details
 *  - Gallery images
 */
router.get(
    "/:id",
    authorController.getById.bind(authorController)
);

module.exports = router;
