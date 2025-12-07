/**
 * Controller responsible for handling HTTP requests related to Podcast resources.
 *
 * This layer only manages input/output and delegates all business logic
 * to the PodcastService. It supports file uploads for video, audio,
 * and an optional thumbnail image.
 */
class PodcastController {

    /**
     * @param {Object} podcastService - Instance of PodcastService.
     */
    constructor(podcastService) {
        this.podcastService = podcastService;
    }

    /**
     * Create a new podcast.
     *
     * @route POST /podcasts
     *
     * Expected body:
     *  - title: string
     *  - statusId: number
     *
     * Expected files (multipart/form-data):
     *  - video: File (required)
     *  - audio: File (required)
     *  - img: File (optional)
     */
    async create(req, res, next) {
        try {
            const { title, statusId } = req.body;

            const videoFile = req.files?.video?.[0];
            const audioFile = req.files?.audio?.[0];
            const imgFile = req.files?.img?.[0];

            const newPodcast = await this.podcastService.createPodcast({
                title,
                statusId,
                videoFile,
                audioFile,
                imgFile
            });

            res.status(201).json(newPodcast);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve all podcasts.
     *
     * @route GET /podcasts
     */
    async getAll(req, res, next) {
        try {
            const podcasts = await this.podcastService.findAll();
            res.status(200).json(podcasts);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieve a podcast by ID.
     *
     * @route GET /podcasts/:id
     */
    async getById(req, res, next) {
        try {
            const podcast = await this.podcastService.findById(req.params.id);

            if (!podcast) {
                return res.status(404).json({ error: "Podcast not found" });
            }

            res.status(200).json(podcast);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a podcast.
     *
     * @route PUT /podcasts/:id
     *
     * ⚠️ IMPORTANT:
     *  This version of the service does NOT support updating files.
     *  Only text fields (title, statusId, imgUrl, videoUrl, audioUrl) can be updated.
     */
    async updateById(req, res, next) {
        try {
            const { title, statusId } = req.body;

            const updatedPodcast = await this.podcastService.updateById(req.params.id, {
                title,
                statusId,
                imgUrl: req.body.imgUrl,       // string URL (optional)
                videoUrl: req.body.videoUrl,   // string URL (optional)
                audioUrl: req.body.audioUrl    // string URL (optional)
            });

            res.status(200).json(updatedPodcast);

        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a podcast by ID.
     *
     * @route DELETE /podcasts/:id
     */
    async deleteById(req, res, next) {
        try {
            await this.podcastService.deleteById(req.params.id);
            res.sendStatus(204); // No Content

        } catch (error) {
            next(error);
        }
    }
}

module.exports = PodcastController;
