/**
 * Book Routes
 *
 * Handles endpoints related to the management of books, including:
 *  - Uploading book cover images
 *  - Uploading book files (PDF, DOCX, EPUB, etc.)
 *  - CRUD operations for books
 *
 * Uses Multer for handling multipart/form-data and Cloudinary for file storage.
 */

const { Router } = require("express");
const upload = require("../Middleware/upload.middleware");

const BookRepository = require("../Repository/Book.repository");
const BookService = require("../Service/Book.service");
const BookController = require("../Controller/Book.controller");

const router = Router();

/**
 * Dependency Injection
 *
 * Allows the system to remain modular, testable and highly maintainable.
 * The route only wires modules together; all business logic is isolated
 * inside the appropriate layers.
 */
const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

/**
 * Create Book
 *
 * @route POST /books
 * @description Handles creation of a new book including:
 *  - Cover image upload (`img`)
 *  - File upload (`file`)
 *
 * Expected multipart/form-data:
 *  - img: File (optional, single)
 *  - file: File (required, single)
 */
router.post(
    "/",
    upload.fields([
        { name: "img", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    bookController.create.bind(bookController)
);

/**
 * Retrieve All Books
 *
 * @route GET /books
 * @description Returns a list of all books including metadata such as:
 *  - Title
 *  - Author ID
 *  - Cover image URL
 *  - File URL
 */
router.get("/", bookController.getAll.bind(bookController));

/**
 * Retrieve Book by ID
 *
 * @route GET /books/:id
 * @description Returns a single book if found
 */
router.get("/:id", bookController.getById.bind(bookController));

/**
 * Update Book
 *
 * @route PUT /books/:id
 * @description Supports:
 *  - Updating title or metadata
 *  - Updating cover image (optional)
 *  - Updating file (optional)
 *
 * Expected multipart/form-data:
 *  - img: File (optional)
 *  - file: File (optional)
 */
router.put(
    "/:id",
    upload.fields([
        { name: "img", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    bookController.updateById.bind(bookController)
);

/**
 * Delete Book
 *
 * @route DELETE /books/:id
 * @description Deletes the book from the DB
 */
router.delete("/:id", bookController.deleteById.bind(bookController));

module.exports = router;
