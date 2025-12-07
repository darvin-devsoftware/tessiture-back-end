/**
 * Podcast Routes
 *
 * This module defines all HTTP routes used to manage podcast entries.
 * It integrates with Multer to receive multimedia files (audio, video, image)
 * and follows the Repository → Service → Controller architecture.
 *
 * Supported multipart/form-data fields:
 *  - video : the main podcast video file
 *  - audio : the podcast audio track
 *  - img   : the thumbnail image
 *
 * Available Endpoints:
 *  - POST   /           → Create a podcast
 *  - PUT    /:id        → Update an existing podcast
 *  - GET    /           → Retrieve all podcasts
 *  - GET    /:id        → Retrieve a single podcast by ID
 *  - DELETE /:id        → Delete a podcast
 */

const { Router } = require("express");
const upload = require("../Middleware/upload.middleware");

const PodcastRepository = require("../Repository/Podcast.repository");
const PodcastService = require("../Service/Podcast.service");
const PodcastController = require("../Controller/Podcast.controller");

const router = Router();

/**
 * Dependency Injection
 *
 * Repository → Service → Controller
 *
 * This pattern:
 *  - Ensures a clean separation of concerns
 *  - Allows easy unit testing of each layer
 *  - Supports Clean Architecture principles
 */
const podcastRepository = new PodcastRepository();
const podcastService = new PodcastService(podcastRepository);
const podcastController = new PodcastController(podcastService);

/**
 * Create Podcast
 *
 * @route POST /podcasts
 * @description Creates a new podcast and uploads audio/video/image to Cloudinary.
 */
router.post(
    "/",
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "audio", maxCount: 1 },
        { name: "img", maxCount: 1 },
    ]),
    podcastController.create.bind(podcastController)
);

/**
 * Update Podcast
 *
 * @route PUT /podcasts/:id
 * @description Updates podcast properties. File uploads are optional.
 */
router.put(
    "/:id",
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "audio", maxCount: 1 },
        { name: "img", maxCount: 1 },
    ]),
    podcastController.updateById.bind(podcastController)
);

/**
 * Retrieve All Podcasts
 *
 * @route GET /podcasts
 * @description Returns all podcast entries stored in the system.
 */
router.get(
    "/",
    podcastController.getAll.bind(podcastController)
);

/**
 * Retrieve Podcast by ID
 *
 * @route GET /podcasts/:id
 * @description Returns a single podcast based on its unique ID.
 */
router.get(
    "/:id",
    podcastController.getById.bind(podcastController)
);

/**
 * Delete Podcast
 *
 * @route DELETE /podcasts/:id
 * @description Deletes a podcast permanently from the database.
 */
router.delete(
    "/:id",
    podcastController.deleteById.bind(podcastController)
);

module.exports = router;
