/**
 * API Route Loader
 *
 * This module centralizes and registers all application routes under a unified
 * versioned API namespace (/api/v1). This ensures consistent URL structure,
 * simplifies maintenance, and allows seamless API versioning in the future.
 *
 * Registered Modules:
 *  - /roles      → Role Routes
 *  - /status     → Status Routes
 *  - /categories → Category Routes
 *  - /users      → User Routes
 *  - /articles   → Article Routes
 *  - /logs       → Logs Routes
 *  - /authors    → Author Routes
 *  - /podcasts   → Podcast Routes
 *  - /books      → Book Routes
 *
 * Architecture Context:
 * Each route internally uses:
 *    Repository → Service → Controller → Route
 *
 * applyRoutes() is responsible only for attaching route modules
 * to the Express application instance.
 */

const RoleRoutes = require("./Role.route");
const StatusRoutes = require("./Status.route");
const CategoryRoutes = require("./Category.route");
const UserRoutes = require("./User.route");
const ArticleRoutes = require("./Article.route");
const LogsRoutes = require("./Logs.route");
const AuthorRoutes = require("./Author.route");
const PodcastRoutes = require("./Podcast.route");
const BookRoutes = require("./Book.route");

/**
 * Registers all route modules under the /api/v1 namespace.
 *
 * @param {import("express").Application} app - The Express application instance
 */
const applyRoutes = (app) => {
    app.use("/api/v1/roles", RoleRoutes);
    app.use("/api/v1/status", StatusRoutes);
    app.use("/api/v1/categories", CategoryRoutes);
    app.use("/api/v1/users", UserRoutes);
    app.use("/api/v1/articles", ArticleRoutes);
    app.use("/api/v1/logs", LogsRoutes);
    app.use("/api/v1/authors", AuthorRoutes);
    app.use("/api/v1/podcasts", PodcastRoutes);
    app.use("/api/v1/books", BookRoutes);

    // test
};

module.exports = applyRoutes;
