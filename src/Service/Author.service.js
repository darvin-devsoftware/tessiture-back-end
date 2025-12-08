const cloudinary = require("./../cloudinary");

/**
 * Service layer responsible for managing business logic related to Authors.
 *
 * This includes:
 * - Generating slugs
 * - Uploading primary images and gallery images to Cloudinary
 * - Combining Author and AuthorImages repository logic
 * - Preparing fully enriched author objects before returning to controllers
 */
class AuthorService {
    constructor(authorRepository, authorImagesRepository) {
        this.authorRepository = authorRepository;
        this.authorImagesRepository = authorImagesRepository;
    }

    /**
     * Generates a URL-friendly slug from the author's name.
     *
     * @param {string} name - Full name of the author.
     * @returns {string} URL-safe slug.
     */
    generateSlug(name) {
        return name
            .toLowerCase()
            .trim()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }

    /**
     * Uploads a single image to Cloudinary.
     *
     * @param {Object|null} file - Image file object provided by Multer.
     * @returns {Promise<string|null>} Uploaded image URL or null if no file provided.
     */
    async uploadImage(file) {
        if (!file) return null;

        const uploaded = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
        });

        return uploaded.secure_url;
    }

    /**
     * Creates a new author, uploads their primary image,
     * and uploads all gallery images (if provided).
     *
     * @param {Object} params - Author data.
     * @param {string} params.name - Name of the author.
     * @param {string} params.birthDate - Date of birth.
     * @param {string} params.nationality - Nationality.
     * @param {string} params.description - Author biography or description.
     * @param {Object|null} params.primaryImgFile - Single uploaded file (main image).
     * @param {Array<Object>} params.galleryFiles - List of image files for the gallery.
     * @param {number} params.userId - ID of the user who created the author.
     *
     * @returns {Promise<Object>} Author record combined with gallery images.
     */
    async createAuthor({ name, birthDate, nationality, description, primaryImgFile, galleryFiles, userId }) {

        const slug = this.generateSlug(name);

        // Upload primary image
        const primaryImg = await this.uploadImage(primaryImgFile);

        // Create author entry
        const author = await this.authorRepository.createAuthor({
            name,
            birthDate,
            nationality,
            description,
            primaryImg,
            userId,
            slug,
        });

        // Upload gallery images (if any)
        if (galleryFiles && galleryFiles.length > 0) {
            for (const file of galleryFiles) {
                const url = await this.uploadImage(file);
                await this.authorImagesRepository.addImage(author.id, url);
            }
        }

        // Retrieve full gallery
        const images = await this.authorImagesRepository.findByAuthorId(author.id);

        return { ...author, gallery: images };
    }

    /**
     * Retrieves a single author by ID, including their image gallery.
     *
     * @param {number} id - Author ID.
     * @returns {Promise<Object|null>} Author object with gallery or null if not found.
     */
    async findById(id) {
        const author = await this.authorRepository.findById(id);
        if (!author) return null;

        const gallery = await this.authorImagesRepository.findByAuthorId(id);

        return { ...author, gallery };
    }

    /**
     * Retrieves all authors, each combined with its image gallery.
     *
     * @returns {Promise<Object[]>} List of authors with gallery arrays included.
     */
    async findAll() {
        const authors = await this.authorRepository.findAll();

        const result = [];
        for (const author of authors) {
            const gallery = await this.authorImagesRepository.findByAuthorId(author.id);
            result.push({ ...author, gallery });
        }

        return result;
    }
}

module.exports = AuthorService;
