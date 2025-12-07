/**
 * Controller responsible for managing HTTP requests related to Book resources.
 *
 * The controller delegates all business logic to the BookService and remains
 * responsible only for handling incoming requests, formatting responses,
 * and passing errors to the global error middleware.
 */
class BookController {

    /**
     * @param {Object} bookService - Instance of BookService.
     */
    constructor(bookService) {
        this.bookService = bookService;
    }

    /**
     * Create a new book, including image and file uploads.
     *
     * @route POST /books
     *
     * Expected body:
     *  - title: string
     *  - authorId: number
     *  - userId: number
     *
     * Expected files:
     *  - img: image file (cover)
     *  - file: raw document file (PDF, DOCX, etc.)
     */
    async create(req, res, next) {
        try {
            const { title, authorId, userId } = req.body;

            const imgFile = req.files?.img?.[0];
            const fileFile = req.files?.file?.[0];

            const book = await this.bookService.createBook({
                title,
                authorId,
                userId,
                imgFile,
                fileFile
            });

            res.status(201).json(book);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve all books.
     *
     * @route GET /books
     */
    async getAll(req, res, next) {
        try {
            const books = await this.bookService.findAll();
            res.status(200).json(books);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve a book by its ID.
     *
     * @route GET /books/:id
     */
    async getById(req, res, next) {
        try {
            const book = await this.bookService.findById(req.params.id);

            if (!book) {
                return res.status(404).json({ error: "Book not found" });
            }

            res.status(200).json(book);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a book, including optionally updating image or file.
     *
     * @route PUT /books/:id
     *
     * Expected body:
     *  - title?: string
     *  - authorId?: number
     *
     * Expected files:
     *  - img: optional new cover image
     *  - file: optional new digital file
     */
    async updateById(req, res, next) {
        try {
            const { title, authorId } = req.body;

            const imgFile = req.files?.img?.[0];
            const fileFile = req.files?.file?.[0];

            const updated = await this.bookService.updateById(req.params.id, {
                title,
                authorId,
                imgFile,
                fileFile
            });

            res.status(200).json(updated);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a book by ID.
     *
     * @route DELETE /books/:id
     */
    async deleteById(req, res, next) {
        try {
            await this.bookService.deleteById(req.params.id);
            res.sendStatus(204); // No Content

        } catch (error) {
            next(error);
        }
    }
}

module.exports = BookController;
