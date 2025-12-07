/**
 * Controller responsible for handling HTTP requests related to Author resources.
 *
 * This controller delegates all business logic to the AuthorService
 * and focuses ONLY on handling request/response formatting.
 */
class AuthorController {

    /**
     * @param {Object} authorService - Instance of AuthorService.
     */
    constructor(authorService) {
        this.authorService = authorService;
    }

    /**
     * Create a new author along with optional images (primary + gallery).
     *
     * @route POST /authors
     *
     * Expected body:
     *  - name: string
     *  - birthDate: string (YYYY-MM-DD)
     *  - nationality: string
     *  - description: string
     *  - userId: number
     *
     * Expected files (multipart/form-data):
     *  - primaryImg: File (image)
     *  - gallery: File[] (array of images)
     */
    async create(req, res, next) {
        try {
            const { name, birthDate, nationality, description, userId } = req.body;

            const primaryImgFile = req.files?.primaryImg?.[0];
            const galleryFiles = req.files?.gallery || [];

            const result = await this.authorService.createAuthor({
                name,
                birthDate,
                nationality,
                description,
                userId,
                primaryImgFile,
                galleryFiles
            });

            res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve all authors, each including its gallery images.
     *
     * @route GET /authors
     */
    async getAll(req, res, next) {
        try {
            const authors = await this.authorService.findAll();
            res.status(200).json(authors);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve a single author by ID, including gallery images.
     *
     * @route GET /authors/:id
     */
    async getById(req, res, next) {
        try {
            const author = await this.authorService.findById(req.params.id);

            if (!author) {
                return res.status(404).json({ error: "Author not found" });
            }

            res.status(200).json(author);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthorController;
