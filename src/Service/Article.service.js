const cloudinary = require("./../cloudinary");

/**
 * Service layer responsible for business logic related to Articles.
 *
 * This includes:
 * - Generating slugs
 * - Uploading images to Cloudinary
 * - Validating article data
 * - Preparing data before passing it to the repository layer
 *
 * The service abstracts external APIs (like Cloudinary) so the repository
 * remains focused solely on database operations.
 */
class ArticleService {
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }

    /**
     * Generates a URL-friendly slug from the article title.
     *
     * @param {string} title - Article title.
     * @returns {string} Generated slug string.
     */
    generateSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }

    /**
     * Uploads an image to Cloudinary.
     *
     * @param {Object|null} file - File object provided by Multer.
     * @returns {Promise<string|null>} The uploaded image URL or null if no file provided.
     */
    async uploadImage(file) {
        if (!file) return null;

        const uploaded = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
        });

        return uploaded.secure_url;
    }

    /**
     * Creates a new article.
     *
     * @param {Object} params - Article data.
     * @param {string} params.title - Title of the article.
     * @param {string} params.description - Article content or summary.
     * @param {number} params.categoryId - ID of the category.
     * @param {number} params.userId - ID of the user who created the article.
     * @param {number} params.statusId - Article status (published, draft, etc.).
     * @param {Object|null} params.primaryImgFile - Uploaded image file object.
     *
     * @returns {Promise<Object>} The created article.
     * @throws {Error} If title is missing.
     */
    async createArticle({ title, description, categoryId, userId, statusId, primaryImgFile }) {
        if (!title) {
            throw new Error("Title is required");
        }

        const slug = this.generateSlug(title);
        const primaryImg = await this.uploadImage(primaryImgFile);

        const articleData = {
            title,
            description,
            categoryId,
            userId,
            primaryImg,
            statusId,
            slug,
        };

        return this.articleRepository.createArticle(articleData);
    }

    /**
     * Retrieves all articles.
     *
     * @returns {Promise<Object[]|null>} Array of articles.
     */
    async findAll() {
        return this.articleRepository.findAll();
    }

    /**
     * Retrieves a single article by ID.
     *
     * @param {number} id - Article ID.
     * @returns {Promise<Object|null>} The article or null if not found.
     */
    async findById(id) {
        return this.articleRepository.findById(id);
    }

    /**
     * Updates an article by ID.
     *
     * @param {number} id - The article ID.
     * @param {Object} params - Updated article data.
     * @param {string} [params.title] - Updated title.
     * @param {string} [params.description] - Updated description.
     * @param {number} [params.categoryId] - Updated category.
     * @param {number} [params.statusId] - Updated status.
     * @param {Object|null} [params.primaryImgFile] - Updated image file.
     *
     * @returns {Promise<Object>} The updated article.
     * @throws {Error} If the article does not exist.
     */
    async updateById(id, { title, description, categoryId, statusId, primaryImgFile }) {
        const existing = await this.articleRepository.findById(id);
        if (!existing) {
            throw new Error("Article not found");
        }

        const slug = title ? this.generateSlug(title) : existing.slug;

        const primaryImg = primaryImgFile
            ? await this.uploadImage(primaryImgFile)
            : existing.primaryImg;

        return this.articleRepository.updateById(id, {
            title: title || existing.title,
            description: description || existing.description,
            categoryId: categoryId || existing.categoryId,
            primaryImg,
            statusId: statusId || existing.statusId,
            slug,
        });
    }

    /**
     * Deletes an article by ID.
     *
     * @param {number} id - Article ID.
     * @returns {Promise<boolean>} True if deletion succeeded.
     */
    async deleteById(id) {
        return this.articleRepository.deleteById(id);
    }
}

module.exports = ArticleService;
