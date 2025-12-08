const cloudinary = require("./../cloudinary");

/**
 * Service layer responsible for business logic related to Books.
 *
 * This includes:
 * - Generating slugs
 * - Uploading cover images and document files to Cloudinary
 * - Preparing book data before storing it in the database
 * - Handling updates with fallback to existing fields
 *
 * The service keeps Cloudinary/API logic out of the repository to maintain
 * clean separation of concerns.
 */
class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * Generates a URL-friendly slug from the book title.
     *
     * @param {string} title - The title of the book.
     * @returns {string} SEO-friendly slug.
     */
    generateSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }

    /**
     * Uploads a cover image to Cloudinary.
     *
     * @param {Object|null} file - Multer file object.
     * @returns {Promise<string|null>} Image URL or null if no file.
     */
    async uploadImage(file) {
        if (!file) return null;

        const uploaded = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
        });

        return uploaded.secure_url;
    }

    /**
     * Uploads a book file (PDF, Word, etc.) to Cloudinary.
     *
     * Cloudinary "raw" mode stores files without trying to treat them as media.
     *
     * @param {Object|null} file - Multer file object.
     * @returns {Promise<string|null>} File URL or null if no file.
     */
    async uploadFile(file) {
        if (!file) return null;

        const uploaded = await cloudinary.uploader.upload(file.path, {
            resource_type: "raw",
        });

        return uploaded.secure_url;
    }

    /**
     * Creates a new book record.
     *
     * @param {Object} params - Book data.
     * @param {string} params.title - Book title.
     * @param {Object|null} params.imgFile - Cover image file.
     * @param {Object|null} params.fileFile - The actual book file (PDF, DOCX, etc.).
     * @param {number} params.authorId - Author ID.
     * @param {number} params.userId - ID of the user creating the book.
     *
     * @returns {Promise<Object>} The created book record.
     */
    async createBook({ title, imgFile, fileFile, authorId, userId }) {
        const slug = this.generateSlug(title);

        const img = await this.uploadImage(imgFile);
        const file = await this.uploadFile(fileFile);

        return this.bookRepository.createBook({
            title,
            img,
            file,
            authorId,
            userId,
            slug,
        });
    }

    /**
     * Retrieves all books.
     *
     * @returns {Promise<Object[]|null>} List of books.
     */
    async findAll() {
        return this.bookRepository.findAll();
    }

    /**
     * Retrieves a single book by ID.
     *
     * @param {number} id - Book ID.
     * @returns {Promise<Object|null>} The book or null if not found.
     */
    async findById(id) {
        return this.bookRepository.findById(id);
    }

    /**
     * Updates an existing book's metadata and optional files.
     *
     * @param {number} id - Book ID.
     * @param {Object} params - Updated fields.
     * @param {string} [params.title] - New title.
     * @param {Object|null} [params.imgFile] - Updated cover image.
     * @param {Object|null} [params.fileFile] - Updated book file.
     * @param {number} [params.authorId] - Updated author ID.
     *
     * @returns {Promise<Object>} The updated book record.
     * @throws {Error} If the book does not exist.
     */
    async updateById(id, { title, imgFile, fileFile, authorId }) {
        const existing = await this.bookRepository.findById(id);
        if (!existing) {
            throw new Error("Book not found");
        }

        const slug = title ? this.generateSlug(title) : existing.slug;

        const img = imgFile ? await this.uploadImage(imgFile) : existing.img;
        const file = fileFile ? await this.uploadFile(fileFile) : existing.file;

        return this.bookRepository.updateById(id, {
            title: title || existing.title,
            img,
            file,
            authorId: authorId || existing.authorId,
            slug,
        });
    }

    /**
     * Deletes a book by its ID.
     *
     * @param {number} id - Book ID.
     * @returns {Promise<boolean>} True if deletion succeeded.
     */
    async deleteById(id) {
        return this.bookRepository.deleteById(id);
    }
}

module.exports = BookService;
