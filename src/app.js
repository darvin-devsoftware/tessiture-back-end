/**
 * Application Setup (Express App)
 *
 * This module initializes the Express application, configures global middleware,
 * registers all API routes, and applies the centralized error handler.
 *
 * Layer responsibility:
 *  - Does NOT contain business logic
 *  - Does NOT contain database logic
 *  - Only configures middleware + routes + error management
 *
 * Architecture:
 *   Routes → Controllers → Services → Repositories
 *
 * app.js = Entry point for:
 *   - JSON parsing
 *   - URL encoding
 *   - Global route mounting
 *   - Error handling pipeline
 */

const express = require("express");
const app = express();

const applyRoutes = require("./Routes");
const errorHandler = require("./Middleware/errorHandler");

const cors = require('cors');

/**
 * ---------------------------------------------------------
 * Global Middleware
 * ---------------------------------------------------------
 *
 * express.json()
 *    Parses incoming JSON request bodies.
 *
 * express.urlencoded()
 *    Parses URL-encoded form data (useful for HTML forms).
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors("*"))
/**
 * ---------------------------------------------------------
 * API Route Registration
 * ---------------------------------------------------------
 *
 * All routes are versioned and loaded through applyRoutes(),
 * which attaches each module under /api/v1/.
 */
applyRoutes(app);

/**
 * ---------------------------------------------------------
 * Global Error Handler
 * ---------------------------------------------------------
 *
 * Placed after all routes so it can catch:
 *   - Thrown errors
 *   - Rejected promises
 *   - Controller/service/repository errors
 */
app.use(errorHandler);




module.exports = app;
