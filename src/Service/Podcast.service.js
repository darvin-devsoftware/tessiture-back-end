const cloudinary = require("../Config/cloudinary");

/**
 * Service layer responsible for all business logic related to Podcasts.
 *
 * This includes:
 * - Validating required podcast data
 * - Uploading video, audio, and image files to Cloudinary
 * - Generating slugs
 * - Preparing data before passing it to the Repository layer
 *
 * The service keeps Cloudinary/media processing logic separated from
 * the repository, maintaining clean architectural boundaries.
 */
class PodcastService {
    constructor(podcastRepository) {
        this.podcastRepository = podcastRepository;
    }

    /**
     * Creates a new podcast with uploaded media files.
     *
     * @param {Object} params - Podcast creation data.
     * @param {string} params.title - Podcast title.
     * @param {Object} params.videoFile - Uploaded video file (Multer object).
     * @param {Object} params.audioFile - Uploaded audio file (Multer object).
     * @param {Object|null} params.imgFile - Optional image thumbnail.
     * @param {number} params.statusId - Podcast status (published, draft, etc.).
     *
     * @returns {Promise<Object>} The created podcast record.
     * @throws {Error} If required fields are missing.
     */
    async createPodcast({ title, videoFile, audioFile, imgFile, statusId }) {

        if (!title) {
            throw new Error("Title is required");
        }

        if (!videoFile || !audioFile) {
            throw new Error("Video and audio files are required");
        }

        // Generate slug
        const slug = title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");

        // ---- Upload Video ----
        const videoUpload = await cloudinary.uploader.upload(videoFile.path, {
            resource_type: "video",
        });
        const videoUrl = videoUpload.secure_url;

        // ---- Upload Audio ----
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
            resource_type: "video", // Cloudinary accepts audio as video if needed
        });
        const audioUrl = audioUpload.secure_url;

        // ---- Upload Image (optional) ----
        let imgUrl = null;

        if (imgFile) {
            const imgUpload = await cloudinary.uploader.upload(imgFile.path, {
                resource_type: "image",
            });
            imgUrl = imgUpload.secure_url;
        }

        // Build final data object
        const podcastData = {
            title,
            imgUrl,
            videoUrl,
            audioUrl,
            statusId,
            slug,
        };

        return this.podcastRepository.createPodcast(podcastData);
    }

    /**
     * Retrieves all podcasts.
     *
     * @returns {Promise<Object[]|null>} Podcast list.
     */
    async findAll() {
        return this.podcastRepository.findAll();
    }

    /**
     * Retrieves a single podcast by its ID.
     *
     * @param {number} id - Podcast ID.
     * @returns {Promise<Object|null>} The podcast or null if not found.
     */
    async findById(id) {
        return this.podcastRepository.findById(id);
    }

    /**
     * Updates a podcast record.
     *
     * NOTE: This update method assumes any media processing
     * (video/audio/image) is handled before reaching the repository.
     *
     * @param {number} id - Podcast ID.
     * @param {Object} data - Fields to update.
     * @param {string} [data.title] - Updated title.
     * @param {string|null} [data.imgUrl] - Updated image URL.
     * @param {string} [data.videoUrl] - Updated video URL.
     * @param {string} [data.audioUrl] - Updated audio URL.
     * @param {number} [data.statusId] - Updated status.
     *
     * @returns {Promise<Object>} The updated podcast.
     */
    async updateById(id, data) {
        const slug = data.title
            ? data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
            : undefined;

        const updatedData = {
            title: data.title,
            imgUrl: data.imgUrl,
            videoUrl: data.videoUrl,
            audioUrl: data.audioUrl,
            statusId: data.statusId,
            slug,
        };

        return this.podcastRepository.updateById(id, updatedData);
    }

    /**
     * Deletes a podcast by ID.
     *
     * @param {number} id - Podcast ID.
     * @returns {Promise<boolean>} True if deletion succeeded.
     */
    async deleteById(id) {
        return this.podcastRepository.deleteById(id);
    }
}

module.exports = PodcastService;
