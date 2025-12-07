/**
 * Controller responsible for handling HTTP requests related to Article resources.
 *
 * This layer receives raw input (req), coordinates with the service layer,
 * and returns structured HTTP responses. All business logic is delegated to
 * the ArticleService, keeping controllers thin and maintainable.
 */
class ArticleController {

    /**
     * @param {Object} articleService - Instance of ArticleService
     */
    constructor(articleService) {
        this.articleService = articleService;
    }

    /**
     * Create a new article.
     *
     * @route POST /articles
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Express next middleware
     *
     * Expected body:
     *  - title: string
     *  - description: string
     *  - categoryId: number
     *  - userId: number
     *  - statusId: number
     *
     * Expected files:
     *  - primaryImg: image file (optional)
     */
    async create(req, res, next) {
        try {
            const { title, description, categoryId, userId, statusId } = req.body;

            const primaryImgFile = req.files?.primaryImg?.[0];

            const created = await this.articleService.createArticle({
                title,
                description,
                categoryId,
                userId,
                statusId,
                primaryImgFile
            });

            res.status(201).json(created);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve all articles.
     *
     * @route GET /articles
     */
    async getAll(req, res, next) {
        try {
            const data = await this.articleService.findAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve a single article by its ID.
     *
     * @route GET /articles/:id
     */
    async getById(req, res, next) {
        try {
            const data = await this.articleService.findById(req.params.id);

            if (!data) {
                return res.status(404).json({ error: "Article not found" });
            }

            res.status(200).json(data);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Update an existing article.
     *
     * @route PUT /articles/:id
     *
     * Expected body:
     *  - title?: string
     *  - description?: string
     *  - categoryId?: number
     *  - statusId?: number
     *
     * Expected files:
     *  - primaryImg: image file (optional)
     */
    async updateById(req, res, next) {
        try {
            const { title, description, categoryId, statusId } = req.body;
            const primaryImgFile = req.files?.primaryImg?.[0];

            const updated = await this.articleService.updateById(req.params.id, {
                title,
                description,
                categoryId,
                statusId,
                primaryImgFile
            });

            res.status(200).json(updated);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete an article by ID.
     *
     * @route DELETE /articles/:id
     */
    async deleteById(req, res, next) {
        try {
            await this.articleService.deleteById(req.params.id);
            res.sendStatus(204); // No Content
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ArticleController;
